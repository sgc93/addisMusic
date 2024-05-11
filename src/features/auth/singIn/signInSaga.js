import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { put, takeEvery } from "redux-saga/effects";
import { auth } from "../../../config/firebase_config";
import { isEmailValid, isPasswordValid } from "../../../utils/validators";

function* workCheckSignIn(action) {
	const { email, password, isWithGoogle } = action.payload;
	try {
		if (isWithGoogle) {
			// yield signInWithPopIn(auth, googleProvider);
			yield { type: "signInCheck/checkSignInSuccess" };
			yield put({ type: "signInCheck/checkSignInOpen" });
		} else {
			if (!isEmailValid(email) && !isPasswordValid(password)) {
				yield createUserWithEmailAndPassword(auth, email, password);
				yield { type: "signInCheck/checkSignInSuccess" };
				yield put({ type: "signInCheck/checkSignInOpen" });
			} else {
				let error = "";
				if (isEmailValid(email)) {
					error = isEmailValid(email);
				} else {
					error = isPasswordValid(password);
				}
				yield put({
					type: "signInCheck/checkSignInFailure",
					payload: error,
				});
			}
		}
	} catch (error) {
		if (error instanceof FirebaseError) {
			console.log(error.log);
			let customizedError = error.message.toString();
			if (error.code == "auth/email-already-in-use") {
				customizedError = "This email is already in use, login instead!";
			} else if (error.code == "auth/invalid-email") {
				customizedError = "Invalid email format, please try with valid one!";
			} else if (error.code == "auth/popIn-closed-by-user") {
				customizedError = "You have closed the popIn, please try again!";
			} else if (error.code == "auth/network-request-failed") {
				customizedError = "Unable to connect, check your network please.";
			} else if (isWithGoogle) {
				customizedError = "Unable to Sign in with Google, please try again!";
			} else if (!isWithGoogle) {
				customizedError = "Unable to Sign In, please try again!";
			}
			yield put({
				type: "signInCheck/checkSignInFailure",
				payload: customizedError,
			});
		} else {
			yield put({
				type: "signInCheck/checkSignInFailure",
				payload: "Something went wrong, please try again!",
			});
		}
	} finally {
		yield put({ type: "signInCheck/checkSignInSuccess" });
	}
}

function* singInSaga() {
	yield takeEvery("signInCheck/checkSignIn", workCheckSignIn);
}

export default singInSaga;