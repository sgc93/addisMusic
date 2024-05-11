import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";
import { FcGoogle } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import Error from "../../../ui/Error";
import IconButton from "../../../ui/IconButton";
import LoaderNote from "../../../ui/LoaderNote";
import {
	AuthHeader,
	AuthPageToggler,
	Form,
	FormBtn,
	FormInput,
	GoogleBtn,
	H4,
	Line,
	OrDiv,
	SubTitle,
	Title,
	TitleBox,
	TogglerBtn,
	TogglerText,
	btnStyles,
} from "../Components";
import { checkSignUpOpen } from "../signUp/signUpSlice";
import { checkSignIn, checkSignInOpen } from "./signInSlice";

const ResetBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.7rem;

	width: 20rem;
`;

const ResetBtn = styled.button`
	padding: 0.4rem 1rem;
	background-color: var(--color-text-error);
	color: var(--color-text-primary);
	font-weight: bold;
	font-size: 1rem;
	border: none;
	border-radius: 0.4rem;

	cursor: pointer;
	transition: 0.4s;
	opacity: 0.6;

	&:hover {
		opacity: 1;
	}
	&:active {
		opacity: 0.4;
	}
`;

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.signInCheck.isLoading);
	const error = useSelector((state) => state.signInCheck.error);

	const signIn = (event) => {
		event.preventDefault();
		dispatch(
			checkSignIn({ email: email, password: password, isWithGoogle: false })
		);
	};

	const signInWithGoogle = async () => {
		dispatch(checkSignIn({ email: "", password: "", isWithGoogle: true }));
	};

	const closeSignIn = () => dispatch(checkSignInOpen());

	const toggleToSignUp = () => {
		dispatch(checkSignUpOpen());
		dispatch(checkSignInOpen());
	};

	const resetPassword = () => {};

	return (
		<>
			<AuthHeader>
				<TitleBox>
					<Title>Get In, Please!</Title>
					<SubTitle>
						All you Data and Status is available as you last put, and feel free
						to own more!.
					</SubTitle>
				</TitleBox>
				<IconButton handleClick={() => closeSignIn()}>
					<MdClose />
				</IconButton>
			</AuthHeader>

			{isLoading && !error && <LoaderNote loadingMessage={"Signing In ..."} />}

			{!isLoading && (
				<>
					{error && <Error errorMessage={error} shouldTryAgain={false} />}
					<Form>
						<FormInput
							type="email"
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
							onClick={(event) => signIn(event)}
						>
							Sign In
						</FormBtn>
					</Form>
					<OrDiv>
						<Line />
						<H4>or</H4>
						<Line />
					</OrDiv>
					<GoogleBtn style={btnStyles} onClick={() => signInWithGoogle()}>
						<FcGoogle />
						Sign in with Google
					</GoogleBtn>
					<AuthPageToggler>
						<TogglerText>Have no account?</TogglerText>
						<TogglerBtn onClick={() => toggleToSignUp()}>Create one</TogglerBtn>
					</AuthPageToggler>
					<ResetBox>
						<TogglerText>Forgot your password?</TogglerText>
						<ResetBtn onClick={() => resetPassword()}>Reset</ResetBtn>
					</ResetBox>
				</>
			)}
		</>
	);
};

export default SignIn;
