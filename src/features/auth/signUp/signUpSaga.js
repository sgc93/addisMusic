import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { put, takeEvery } from "redux-saga/effects";
import { auth } from "../../../config/firebase_config";
import { isEmailValid, isPasswordValid } from "../../../utils/validators";

function* workCheckSignUP(action) {
	const { email, password } = action.payload;
	try {
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
	} catch (error) {
		if (error instanceof FirebaseError) {
			let customizedError = error.message.toString();
			if (error.code == "auth/email-already-in-use") {
				customizedError = "This email is already in use, login instead!";
			} else if (error.code == "auth/invalid-email") {
				customizedError = "Invalid email format, please try with valid one!";
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
