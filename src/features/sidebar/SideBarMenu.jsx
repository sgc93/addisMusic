import styled from "@emotion/styled";
import { LuLibrary } from "react-icons/lu";
import { MdLibraryMusic } from "react-icons/md";
import { TbMusicHeart, TbMusicPlus } from "react-icons/tb";
import SideBarTab from "./SideBarTab";

const Menu = styled.div`
	display: flex;
	flex-direction: column;

	overflow-x: hidden;
	overflow-y: scroll;
	height: 8.3rem;

	&::-webkit-scrollbar {
		background-color: transparent;
		width: 0.6rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-bg-secondary);
		border-radius: 0.6rem;
	}
`;

const IconStyle = styled.div`
	font-size: 20px;
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	color: var(--color-text-primary);
`;

const MenuItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 0.2rem;

	padding-right: 0.5rem;
`;

const MenuTitle = styled.div``;

const SideBarMenu = ({ handleClick, children, style }) => {
	return (
		<Menu style={style} onClick={handleClick}>
			<Title>
				<IconStyle>
					<LuLibrary />
				</IconStyle>
				<span>Your things</span>
			</Title>
			<MenuItem>
				<MenuTitle>Create your own playlist </MenuTitle>
				<SideBarTab handleClick={() => console.log("go to tracks")}>
					<IconStyle>
						<TbMusicPlus />
					</IconStyle>
					Create Playlist
				</SideBarTab>
			</MenuItem>
			<MenuItem>
				<MenuTitle>Have list of selected musics</MenuTitle>
				<SideBarTab handleClick={() => console.log("go to tracks")}>
					<IconStyle>
						<MdLibraryMusic />
					</IconStyle>
					Your Songs
				</SideBarTab>
			</MenuItem>
			<MenuItem>
				<MenuTitle>
					Add and watch over whenever you like what you have liked
				</MenuTitle>
				<SideBarTab handleClick={() => console.log("go to tracks")}>
					<IconStyle>
						<TbMusicHeart />
					</IconStyle>
					Your Favorites
				</SideBarTab>
			</MenuItem>
		</Menu>
	);
};

export default SideBarMenu;
