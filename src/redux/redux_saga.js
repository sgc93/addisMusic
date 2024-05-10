import { all, fork } from "redux-saga/effects";
import singUpSaga from "../features/auth/signUp/signUpSaga";
import categoriesSaga from "../features/categories/categoriesSaga";

function* appSaga() {
	yield all([fork(singUpSaga), fork(categoriesSaga)]);
}

export default appSaga;
