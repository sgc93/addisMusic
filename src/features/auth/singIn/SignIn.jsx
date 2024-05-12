import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";
import { BiCheck } from "react-icons/bi";
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
import {
	checkSignIn,
	checkSignInFailure,
	checkSignInOpen,
	checkSignInReset,
	checkSignInResetSuccess,
} from "./signInSlice";

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

const SuccessMessage = styled.span`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	background-color: var(--color-bg-primary);
	color: var(--color-text-success);
	padding: 1rem 2rem;
	text-align: center;
	border-radius: 0.6rem;
	width: 20rem;
`;

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { isLoading, error, isResetting, isResetSuccess } = useSelector(
		(state) => state.signInCheck
	);

	useEffect(() => {
		let timeoutId;
		if (error || isResetSuccess) {
			timeoutId = setTimeout(() => {
				dispatch(checkSignInResetSuccess(false));
			}, 6000);
		}

		return () => clearTimeout(timeoutId);
	}, [error, isResetSuccess]);

	const signIn = (event) => {
		event.preventDefault();
		dispatch(
			checkSignIn({ email: email, password: password, isWithGoogle: false })
		);
	};

	const signInWithGoogle = async () => {
		dispatch(checkSignIn({ email: "", password: "", isWithGoogle: true }));
	};

	const closeSignIn = () => {
		dispatch(checkSignInResetSuccess());
		dispatch(checkSignInOpen());
	};

	const toggleToSignUp = () => {
		dispatch(checkSignUpOpen());
		dispatch(checkSignInOpen());
	};

	const resetPassword = () => {
		if (email.length == 0) {
			dispatch(checkSignInFailure("Please enter reset link receiver email!"));
		} else {
			dispatch(checkSignInReset(email));
			console.log("passed email is:" + email);
		}
	};

	const backToLogin = () => dispatch(checkSignInResetSuccess(false));

	return (
		<>
			<AuthHeader>
				<TitleBox>
					<Title>
						{isResetting
							? `Resetting password of email ${email} ...`
							: "Get In, Please!"}
					</Title>
					{!isResetting && (
						<SubTitle>
							All you Data and Status is available as you last put, and feel
							free to own more!.
						</SubTitle>
					)}
				</TitleBox>
				<IconButton handleClick={() => closeSignIn()}>
					<MdClose />
				</IconButton>
			</AuthHeader>
			{error && isResetting && (
				<>
					<Error
						errorMessage={error}
						shouldTryAgain={true}
						handleClick={() => resetPassword()}
					/>
					<ResetBtn onClick={() => backToLogin()}>back to login</ResetBtn>
				</>
			)}
			{isLoading && !error && !isResetting && (
				<LoaderNote loadingMessage={"Signing In ..."} />
			)}
			{isLoading && !error && isResetting && (
				<LoaderNote loadingMessage={"Sending reset email ..."} />
			)}
			{isResetSuccess && (
				<SuccessMessage>
					<BiCheck color="var(--color-text-success)" size={30} />
					<span>Reset email is sent to {email}, check your inbox!</span>
					<ResetBtn onClick={() => backToLogin()}>back to login</ResetBtn>
				</SuccessMessage>
			)}
			{!isLoading && !isResetting && (
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
