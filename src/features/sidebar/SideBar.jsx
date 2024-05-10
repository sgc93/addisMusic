import styled from "@emotion/styled";
import { useEffect } from "react";
import { MdAlbum, MdHome, MdPerson4, MdQueueMusic } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import { loadCategories } from "../categories/categoriesSlice";
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
	border-radius: 0.6rem;
	background-color: var(--color-bg-secondary);
`;

const IconStyle = styled.div`
	font-size: 20px;
`;

const SideBar = () => {
	const dispatch = useDispatch();
	const navigateTo = useNavigate();
	const location = useLocation();
	const pathName = location.pathname;

	useEffect(() => {
		dispatch(loadCategories());
	}, []);

	const selectTab = (route) => {
		navigateTo(`/${route}`);
		dispatch(loadCategories());
	};

	return (
		<Sidebar>
			<SidebarChild>
				<Logo />
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
			<PlayedMusic />
		</Sidebar>
	);
};

export default SideBar;
