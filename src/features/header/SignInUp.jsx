import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useSignedInUser } from "../../hooks/CheckAuth";
import { checkSignUpOpen } from "../auth/signUp/signUpSlice";
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
	const user = useSignedInUser();

	const openSignUp = () => dispatch(checkSignUpOpen());

	return (
		<AccBox>
			{user ? (
				<Account user={user} />
			) : (
				<>
					<SignUpBtn onClick={() => openSignUp()}>Sign Up</SignUpBtn>
					<LogInBtn>Log In</LogInBtn>
				</>
			)}
		</AccBox>
	);
};

export default SignInUp;
