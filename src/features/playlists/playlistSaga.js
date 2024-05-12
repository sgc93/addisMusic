import { takeEvery } from "redux-saga/effects";

function* workPlaylistLoad() {
	yield console.log();
}

function* workPlaylistUpload() {
	yield console.log();
}

export function* playlistUploadSaga() {
	yield takeEvery("playlist/playlistLoad", workPlaylistUpload);
}

function* playlistSaga() {
	yield takeEvery("playlist/playlistLoadUpload", workPlaylistLoad);
}

export default playlistSaga;
