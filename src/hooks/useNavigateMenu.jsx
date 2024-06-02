import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase_config";
import { checkSignInOpen } from "../features/auth/singIn/signInSlice";

export const useNavigateMenu = () => {
	const user = auth.currentUser;
	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	const openRoute = (route) => {
		if (user) {
			navigateTo(`/${route}`);
		} else {
			dispatch(checkSignInOpen());
			if (user) {
				navigateTo(`/${route}`);
			}
		}
	};

	return openRoute;
};
