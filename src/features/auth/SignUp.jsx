import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "rebass";
import { auth, googleProvider } from "../../config/firebase_config";
import { checkSignIn } from "./authSlice";

const SignUP = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.authCheck.isLoading);
	const error = useSelector((state) => state.authCheck.error);

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
		console.log(
			`isloading after dispatching: ${isLoading} and error: ${error}`
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
			{isLoading && <h2>Loading ...</h2>}
			{!isLoading && error && <h2>{error}</h2>}
			{!isLoading && !error && (
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
			)}
			<h4>or</h4>
			<button onClick={() => signUpWithGoogle()}>
				sign up with with you google account
			</button>
		</Card>
	);
};

export default SignUP;
