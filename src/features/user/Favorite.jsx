import styled from "@emotion/styled";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../config/firebase_config";
import { fadeOpen } from "../../styles/animation";
import FetchError from "../../ui/FetchError";
import LoaderNote from "../../ui/LoaderNote";
import TrackCard from "../../ui/TrackCard";
import { currentMusicIndex, currentMusicList } from "../music/musicSlice";

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
	const user = auth.currentUser;
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [allFavorites, setAllFavorites] = useState([]);
	const navigateTo = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		if (allFavorites.length > 0) {
			dispatch(currentMusicList(allFavorites));
			dispatch(currentMusicIndex(0));
		}
	}, [allFavorites]);

	useEffect(() => {
		if (user) {
			setIsLoading(false);
			getAllPlaylistDocs();
		} else {
			setIsLoading(true);
		}
	}, [user]);

	const getAllPlaylistDocs = async () => {
		setIsLoading(true);
		setError();
		try {
			// Create a query to retrieve all documents from the collection
			const colRef = collection(firestore, `playlists${user.uid}`);
			const q = query(colRef);

			const playlistDocs = await getDocs(q);
			if (playlistDocs.docs.length == 0) {
				throw new Error(
					"Unable to fetch playlist, Check you connection please!"
				);
			}

			const favorites = [];
			playlistDocs.forEach((playlistDoc) => {
				const playlistData = playlistDoc.data();
				playlistData.musics.forEach((music) => {
					if (music.isFavorite) {
						favorites.push(music);
					}
				});
			});

			setAllFavorites(favorites);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
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
			{!isLoading &&
				(allFavorites.length > 0 ? (
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
				))}
		</PlayListBox>
	);
};

export default Favorite;
