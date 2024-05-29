import styled from "@emotion/styled";
import { LuLibrary } from "react-icons/lu";
import { MdLibraryMusic } from "react-icons/md";
import { TbMusicHeart, TbMusicPlus } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { useNavigateMenu } from "../../hooks/useNavigateMenu";
import SideBarTab from "./SideBarTab";

const Menu = styled.div`
	display: flex;
	flex-direction: column;
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

const MenuItemList = styled.div`
	overflow-x: hidden;
	overflow-y: scroll;
	height: 14.2rem;

	&::-webkit-scrollbar {
		background-color: transparent;
		width: 0.6rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-bg-secondary);
		border-radius: 0.6rem;
	}
`;

const MenuItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 0.2rem;

	margin: 0rem 0.5rem 1rem 0rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid var(--color-border-primary);
`;

const MenuTitle = styled.div`
	color: var(--color-bg-primary);
`;

const SideBarMenu = ({ handleClick, children, style }) => {
	const openRoute = useNavigateMenu();
	const location = useLocation();
	const pathName = location.pathname;

	return (
		<Menu style={style} onClick={handleClick}>
			<Title>
				<IconStyle>
					<LuLibrary />
				</IconStyle>
				<span>Your things</span>
			</Title>
			<MenuItemList>
				<MenuItem>
					<MenuTitle>Create your own playlist </MenuTitle>
					<SideBarTab
						style={{
							backgroundColor:
								pathName == "/playlists" ? "var(--color-bg-primary)" : "",
						}}
						handleClick={() => openRoute("playlists")}
					>
						<IconStyle>
							<TbMusicPlus />
						</IconStyle>
						Your Playlist
					</SideBarTab>
				</MenuItem>
				<MenuItem>
					<MenuTitle>Manage songs that you have liked</MenuTitle>
					<SideBarTab
						style={{
							backgroundColor:
								pathName == "/favorites" ? "var(--color-bg-primary)" : "",
						}}
						handleClick={() => openRoute("favorites")}
					>
						<IconStyle>
							<TbMusicHeart />
						</IconStyle>
						Your Favorites
					</SideBarTab>
				</MenuItem>
				<MenuItem>
					<MenuTitle>Have list of selected musics</MenuTitle>
					<SideBarTab
						style={{
							backgroundColor:
								pathName == "/songs" ? "var(--color-bg-primary)" : "",
						}}
						handleClick={() => openRoute("songs")}
					>
						<IconStyle>
							<MdLibraryMusic />
						</IconStyle>
						Your Songs
					</SideBarTab>
				</MenuItem>
			</MenuItemList>
		</Menu>
	);
};

export default SideBarMenu;
