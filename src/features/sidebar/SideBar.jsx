import styled from "@emotion/styled";
import { FiFile } from "react-icons/fi";
import { MdAlbum, MdHome, MdPerson4, MdQueueMusic } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
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
	border-radius: 0.6rem;
	background-color: var(--color-bg-secondary);
`;

const IconStyle = styled.div`
	font-size: 20px;
	border-radius: 50%;
`;

const SideBar = () => {
	const navigateTo = useNavigate();
	const location = useLocation();
	const pathName = location.pathname;

	const selectTab = (route) => {
		navigateTo(`/${route}`);
	};

	return (
		<Sidebar>
			<SidebarChild>
				<Logo />
				<SideBarTab
					style={{
						backgroundColor:
							pathName == "/local" ? "var(--color-bg-primary)" : "",
					}}
					handleClick={() => selectTab("local")}
				>
					<IconStyle
						style={{
							background:
								"radial-gradient(var(--color-gradient-2),var(--color-gradient-3))",
							padding: " 0.4rem",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "1.2rem;",
						}}
					>
						<FiFile />
					</IconStyle>
					Play locals
				</SideBarTab>
			</SidebarChild>
			<SidebarChild>
				<SideBarTab
					style={{
						backgroundColor: pathName == "/" ? "var(--color-bg-primary)" : "",
					}}
					handleClick={() => selectTab("")}
				>
					<IconStyle>
						<MdHome />
					</IconStyle>
					Home
				</SideBarTab>
				<SideBarTab
					style={{
						backgroundColor:
							pathName == "/albums" ? "var(--color-bg-primary)" : "",
					}}
					handleClick={() => selectTab("albums")}
				>
					<IconStyle>
						<MdAlbum />
					</IconStyle>
					Top Albums
				</SideBarTab>
				<SideBarTab
					style={{
						backgroundColor:
							pathName == "/artists" ? "var(--color-bg-primary)" : "",
					}}
					handleClick={() => selectTab("artists")}
				>
					<IconStyle>
						<MdPerson4 />
					</IconStyle>
					Top Artists
				</SideBarTab>
				<SideBarTab
					style={{
						backgroundColor:
							pathName == "/tracks" ? "var(--color-bg-primary)" : "",
					}}
					handleClick={() => selectTab("tracks")}
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
		</Sidebar>
	);
};

export default SideBar;
