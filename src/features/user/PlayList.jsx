import styled from "@emotion/styled";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TbMusicPlus } from "react-icons/tb";
import { auth, firestore } from "../../config/firebase_config";
import { AnimatedBtn } from "../../styles/styled_components";
import PlaylistCard from "../../ui/PlaylistCard";
import PlaylistAddCard from "../playlists/PlaylistAddCard";
import PlaylistDetail from "../playlists/PlaylistDetail";
import SongAddCard from "../playlists/SongAddCard";

const PlayListBox = styled.div`
	width: 97%;
	height: 100%;
`;

const ListBox = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
`;

const PlayList = () => {
	const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);
	const [isAddSongOpen, setIsAddSongOpen] = useState(false);
	const user = auth.currentUser;

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isDetailing, setIsDetailing] = useState(false);
	const [selectedPlaylist, setSelectedPlaylist] = useState("");

	const [name, setName] = useState("");

	const [userPlaylists, setUserPlaylists] = useState([]);

	useEffect(() => {
		if (user) {
			setIsLoading(false);
			getAllPlaylistDocs();
		} else {
			setIsLoading(false);
		}
	}, [user]);

	const getAllPlaylistDocs = async () => {
		setIsLoading(true);
		setError();
		try {
			// Create a query to retrieve all documents from the collection
			const colRef = collection(firestore, `playlists${user.uid}`);
			const q = query(colRef);

			// Get the query results as a snapshot
			const playlists = await getDocs(q);
			console.log("num of playlist : " + playlists.length);

			// Process each document in the snapshot
			const allPlaylists = [];
			playlists.forEach((playlistDoc) => {
				const playlistData = playlistDoc.data();
				allPlaylists.push(playlistData);
				console.log(playlistData);
			});
			setUserPlaylists(allPlaylists);
		} catch (error) {
			console.error("Error getting documents:", error);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	// working
	const createNewPlaylist = async (collectionName) => {
		if (name.length == 0) {
			setError("enter playlist name first");
		} else {
			setIsLoading(true);
			setError("");
			const playlistData = {
				name: name,
				createdAt: new Date().toLocaleDateString(),
				updatedAt: new Date().toLocaleDateString(),
			};
			try {
				const docRef = doc(firestore, collectionName, name);
				await setDoc(docRef, {
					...playlistData,
					musics: [],
				});
			} catch (error) {
				setError("un able to create new playlist");
				console.log("playlists" + user.uid);
				console.error("Error creating playlist document:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const openPlaylistAdd = () => {
		setIsAddPlaylistOpen(true);
	};
	const showPlaylistDetail = () => {
		setIsDetailing(true);
	};

	return (
		<PlayListBox>
			{isLoading && <span>loading...</span>}
			{error && <span>{error}</span>}
			{!isLoading && userPlaylists.length > 0 && !isDetailing && (
				<ListBox>
					{userPlaylists.map((playlist) => (
						<PlaylistCard
							key={playlist.name}
							playlist={playlist}
							setSelectedPlaylist={setSelectedPlaylist}
							handleClick={showPlaylistDetail}
						/>
					))}
					<AnimatedBtn onClick={() => openPlaylistAdd()}>
						<TbMusicPlus />
					</AnimatedBtn>
				</ListBox>
			)}
			{isDetailing && (
				<PlaylistDetail
					playlist={selectedPlaylist}
					setIsDetailing={setIsDetailing}
				/>
			)}
			{/* {userPlaylists.length == 0 && !isLoading && !error && <EmptyPlaylist />} */}
			{isAddPlaylistOpen && (
				<PlaylistAddCard
					isOpened={isAddPlaylistOpen}
					setIsOpened={setIsAddPlaylistOpen}
				/>
			)}
			{isAddSongOpen && (
				<SongAddCard isOpened={isAddSongOpen} setIsOpened={setIsAddSongOpen} />
			)}
		</PlayListBox>
	);
};

export default PlayList;
