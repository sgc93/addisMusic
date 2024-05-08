import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";
import { FcGoogle } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import { auth, googleProvider } from "../../config/firebase_config";
import IconButton from "../../ui/IconButton";
import { checkSignIn, checkSignUpOpen } from "./authSlice";

const SignUpPage = styled.section`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100dvw;
	height: 100dvh;
	backdrop-filter: blur(10px);
	z-index: 2;
`;
const SignUpBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 1rem;

	width: 70%;
	height: 70%;
	background: radial-gradient(
		var(--color-rad-center2),
		var(--color-rad-outer2)
	);
	border: 3px solid var(--color-border-primary);
	border-radius: 1rem;
`;
const SignUpHeader = styled.div`
	align-self: flex-start;
	display: flex;
	align-items: start;
	justify-content: space-between;
	padding: 2rem 2rem;
	margin-bottom: 2rem;
	width: 93%;
`;
const TitleBox = styled.div`
	align-self: flex-start;
	display: flex;
	flex-direction: column;
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

const FormInput = styled.input`
	background-color: var(--color-bg-secondary);
	border: none;
	outline: none;
	border-radius: 0.4rem;
	padding: 0.5rem 1rem;

	width: 20rem;
	font-size: 1.3rem;
	color: var(--color-text-secondary);

	transition: all 0.4s;
	&:focus {
		outline: 2px solid var(--color-border-primary);
	}
	&::placeholder {
		color: var(--color-text-tertiary);
		font-size: 1rem;
	}
`;

const btnStyles = {
	margin: "0.3rem 0rem",
	padding: "0.5rem 2rem",
	fontSize: "1.3rem",
	borderRadius: "1rem",
	outline: "none",
	border: "none",
	cursor: "pointer",
	transition: "all 0.4s",
};

const FormBtn = styled.button`
	color: var(--color-text-secondary);
	background-color: var(--color-bg-primary);

	&:hover {
		color: var(--color-text-primary);
	}
`;
const GoogleBtn = styled.button`
	color: var(--color-bg-primary);
	background-color: var(--color-text-secondary);
	font-weight: 600;

	display: flex;
	align-items: center;
	gap: 0.5rem;

	&:hover {
		transform: translateY(-2px);
	}
`;

const H4 = styled.span`
	padding: 0.5rem 1rem;
	color: var(--color-text-secondary);
	font-size: 1.2rem;
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

	const closeSignUp = () => dispatch(checkSignUpOpen());

	return (
		<SignUpPage>
			<SignUpBox>
				<SignUpHeader>
					<TitleBox>
						<Title>Have Account!</Title>
						<SubTitle>
							Be member, have more storage and handful services.
						</SubTitle>
					</TitleBox>
					<IconButton handleClick={() => closeSignUp()}>
						<MdClose />
					</IconButton>
				</SignUpHeader>
				{!isLoading && !error && (
					<Form>
						<FormInput
							type="text"
							placeholder="Email"
							name="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
						<FormInput
							type="password"
							placeholder="Password"
							name="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
						<FormBtn
							style={btnStyles}
							type="submit"
							onClick={(event) => signUp(event)}
						>
							Sign Up
						</FormBtn>
					</Form>
				)}
				<H4>or</H4>
				<GoogleBtn style={btnStyles} onClick={() => signUpWithGoogle()}>
					<FcGoogle />
					Sign up with with Google
				</GoogleBtn>
			</SignUpBox>
		</SignUpPage>
	);
};

export default SignUP;
