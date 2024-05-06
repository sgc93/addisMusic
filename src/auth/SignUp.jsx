import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Card } from "rebass";
import { auth, googleProvider } from "../config/firebase_config";
import { checkSignIn } from "./authSlice";

const SignUP = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	// const signUp = async (event) => {
	// 	event.preventDefault();
	// 	try {
	// 		await createUserWithEmailAndPassword(auth, email, password);
	// 	} catch (error) {
	// 		console.log(`error while signing up: ${error}`);
	// 	}
	// };

	const signUp = (event) => {
		event.preventDefault();

		dispatch(
			checkSignIn({ email: email, password: password, isWithGoogle: false })
		);
	};

	const signUpWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.log(`error while signing up with google: ${error}`);
		}
	};

	return (
		<Card>
			<form action="">
				<input
					type="text"
					placeholder="email"
					name="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					required
				/>
				<button type="submit" onClick={(event) => signUp(event)}>
					Sign Up
				</button>
			</form>
			<h4>or</h4>
			<button onClick={() => signUpWithGoogle()}>
				sign up with with you google account
			</button>
		</Card>
	);
};

export default SignUP;
