import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { checkSignIn, checkSignInOpen } from "./signInSlice";

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

	return (
		<>
			<AuthHeader>
				<TitleBox>
					<Title>Get In, Please!</Title>
					<SubTitle>
						All you Data and Status is available and as you last put. Feel free
						own more!.
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
						<TogglerBtn>Create one</TogglerBtn>
					</AuthPageToggler>
				</>
			)}
		</>
	);
};

export default SignIn;
