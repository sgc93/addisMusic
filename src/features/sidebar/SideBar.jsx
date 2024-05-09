import styled from "@emotion/styled";
import { useState } from "react";
import { MdAlbum, MdHome, MdPerson4, MdQueueMusic } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import PlayedMusic from "../music/PlayedMusic";
import SideBarMenu from "./SideBarMenu";
import SideBarTab from "./SideBarTab";

const Sidebar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.7rem;

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
`;

const IconStyle = styled.div`
	font-size: 20px;
`;

const SideBar = () => {
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);
	const navigateTo = useNavigate();

	const selectTab = (route, index) => {
		setSelectedTabIndex(index);
		navigateTo(`/${route}`);
	};

	return (
		<Sidebar>
			<SidebarChild style={{ borderTopLeftRadius: "1rem" }}>
				<Logo />
				<SideBarTab
					style={{
						backgroundColor:
							selectedTabIndex == 0 ? "var(--color-bg-primary)" : "",
					}}
					handleClick={() => selectTab("", 0)}
				>
					<IconStyle>
						<MdHome />
					</IconStyle>
					Home
				</SideBarTab>
				<SideBarTab
					style={{
						backgroundColor:
							selectedTabIndex == 1 ? "var(--color-bg-primary)" : "",
					}}
					handleClick={() => selectTab("albums", 1)}
				>
					<IconStyle>
						<MdAlbum />
					</IconStyle>
					Top Albums
				</SideBarTab>
				<SideBarTab
					style={{
						backgroundColor:
							selectedTabIndex == 2 ? "var(--color-bg-primary)" : "",
					}}
					handleClick={() => selectTab("artists", 2)}
				>
					<IconStyle>
						<MdPerson4 />
					</IconStyle>
					Top Artists
				</SideBarTab>
				<SideBarTab
					style={{
						backgroundColor:
							selectedTabIndex == 3 ? "var(--color-bg-primary)" : "",
					}}
					handleClick={() => selectTab("tracks", 3)}
				>
					<IconStyle>
						<MdQueueMusic />
					</IconStyle>
					Top Tracks
				</SideBarTab>
			</SidebarChild>
			<SidebarChild>
				<SideBarMenu />
			</SidebarChild>
			<PlayedMusic />
		</Sidebar>
	);
};

export default SideBar;
