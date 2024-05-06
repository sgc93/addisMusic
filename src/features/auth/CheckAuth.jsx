import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase_config";

const CheckAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = () =>
			onAuthStateChanged(auth, (currUser) => setUser(currUser));

		return unsubscribe;
	}, [auth]);

	return user;
};

export default CheckAuth;
