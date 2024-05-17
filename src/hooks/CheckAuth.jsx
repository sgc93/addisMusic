import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase_config";

export const useSignedInUser = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const authChange = () =>
			onAuthStateChanged(auth, (currUser) => setUser(currUser));

		return authChange;
	}, [auth]);

	return user;
};
