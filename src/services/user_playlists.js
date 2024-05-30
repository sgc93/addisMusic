// manipulate user playlists: update, delete and create

import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase_config";

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
export const renamePlaylist = async () => {};
export const deletePlaylist = async () => {};
