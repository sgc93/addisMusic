import styled from "@emotion/styled";
import Logo from "../../ui/Logo";

const Sidebar = styled.div`
	width: 15vw;
	padding: 0.3rem;
`;

const SideBar = () => {
	return (
		<Sidebar>
			<Logo />
		</Sidebar>
	);
};

export default SideBar;
