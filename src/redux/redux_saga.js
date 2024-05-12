import { all, fork } from "redux-saga/effects";
import singUpSaga from "../features/auth/signUp/signUpSaga";
import singInSaga, { resetSaga } from "../features/auth/singIn/signInSaga";
import categoriesSaga from "../features/categories/categoriesSaga";

function* appSaga() {
	yield all([
		fork(singUpSaga),
		fork(singInSaga),
		fork(resetSaga),
		fork(categoriesSaga),
	]);
}

export default appSaga;
