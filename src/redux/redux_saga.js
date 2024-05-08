import { all, fork } from "redux-saga/effects";
import singUpSaga from "../features/auth/signUp/signUpSaga";

function* appSaga() {
	yield all([fork(singUpSaga)]);
}

export default appSaga;
