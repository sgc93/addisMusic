import { takeEvery, put, call } from "redux-saga/effects";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../config/firebase_config";

function* workPlaylistLoad(action) {
	const uid = action.payload;

	console.log(uid);
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
		console.log("error from playlist saga: " + error);
		yield put({
			type: "playlist/playlistLoadFailure",
			payload: error,
		});
	}
}

function* workPlaylistUpload() {
	yield console.log("uploading");
}

export function* playlistUploadSaga() {
	yield takeEvery("playlist/playlistLoadUpload", workPlaylistUpload);
}

function* playlistSaga() {
	yield takeEvery("playlist/playlistLoad", workPlaylistLoad);
}

export default playlistSaga;
