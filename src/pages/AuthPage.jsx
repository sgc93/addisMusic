import { signOut } from "firebase/auth";
import { auth } from "../config/firebase_config";
import CheckAuth from "../features/auth/CheckAuth";
import SignUP from "../features/auth/SignUp";

const AuthPage = () => {
	const user = CheckAuth();
	const logOut = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.log(`error while signing out: ${error}`);
		}
	};

	if (user) {
		return (
			<div>
				<h2>Welcome to Addis Music {user.email} </h2>
				<button onClick={() => logOut()}>Sign out</button>
			</div>
		);
	} else {
		return <SignUP />;
	}
};

export default AuthPage;
