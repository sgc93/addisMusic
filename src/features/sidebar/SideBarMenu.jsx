import styled from "@emotion/styled";
import { LuLibrary } from "react-icons/lu";
import { MdLibraryMusic } from "react-icons/md";
import { TbMusicHeart, TbMusicPlus } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignedInUser } from "../../hooks/CheckAuth";
import { checkSignUpOpen } from "../auth/authSlice";
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
	height: 6.3rem;

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

	padding-right: 0.5rem;
`;

const MenuTitle = styled.div``;

const SideBarMenu = ({ handleClick, children, style }) => {
	const user = useSignedInUser();
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	const isUserSignedIn = () => {
		if (user) {
			return true;
		} else {
			return false;
		}
	};

	const openMenuRoute = (route) => {
		if (isUserSignedIn()) {
			navigateTo(`/${route}`);
		} else {
			dispatch(checkSignUpOpen());
		}
	};

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
					<SideBarTab handleClick={() => openMenuRoute("playlists")}>
						<IconStyle>
							<TbMusicPlus />
						</IconStyle>
						Create Playlist
					</SideBarTab>
				</MenuItem>
				<MenuItem>
					<MenuTitle>Have list of selected musics</MenuTitle>
					<SideBarTab handleClick={() => openMenuRoute("songs")}>
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
					<SideBarTab handleClick={() => openMenuRoute("favorites")}>
						<IconStyle>
							<TbMusicHeart />
						</IconStyle>
						Your Favorites
					</SideBarTab>
				</MenuItem>
			</MenuItemList>
		</Menu>
	);
};

export default SideBarMenu;