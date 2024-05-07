import styled from "@emotion/styled";
import { MdAlbum, MdHome, MdPerson4, MdQueueMusic } from "react-icons/md";
import Logo from "../../ui/Logo";
import SideBarTab from "./SideBarTab";

const Sidebar = styled.div`
	width: 16vw;
	padding: 0.6rem;
`;

const SidebarChild = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;

	padding: 1rem 0rem 1rem 1rem;
	background-color: var(--color-bg-secondary);

	border-top-left-radius: 1rem;
`;

const IconStyle = styled.div`
	font-size: 26px;
`;

const SideBar = () => {
	return (
		<Sidebar>
			<SidebarChild>
				<Logo />
				<SideBarTab handleClick={() => console.log("go to home")}>
					<IconStyle>
						<MdHome />
					</IconStyle>
					Home
				</SideBarTab>
				<SideBarTab handleClick={() => console.log("go to albums")}>
					<IconStyle>
						<MdAlbum />
					</IconStyle>
					Top Albums
				</SideBarTab>
				<SideBarTab handleClick={() => console.log("go to artists")}>
					<IconStyle>
						<MdPerson4 />
					</IconStyle>
					Top Artists
				</SideBarTab>
				<SideBarTab handleClick={() => console.log("go to tracks")}>
					<IconStyle>
						<MdQueueMusic />
					</IconStyle>
					Top Tracks
				</SideBarTab>
			</SidebarChild>
		</Sidebar>
	);
};

export default SideBar;
