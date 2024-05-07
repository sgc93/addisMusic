import styled from "@emotion/styled";
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
		</HomeSection>
	);
};

export default HomePage;
