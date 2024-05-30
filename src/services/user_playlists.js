// manipulate user playlists: update, delete and create

import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../config/firebase_config";

export const addPlaylist = async (name, collectionName, currentPlaylists) => {
	try {
		const newPlaylist = {
			name: name,
			createdAt: new Date().toLocaleDateString(),
			updatedAt: new Date().toLocaleDateString(),
			musics: [],
		};

		const docRef = doc(firestore, collectionName, name);
		await setDoc(docRef, newPlaylist);

		const updatedPlaylists = [...currentPlaylists, newPlaylist];
		return { status: "ok", updatedPlaylists: updatedPlaylists };
	} catch (error) {
		return {
			status: "error",
			error: `Unable to create ${name}, Check you connection`,
		};
	}
};

export const deletePlaylist = async (
	collectionName,
	playlistName,
	currentPlaylists
) => {
	try {
		const playlistRef = doc(firestore, collectionName, playlistName);
		const playlistSnap = await getDoc(playlistRef);
		if (playlistSnap.exists) {
			const updatedPlaylists = [];
			currentPlaylists.forEach((playlist) => {
				if (playlist.name !== playlistName) {
					updatedPlaylists.push(playlist);
				}
			});

			await deleteDoc(playlistRef);
			const { musics } = playlistSnap.data();
			musics.forEach((music) => {
				const songRef = ref(storage, music.songRef);
				const coverRef = ref(storage, music.coverRef);

				deleteObject(songRef)
					.then(() => {
						//
					})
					.catch(() => {
						// return {
						// 	status: "error",
						// 	error: "Unable to delete song file, try again please",
						// };
					});

				deleteObject(coverRef)
					.then(() => {
						//
					})
					.catch(() => {
						// return {
						// 	status: "error",
						// 	error: "Unable to delete cover art file, try again please",
						// };
					});
			});

			console.log(updatedPlaylists);
			return { status: "ok", updatedPlaylists: updatedPlaylists };
		} else {
			return {
				status: "error",
				error: `${playlistName} doesn't exist anymore!`,
			};
		}
	} catch (error) {
		return {
			status: "error",
			error: `Unable to delete ${playlistName}, Check you connection`,
		};
	}
};

export const renamePlaylist = async () => {};
