import { createUserWithEmailAndPassword } from "firebase/auth";
import { put, takeEvery } from "redux-saga/effects";
import { auth } from "../../../config/firebase_config";
import { checkSignUpFailure, checkSignUpSuccess } from "./signUpSlice";

function* workCheckSignUP(action) {
	const { email, password } = action.payload;
	console.log(`user data: email = ${email} and Password = ${password}`);
	try {
		yield createUserWithEmailAndPassword(auth, email, password);
		put(checkSignUpSuccess());
	} catch (error) {
		put(checkSignUpFailure(error.toString()));
	}
}

function* singUpSaga() {
	yield takeEvery("signUpCheck/checkSingUp", workCheckSignUP);
}

export default singUpSaga;
