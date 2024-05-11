import { useSelector } from "react-redux";
import { AuthBox, AuthPage } from "./Components";
import SignUP from "./signUp/SignUp";
import SignIn from "./singIn/SignIn";

const Auth = () => {
	const isSignUpOpened = useSelector(
		(state) => state.signUpCheck.isSignUpShown
	);
	const isSignInOpened = useSelector(
		(state) => state.signInCheck.isSignInShown
	);
	const shouldBeOpen = isSignInOpened || isSignUpOpened;

	return (
		shouldBeOpen && (
			<AuthPage>
				<AuthBox>{isSignInOpened ? <SignIn /> : <SignUP />}</AuthBox>
			</AuthPage>
		)
	);
};

export default Auth;
