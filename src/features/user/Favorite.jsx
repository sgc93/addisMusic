import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase_config";
import { fadeOpen } from "../../styles/animation";
import FetchError from "../../ui/FetchError";
import LoaderNote from "../../ui/LoaderNote";
import TrackCard from "../../ui/TrackCard";
import { currentMusicIndex, currentMusicList } from "../music/musicSlice";
import { playlistLoad } from "../playlists/playlistSlice";

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

const Favorite = () => {
	const { allFavorites, error, isLoading } = useSelector(
		(state) => state.playlist
	);
	const user = auth.currentUser;
	const navigateTo = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (allFavorites) {
			if (allFavorites.length > 0) {
				dispatch(currentMusicList(allFavorites));
				dispatch(currentMusicIndex(0));
			}
		}
	}, [allFavorites]);

	useEffect(() => {
		if (user && !allFavorites) {
			getAllPlaylistDocs();
		}
	}, [user]);

	const getAllPlaylistDocs = async () => {
		dispatch(playlistLoad(user.uid));
	};

	return (
		<PlayListBox>
			{isLoading && (
				<LoadingBox>
					<Loader>
						<LoaderNote loadingMessage={"fetching your favorite songs ..."} />
					</Loader>
				</LoadingBox>
			)}
			{error && (
				<LoadingBox>
					<FetchError
						error={"Unable to fetch your favorites, please try again!"}
						detail={
							"Unable to fetch favorite songs for some kind of technical issues, please check you connection and try again!"
						}
						tryAgain={() => getAllPlaylistDocs()}
					>
						{error}
					</FetchError>
				</LoadingBox>
			)}
			{!isLoading && !error && allFavorites && allFavorites.length > 0 ? (
				<PlaylistListBox>
					<PlaylistTitle>
						<span>
							{user ? `${user.displayName.split(" ")[0]}'s ` : "your"}
							<span style={{ color: "pink" }}>favorite</span> songs
						</span>
					</PlaylistTitle>
					<ListBox>
						{allFavorites.length > 0 && (
							<>
								{allFavorites.map((favorite, index) => (
									<TrackCard song={favorite} index={index} key={index} />
								))}
							</>
						)}
					</ListBox>
				</PlaylistListBox>
			) : (
				<EmptyFavorites>
					<EmptyMessage>You have no favorites!</EmptyMessage>
					<EmptyBtn onClick={() => navigateTo("/playlists")}>
						Your playlistst
					</EmptyBtn>
				</EmptyFavorites>
			)}
		</PlayListBox>
	);
};

export default Favorite;
