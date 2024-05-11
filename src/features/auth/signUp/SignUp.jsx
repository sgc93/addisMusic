import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";
import { FcGoogle } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import Error from "../../../ui/Error";
import IconButton from "../../../ui/IconButton";
import LoaderNote from "../../../ui/LoaderNote";
import { checkSignUp, checkSignUpOpen } from "./signUpSlice";

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

	padding: 1rem 1rem 3rem 1rem;

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
	align-items: center;
	gap: 0.6rem;
`;

const FormInput = styled.input`
	background-color: var(--color-bg-secondary);
	border: none;
	outline: none;
	border-radius: 0.4rem;
	padding: 0.5rem 1rem;

	width: 18rem;
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
	borderRadius: "0.4rem",
	outline: "none",
	border: "none",
	cursor: "pointer",
	transition: "all 0.4s",
	width: "20rem",
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
	gap: 0.9rem;

	&:hover {
		transform: translateY(-2px);
	}
`;
const OrDiv = styled.div`
	width: 20rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const H4 = styled.span`
	width: 10%;
	padding: 0.5rem 1rem;
	color: var(--color-text-secondary);
	font-size: 1.2rem;
`;

const Line = styled.span`
	height: 2px;
	width: calc(45% - 0.5rem);
	border-radius: 1rem;
	background-color: var(--color-bg-secondary);
`;

const SignUP = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.signUpCheck.isLoading);
	const error = useSelector((state) => state.signUpCheck.error);

	const signUp = (event) => {
		event.preventDefault();
		dispatch(
			checkSignUp({ email: email, password: password, isWithGoogle: false })
		);
	};

	const signUpWithGoogle = async () => {
		dispatch(checkSignUp({ email: "", password: "", isWithGoogle: true }));
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

				{isLoading && !error && (
					<LoaderNote loadingMessage={"Signing Up ..."} />
				)}

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
								onClick={(event) => signUp(event)}
							>
								Sign Up
							</FormBtn>
						</Form>
						<OrDiv>
							<Line />
							<H4>or</H4>
							<Line />
						</OrDiv>
						<GoogleBtn style={btnStyles} onClick={() => signUpWithGoogle()}>
							<FcGoogle />
							Sign in with Google
						</GoogleBtn>
					</>
				)}
			</SignUpBox>
		</SignUpPage>
	);
};

export default SignUP;
