import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkSignInOpen } from "../features/auth/singIn/signInSlice";

export const useNavigateMenu = () => {
	const { user } = useSelector((state) => state.authUser);

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
