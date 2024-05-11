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
import { checkSignUp, checkSignUpOpen } from "./signUpSlice";

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
		<>
			<AuthHeader>
				<TitleBox>
					<Title>Have Account!</Title>
					<SubTitle>
						Be member, have more storage and handful services.
					</SubTitle>
				</TitleBox>
				<IconButton handleClick={() => closeSignUp()}>
					<MdClose />
				</IconButton>
			</AuthHeader>

			{isLoading && !error && <LoaderNote loadingMessage={"Signing Up ..."} />}

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
						Sign Up with Google
					</GoogleBtn>
					<AuthPageToggler>
						<TogglerText>Already have account?</TogglerText>
						<TogglerBtn onClick={() => {}}>Log in</TogglerBtn>
					</AuthPageToggler>
				</>
			)}
		</>
	);
};

export default SignUP;
