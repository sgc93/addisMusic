import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fadeOpen } from "../../styles/animation";
import FetchError from "../../ui/FetchError";
import LoaderNote from "../../ui/LoaderNote";
import TrackCard from "../../ui/TrackCard";
import { currentMusicIndex, currentMusicList } from "../music/musicSlice";
import { playlistLoad, playlistUpdateSong } from "../playlists/playlistSlice";

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
	flex-direction: column;
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

const EmptyFavorites = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;
const EmptyMessage = styled.span`
	font-size: 1.3rem;
`;

const EmptyBtn = styled.button`
	color: #2b2bbb;
	background: none;
	border: 1px solid #2b2bbb;
	border-radius: 0.4rem;
	padding: 0.3rem 0.6rem;
	font-size: 1rem;
	font-weight: bold;

	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		color: white;
		background-color: #3c3ccd;
	}
`;

const UserSong = () => {
	const { allSongs, allPlaylists, error, isLoading } = useSelector(
		(state) => state.playlist
	);
	const { user } = useSelector((state) => state.authUser);

	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (allSongs) {
			if (allSongs.length > 0) {
				dispatch(currentMusicList(allSongs));
				dispatch(currentMusicIndex(0));
			}
		} else {
			getAllPlaylistDocs();
		}
	}, [allSongs]);

	useEffect(() => {
		if (allPlaylists) {
			updateSongs();
		}
	}, [allPlaylists]);

	useEffect(() => {
		if (user && !allSongs) {
			getAllPlaylistDocs();
		}
	}, [user]);

	const getAllPlaylistDocs = async () => {
		dispatch(playlistLoad(user.uid));
	};

	const updateSongs = () => {
		const updatedSongs = [];
		allPlaylists.forEach((playlist) => {
			playlist.musics.forEach((music) => {
				let count = 0;
				updatedSongs.forEach((song) => {
					if (song.title === music.title && song.artist === music.artist) {
						count++;
					}
				});
				if (count === 0) {
					updatedSongs.push(music);
				}
			});
		});

		dispatch(playlistUpdateSong(updatedSongs));
	};

	return (
		<PlayListBox>
			{isLoading && (
				<LoadingBox>
					<Loader>
						<LoaderNote loadingMessage={"fetching your songs ..."} />
					</Loader>
				</LoadingBox>
			)}
			{error && (
				<LoadingBox>
					<FetchError
						error={"Unable to fetch your songs, please try again!"}
						detail={
							"Unable to fetch your songs for some kind of technical issues, please check you connection and try again!"
						}
						tryAgain={() => getAllPlaylistDocs()}
					>
						{error}
					</FetchError>
				</LoadingBox>
			)}
			{!isLoading && !error && allSongs && allSongs.length > 0 ? (
				<PlaylistListBox>
					<PlaylistTitle>
						<span>
							{user ? `${user.displayName.split(" ")[0]}'s ` : "your"}
							<span style={{ color: "pink" }}>songs</span>
						</span>
					</PlaylistTitle>
					<ListBox>
						{allSongs.length > 0 && (
							<>
								{allSongs.map((favorite, index) => (
									<TrackCard
										song={favorite}
										index={index}
										key={index}
										shouldMore={true}
									/>
								))}
							</>
						)}
					</ListBox>
				</PlaylistListBox>
			) : (
				<EmptyFavorites>
					<EmptyMessage>You have no songs yet!</EmptyMessage>
					<EmptyBtn onClick={() => navigateTo("/playlists")}>
						Your playlists
					</EmptyBtn>
				</EmptyFavorites>
			)}
		</PlayListBox>
	);
};

export default UserSong;
