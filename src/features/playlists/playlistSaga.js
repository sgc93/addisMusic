import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { put, takeEvery } from "redux-saga/effects";
import { firestore } from "../../config/firebase_config";

function* workPlaylistLoad(action) {
	const uid = action.payload;

	try {
		// Create a query to retrieve all documents from the collection
		const colRef = collection(firestore, `playlists${uid}`);
		const q = query(colRef);

		const playlists = yield getDocs(q);

		const userPlaylists = [];
		playlists.forEach((playlistDoc) => {
			const playlistData = playlistDoc.data();
			userPlaylists.push(playlistData);
		});

		yield put({
			type: "playlist/playlistLoadSuccess",
			payload: userPlaylists,
		});
	} catch (error) {
		yield put({
			type: "playlist/playlistLoadFailure",
			payload: error,
		});
	}
}

function* workPlaylistAdd(action) {
	const { name, collectionName, currentPlaylists } = action.payload;

	const newPlaylist = {
		name: name,
		createdAt: new Date().toLocaleDateString(),
		updatedAt: new Date().toLocaleDateString(),
		musics: [],
	};
	try {
		const docRef = doc(firestore, collectionName, name);
		yield setDoc(docRef, newPlaylist);
		const updatedPlaylists = [...currentPlaylists, newPlaylist];
		yield put({
			type: "playlist/playlistUpdateSuccess",
			payload: updatedPlaylists,
		});
	} catch (error) {
		yield put({
			type: "playlist/playlistUpdateFailure",
			payload: "Unable to create new playlist, Check you connection",
		});
	}
}

export function* playlistAddSaga() {
	yield takeEvery("playlist/playlistUpdate", workPlaylistAdd);
}

function* playlistSaga() {
	yield takeEvery("playlist/playlistLoad", workPlaylistLoad);
}

export default playlistSaga;
