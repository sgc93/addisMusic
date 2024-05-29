import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkSignInOpen } from "../features/auth/singIn/signInSlice";
import { useSignedInUser } from "./CheckAuth";

export const useNavigateMenu = () => {
	const user = useSignedInUser();
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
