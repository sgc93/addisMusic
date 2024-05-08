import { signOut } from "firebase/auth";
import { auth } from "../config/firebase_config";
import SignUP from "../features/auth/SignUp";
import { useSignedInUser } from "../hooks/CheckAuth";

const AuthPage = () => {
	const user = useSignedInUser();
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
