import { all, fork } from "redux-saga/effects";
import singUpSaga from "../features/auth/signUp/signUpSaga";
import singInSaga, { resetSaga } from "../features/auth/singIn/signInSaga";
import categoriesSaga from "../features/categories/categoriesSaga";
import playlistSaga from "../features/playlists/playlistSaga";

function* appSaga() {
	yield all([
		fork(singUpSaga),
		fork(singInSaga),
		fork(resetSaga),
		fork(categoriesSaga),
		fork(playlistSaga),
	]);
}

export default appSaga;
