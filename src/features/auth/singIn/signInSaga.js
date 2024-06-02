import { FirebaseError } from "firebase/app";
import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";

import { put, takeEvery } from "redux-saga/effects";
import { auth, googleProvider } from "../../../config/firebase_config";
import { isEmailValid, isPasswordValid } from "../../../utils/validators";

function* workCheckSignIn(action) {
	const { email, password, isWithGoogle } = action.payload;
	try {
		if (isWithGoogle) {
			yield signInWithPopup(auth, googleProvider);
			yield put({ type: "signInCheck/checkSignInSuccess" });
			yield put({ type: "signInCheck/checkSignInOpen" });
		} else {
			if (!isEmailValid(email) && !isPasswordValid(password)) {
				yield signInWithEmailAndPassword(auth, email, password);
				console.log("signed in successfully: " + auth.currentUser);
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
			console.log(error);
			let customizedError = error.message.toString();
			if (error.code == "auth/invalid-credential") {
				customizedError =
					"Invalid credential, try again with correct one please!";
			} else if (error.code == "auth/user-not-found") {
				customizedError = "No user is found with this email, Sign up instead!";
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

// handle resetting password

function* workCheckSignInReset(action) {
	const email = action.payload;
	try {
		yield sendPasswordResetEmail(auth, email);
		yield put({ type: "signInCheck/checkSignInSuccess" });
		yield put({ type: "signInCheck/checkSignInResetSuccess", payload: true });
	} catch (error) {
		if (error instanceof FirebaseError) {
			let customizedError = error.message.toString();
			if (error.code == "auth/missing-email") {
				customizedError = "receiver email not found";
			} else if (error.code == "auth/invalid-email") {
				customizedError = "Invalid email format, please try with valid one!";
			} else if (error.code == "auth/network-request-failed") {
				customizedError = "Unable to connect, check your network please.";
			} else {
				customizedError = "Unable to send reset email, please try again!";
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

export function* resetSaga() {
	yield takeEvery("signInCheck/checkSignInReset", workCheckSignInReset);
}

export default singInSaga;
