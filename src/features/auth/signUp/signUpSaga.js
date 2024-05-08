import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { put, takeEvery } from "redux-saga/effects";
import { auth, googleProvider } from "../../../config/firebase_config";
import { isEmailValid, isPasswordValid } from "../../../utils/validators";

function* workCheckSignUP(action) {
	const { email, password, isWithGoogle } = action.payload;
	try {
		if (isWithGoogle) {
			yield signInWithPopup(auth, googleProvider);
			yield { type: "signUpCheck/checkSignUpSuccess" };
			yield put({ type: "signUpCheck/checkSignUpOpen" });
		} else {
			if (!isEmailValid(email) && !isPasswordValid(password)) {
				yield createUserWithEmailAndPassword(auth, email, password);
				yield { type: "signUpCheck/checkSignUpSuccess" };
				yield put({ type: "signUpCheck/checkSignUpOpen" });
			} else {
				let error = "";
				if (isEmailValid(email)) {
					error = isEmailValid(email);
				} else {
					error = isPasswordValid(password);
				}
				yield put({
					type: "signUpCheck/checkSignUpFailure",
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
			} else if (error.code == "auth/popup-closed-by-user") {
				customizedError = "You have closed the popup, please try again!";
			} else if (error.code == "auth/network-request-failed") {
				customizedError = "Unable to connect, check your network please.";
			} else if (isWithGoogle) {
				customizedError = "Unable to Sign in with Google, please try again!";
			} else if (!isWithGoogle) {
				customizedError = "Unable to Sign Up, please try again!";
			}
			yield put({
				type: "signUpCheck/checkSignUpFailure",
				payload: customizedError,
			});
		} else {
			yield put({
				type: "signUpCheck/checkSignUpFailure",
				payload: "Something went wrong, please try again!",
			});
		}
	} finally {
		yield put({ type: "signUpCheck/checkSignUpSuccess" });
	}
}

function* singUpSaga() {
	yield takeEvery("signUpCheck/checkSignUp", workCheckSignUP);
}

export default singUpSaga;
