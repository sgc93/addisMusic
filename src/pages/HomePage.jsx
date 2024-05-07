import styled from "@emotion/styled";
import Footer from "../features/footer/Footer";
import SideBar from "../features/sidebar/SideBar";

const HomeSection = styled.section`
	width: 100vw;
	height: 100vh;
	background: radial-gradient(var(--color-rad-center), var(--color-rad-outer));
`;

const HomePage = () => {
	return (
		<HomeSection>
			<SideBar />
			<Footer />
		</HomeSection>
	);
};

export default HomePage;
