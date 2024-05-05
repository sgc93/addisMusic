import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../config/firebase_config";

const auth = getAuth(app);
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
