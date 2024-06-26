import { collection, getDocs, query } from "firebase/firestore";
import { put, takeEvery } from "redux-saga/effects";
import { firestore } from "../../config/firebase_config";
import {
	addPlaylist,
	deletePlaylist,
	renamePlaylist,
} from "../../services/user_playlists";

function* workPlaylistLoad(action) {
	const uid = action.payload;

	try {
		// Create a query to retrieve all documents from the collection
		const colRef = collection(firestore, `playlists${uid}`);
		const q = query(colRef);

		const playlists = yield getDocs(q);

		const userPlaylists = [];
		const favorites = [];
		const songs = [];
		const playlistNames = [];
		playlists.forEach((playlistDoc) => {
			const playlistData = playlistDoc.data();
			userPlaylists.push(playlistData);
			playlistNames.push({
				name: playlistData.name,
				musics: playlistData.musics.length,
			});
			playlistData.musics.forEach((music) => {
				let count = 0;
				songs.forEach((song) => {
					if (song.title === music.title && song.artist === music.artist) {
						count++;
					}
				});
				if (count === 0) {
					songs.push(music);
				}
				if (music.isFavorite) {
					favorites.push(music);
				}
			});
		});

		yield put({
			type: "playlist/playlistLoadSuccess",
			payload: {
				allPlaylists: userPlaylists,
				playlistNames: playlistNames,
				allFavorites: favorites,
				allSongs: songs,
			},
		});
	} catch (error) {
		yield put({
			type: "playlist/playlistLoadFailure",
			payload: error,
		});
	}
}

function* workPlaylistAdd(action) {
	const {
		updateType,
		name,
		collectionName,
		oldPlaylistName,
		newPlaylistName,
		playlistName,
		currentPlaylists,
	} = action.payload;
	try {
		let response;
		switch (updateType) {
			case "create":
				response = yield addPlaylist(name, collectionName, currentPlaylists);
				break;
			case "rename":
				response = yield renamePlaylist(
					collectionName,
					oldPlaylistName,
					newPlaylistName,
					currentPlaylists
				);
				break;
			case "delete":
				response = yield deletePlaylist(
					collectionName,
					playlistName,
					currentPlaylists
				);
				break;
		}
		if (response.status === "ok") {
			yield put({
				type: "playlist/playlistUpdateSuccess",
				payload: response.updatedPlaylists,
			});
			if (updateType === "rename") {
				yield put({
					type: "playlist/playlistSelect",
					payload: response.updatedSelectedPlaylist,
				});
			}
		} else {
			yield put({
				type: "playlist/playlistUpdateFailure",
				payload: response.error,
			});
		}
	} catch (error) {
		yield put({
			type: "playlist/playlistUpdateFailure",
			payload: "Unable to handle this operation, Check you connection",
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
