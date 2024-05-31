import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { TbMusicPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useSignedInUser } from "../../hooks/CheckAuth";
import { fadeClose, fadeOpen } from "../../styles/animation";
import { AnimatedBtn } from "../../styles/styled_components";
import FetchError from "../../ui/FetchError";
import LoaderNote from "../../ui/LoaderNote";
import PlaylistCard from "../../ui/PlaylistCard";
import EmptyPlaylist from "../playlists/EmptyPlylist";
import PlaylistAddCard from "../playlists/PlaylistAddCard";
import PlaylistDeleteCard from "../playlists/PlaylistDeleteCard";
import PlaylistDetail from "../playlists/PlaylistDetail";
import { playlistLoad, playlistSelect } from "../playlists/playlistSlice";

const PlayListBox = styled.div`
	width: 97%;
	height: 100%;
`;

const PlaylistListBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	animation: ${fadeOpen} 0.5s linear;
`;

const PlaylistTitle = styled.span`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-weight: bold;
	font-size: 1.3rem;
	color: var(--color-text-primary);
	width: 100%;
`;

const ListBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 1rem;
	padding: 0rem 1rem;
`;

const LoadingBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;
	border-radius: 1rem;
`;

const Loader = styled.div`
	padding: 1rem;
	border-radius: 0.6rem;
	background-color: var(--color-bg-primary);
`;

const AddBtnBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 2rem;

	width: calc(50% - 5rem);
`;
const AddBtnToolTip = styled.span`
	position: absolute;
	bottom: -1.7rem;
	padding: 0.3rem 0.7rem;
	margin: 1.7rem 0rem 0rem 1rem;
	border-radius: 0.4rem;
	width: 11rem;
	background-color: var(--color-text-primary);
	color: var(--color-bg-primary);
	display: ${(props) => (props.shouldDisplayed ? "flex" : "none")};

	transition: 0.7s;
	transition: ${(props) => (props.display ? fadeOpen : fadeClose)} 0.7s linear;
`;

const PlayList = () => {
	const { allPlaylists, isLoading, error } = useSelector(
		(state) => state.playlist
	);

	const dispatch = useDispatch();
	const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);

	const user = useSignedInUser();

	const [isDetailing, setIsDetailing] = useState(false);
	const [isPlaylistDeleteOpened, setIsPlaylistDeleteOpened] = useState(false);

	const [shouldDisplayed, setShouldDisplayed] = useState();

	useEffect(() => {
		if (user) {
			dispatch(playlistLoad(user.uid));
		}
	}, [user]);

	const tryRetrievingAgain = () => {
		if (user) dispatch(playlistLoad(user.uid));
	};

	const openPlaylistAdd = () => {
		setIsAddPlaylistOpen(true);
	};

	const showPlaylistDetail = (playlist) => {
		dispatch(playlistSelect(playlist));
		setIsDetailing(true);
	};

	const handleHovering = () =>
		setShouldDisplayed((shouldDisplayed) => !shouldDisplayed);

	return (
		<PlayListBox>
			{isLoading && (
				<LoadingBox>
					<Loader>
						<LoaderNote loadingMessage={"loading playlists ..."} />
					</Loader>
				</LoadingBox>
			)}
			{error && (
				<LoadingBox>
					<FetchError
						error={"Unable to fetch Playlists, please try again!"}
						detail={
							"Unable to fetch user playlists for some kind of technical issues, please check you connection and try again!"
						}
						tryAgain={() => tryRetrievingAgain()}
					>
						{error}
					</FetchError>
				</LoadingBox>
			)}
			{!isLoading && allPlaylists.length > 0 && !isDetailing && (
				<PlaylistListBox>
					<PlaylistTitle>
						<span>
							{user ? `${user.displayName.split(" ")[0]}'s ` : "your"}
							Playlists
						</span>
					</PlaylistTitle>
					<ListBox>
						{allPlaylists.map((playlist, index) => (
							<PlaylistCard
								key={index}
								playlist={playlist}
								handleClick={showPlaylistDetail}
							/>
						))}
						<AddBtnBox>
							<AddBtnToolTip shouldDisplayed={shouldDisplayed}>
								Add one more playlist
							</AddBtnToolTip>
							<AnimatedBtn
								onClick={() => openPlaylistAdd()}
								onMouseEnter={() => handleHovering()}
								onMouseLeave={() => handleHovering()}
							>
								<TbMusicPlus />
							</AnimatedBtn>
						</AddBtnBox>
					</ListBox>
				</PlaylistListBox>
			)}
			{isDetailing && (
				<PlaylistDetail
					setIsDetailing={setIsDetailing}
					setIsPlaylistDeleteOpened={setIsPlaylistDeleteOpened}
				/>
			)}
			{allPlaylists.length == 0 && !isLoading && !error && <EmptyPlaylist />}

			{isAddPlaylistOpen && (
				<PlaylistAddCard
					currentPlaylists={allPlaylists}
					setIsOpened={setIsAddPlaylistOpen}
				/>
			)}
			{isPlaylistDeleteOpened && (
				<PlaylistDeleteCard
					setIsOpened={setIsPlaylistDeleteOpened}
					setIsDetailing={setIsDetailing}
				/>
			)}
		</PlayListBox>
	);
};

export default PlayList;
