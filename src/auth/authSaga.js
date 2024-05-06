import { createUserWithEmailAndPassword } from "firebase/auth";
import { put, takeEvery } from "redux-saga/effects";
import { auth } from "../config/firebase_config";
import { checkSignInFailure, checkSignInSuccess } from "./authSlice";

function* workCheckSignIn(action) {
	const { email, password } = action.payload;
	console.log(`user data: email = ${email} and Password = ${password}`);
	try {
		yield createUserWithEmailAndPassword(auth, email, password);
		put(checkSignInSuccess());
	} catch (error) {
		put(checkSignInFailure(error.toString()));
	}
}

function* authSaga() {
	yield takeEvery("authCheck/checkSignIn", workCheckSignIn);
}

export default authSaga;
