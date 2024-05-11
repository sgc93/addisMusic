import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Auth from "../features/auth/Auth";
import { loadCategories } from "../features/categories/categoriesSlice";
import Footer from "../features/footer/Footer";
import Header from "../features/header/Header";
import SideBar from "../features/sidebar/SideBar";

const HomeSection = styled.section`
	position: relative;
	width: 100vw;
	height: 100vh;
	background: radial-gradient(var(--color-rad-center), var(--color-rad-outer));
`;

const OutletSection = styled.section`
	position: absolute;
	top: 9%;
	right: 0;

	width: 81.2%;
	height: 81%;

	border-radius: 1rem;

	overflow-x: hidden;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		background-color: transparent;
		width: 12px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-bg-secondary);

		border-radius: 1rem;
	}
`;

const HomePage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadCategories());
	}, []);

	return (
		<HomeSection>
			<SideBar />
			<OutletSection>
				<Outlet />
			</OutletSection>
			<Header />
			<Footer />
			<Auth />
		</HomeSection>
	);
};

export default HomePage;
