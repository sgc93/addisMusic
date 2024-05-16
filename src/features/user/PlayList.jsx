import styled from "@emotion/styled";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../config/firebase_config";
import { useSignedInUser } from "../../hooks/CheckAuth";
import PlaylistAddCard from "../playlists/PlaylistAddCard";
import SongAddCard from "../playlists/SongAddCard";

const PlayListBox = styled.div`
	padding: 0.5rem 1rem;
`;

const PlayList = () => {
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isAddSongOpen, setIsAddSongOpen] = useState(false);
	const user = useSignedInUser();

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState("...");

	const [name, setName] = useState("");

	const [userPlaylists, setUserPlaylists] = useState([]);

	useEffect(() => {
		if (user) {
			getAllPlaylistDocs();
		}
	}, []);

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
			setUserPlaylists((userPlaylists) => allPlaylists);
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
			setStatus("...");
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
				setStatus(`Playlist '${name}' created successfully.`);
			} catch (error) {
				setError("un able to create new playlist");
				console.log("playlists" + user.uid);
				console.error("Error creating playlist document:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<PlayListBox>
			{isLoading && <span>loading...</span>}
			{error && <span>{error}</span>}
			{userPlaylists &&
				userPlaylists.map((playlist) => (
					<span key={playlist.name}>{playlist.name}</span>
				))}

			{isAddOpen && (
				<PlaylistAddCard isOpened={isAddOpen} setIsOpened={setIsAddOpen} />
			)}
			{isAddSongOpen && (
				<SongAddCard isOpened={isAddSongOpen} setIsOpened={setIsAddSongOpen} />
			)}
		</PlayListBox>
	);
};

export default PlayList;
