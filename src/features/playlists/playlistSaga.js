import { takeEvery } from "redux-saga/effects";

function* workPlaylistLoad() {
	yield console.log();
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
