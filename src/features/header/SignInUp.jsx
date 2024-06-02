import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { checkSignUpOpen } from "../auth/signUp/signUpSlice";
import { checkSignInOpen } from "../auth/singIn/signInSlice";
import Account from "../user/Account";

const AccBox = styled.div`
	display: flex;
	gap: 0.6rem;

	padding-right: 0.2rem;
`;

const SignUpBtn = styled.button`
	color: var(--color-text-secondary);
	font-size: 1.2rem;

	background: transparent;
	border: none;
	border-radius: 0.6rem;
	outline: none;

	cursor: pointer;
	transition: 0.3;
	&:hover {
		color: var(--color-text-primary);
	}
`;

const LogInBtn = styled.button`
	color: var(--color-bg-primary);
	font-weight: 600;
	font-size: 1.2rem;

	padding: 0.3rem 1rem;

	background-color: var(--color-text-secondary);
	border: none;
	border-radius: 0.6rem;
	outline: none;

	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		background-color: var(--color-bg-primary);
		color: var(--color-text-secondary);
	}
`;

const SignInUp = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authUser);

	const openSignUp = () => dispatch(checkSignUpOpen());
	const openSignIn = () => dispatch(checkSignInOpen());

	return (
		<AccBox>
			{user ? (
				<Account user={user} />
			) : (
				<>
					<SignUpBtn onClick={() => openSignUp()}>Sign Up</SignUpBtn>
					<LogInBtn onClick={() => openSignIn()}>Log In</LogInBtn>
				</>
			)}
		</AccBox>
	);
};

export default SignInUp;
