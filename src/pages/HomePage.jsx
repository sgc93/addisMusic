import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SignUP from "../features/auth/signUp/SignUp";
import Footer from "../features/footer/Footer";
import Header from "../features/header/Header";
import SideBar from "../features/sidebar/SideBar";

const HomeSection = styled.section`
	width: 100vw;
	height: 100vh;
	background: radial-gradient(var(--color-rad-center), var(--color-rad-outer));
`;

const OutletSection = styled.section`
	position: absolute;
	top: 9%;
	right: 0;

	width: 80.5%;
	height: 81%;

	margin: 0rem 0.8rem;
	background-color: var(--color-bg-secondary);
	border-radius: 1rem;

	overflow-x: hidden;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		background-color: transparent;
		width: 1rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-bg-secondary);

		border-radius: 40%;
	}
`;

const HomePage = () => {
	const isOpened = useSelector((state) => state.signUpCheck.isSignUpShown);

	return (
		<HomeSection>
			<SideBar />
			<OutletSection>
				<Outlet />
			</OutletSection>
			<Header />
			<Footer />
			{isOpened && <SignUP />}
		</HomeSection>
	);
};

export default HomePage;
