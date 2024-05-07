import styled from "@emotion/styled";
import {
	MdAlbum,
	MdHome,
	MdLibraryMusic,
	MdPerson4,
	MdQueueMusic,
} from "react-icons/md";
import { TbMusicHeart, TbMusicPlus } from "react-icons/tb";
import Logo from "../../ui/Logo";
import PlayedMusic from "./PlayedMusic";
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
	return (
		<Sidebar>
			<SidebarChild style={{ borderTopLeftRadius: "1rem" }}>
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
			<SidebarChild>
				<SideBarTab handleClick={() => console.log("go to tracks")}>
					<IconStyle>
						<TbMusicPlus />
					</IconStyle>
					Create Playlist
				</SideBarTab>
				<SideBarTab handleClick={() => console.log("go to tracks")}>
					<IconStyle>
						<MdLibraryMusic />
					</IconStyle>
					Your Songs
				</SideBarTab>
				<SideBarTab handleClick={() => console.log("go to tracks")}>
					<IconStyle>
						<TbMusicHeart />
					</IconStyle>
					Your Favorites
				</SideBarTab>
			</SidebarChild>
			<PlayedMusic />
		</Sidebar>
	);
};

export default SideBar;
