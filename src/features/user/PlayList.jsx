import styled from "@emotion/styled";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { firestore } from "../../config/firebase_config";
import { useSignedInUser } from "../../hooks/CheckAuth";
import { FormInput } from "../auth/Components";
import PlaylistAddCard from "../playlists/PlaylistAddCard";
import SongAddCard from "../playlists/SongAddCard";

const PlayListBox = styled.div`
	padding: 0.5rem 1rem;
`;

const PlayList = () => {
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isAddSongOpen, setIsAddSongOpen] = useState(false);
	const user = useSignedInUser();
	const musicRef = useRef();
	const [musicUrl, setMusicUrl] = useState("");

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState("...");

	const [name, setName] = useState("");

	const musicFile = musicRef.current;

	const [userPlaylists, setUserPlaylists] = useState([]);

	const createPlayList = async () => {};

	useEffect(() => {
		async function getAllPlaylistDocs(collectionName) {
			try {
				// Create a query to retrieve all documents from the collection
				const colRef = collection(firestore, collectionName);
				const q = query(colRef);

				// Get the query results as a snapshot
				const querySnapshot = await getDocs(q);

				// Process each document in the snapshot
				const allDocs = [];
				querySnapshot.forEach((doc) => {
					const docData = doc.data();
					docData.id = doc.id; // Add the document ID to the data
					allDocs.push(docData);
				});

				return allDocs; // Return an array of all documents' data
			} catch (error) {
				console.error("Error getting documents:", error);
				return []; // Return an empty array on error
			}
		}
	}, []);

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

	const upload = async (music) => {};

	return (
		<PlayListBox>
			<audio src="./qimemun.mp3" ref={musicRef} controls hidden />

			<div>
				<div>States: {status} </div>
				{error && <div>error: {error}</div>}
				{isLoading && <div> creating new playlist ...</div>}
			</div>
			<div>
				<div>name: {name}</div>
				<div>createdAt : {new Date().toLocaleDateString()}</div>
				<div>updatedAt : {new Date().toLocaleDateString()}</div>
				<FormInput
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button
					onClick={() => {
						// createNewPlaylist(`playlists${user.uid}`);
						setIsAddOpen(true);
					}}
				>
					upload Music
				</button>
				<button
					onClick={() => {
						// createNewPlaylist(`playlists${user.uid}`);
						setIsAddSongOpen(true);
					}}
				>
					add song
				</button>
			</div>
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
