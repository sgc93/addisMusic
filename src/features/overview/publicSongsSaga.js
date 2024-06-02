import { collection, getDocs, query } from "firebase/firestore";
import { put, takeEvery } from "redux-saga/effects";
import { adminId } from "../../config/credentials";
import { firestore } from "../../config/firebase_config";

function* workPublicLoad() {
	const id = adminId;

	try {
		const colRef = collection(firestore, `playlists${id}`);
		const q = query(colRef);
		const playlists = yield getDocs(q);

		const songs = [];
		playlists.forEach((playlistDoc) => {
			const playlistData = playlistDoc.data();
			playlistData.musics.forEach((music) => {
				let count = 0;
				songs.forEach((song) => {
					if (song.title === music.title) {
						count++;
					}
				});
				if (count === 0) {
					songs.push(music);
				}
			});
		});

		yield put({
			type: "public/publicLoadSuccess",
			payload: songs,
		});
	} catch (error) {
		yield put({
			type: "public/publicLoadFailure",
			payload: "Unable to load songs, check you connection",
		});
	}
}

function* publicSaga() {
	yield takeEvery("public/publicLoad", workPublicLoad);
}

export default publicSaga;
