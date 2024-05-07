import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";
import { auth, googleProvider } from "../../config/firebase_config";
import { checkSignIn } from "./authSlice";

const SignUpPage = styled.section`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100dvw;
	height: 100dvh;
	backdrop-filter: blur(4px);
`;
const SignUpBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 70%;
	height: 70%;
	background: radial-gradient(
		var(--color-rad-center2),
		var(--color-rad-outer2)
	);
	border: 3px solid var(--color-border-primary);
	border-radius: 1rem;

	z-index: 2;
`;

const TitleBox = styled.div`
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	margin: 2rem 2rem;
	padding: 0rem 0.5rem;

	border-left: 2px solid var(--color-border-primary);
`;

const Title = styled.span`
	color: var(--color-text-primary);
	font-size: 1.6rem;
	font-weight: bold;
`;
const SubTitle = styled.span`
	color: var(--color-text-tertiary);
	font-size: 1.2rem;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
`;

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
		<SignUpPage>
			<SignUpBox>
				<TitleBox>
					<Title>Have Account!</Title>
					<SubTitle>
						Be member, have more storage and handful services.
					</SubTitle>
				</TitleBox>
				{!isLoading && !error && (
					<Form>
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
					</Form>
				)}
				<h4>or</h4>
				<button onClick={() => signUpWithGoogle()}>
					sign up with with you google account
				</button>
			</SignUpBox>
		</SignUpPage>
	);
};

export default SignUP;
