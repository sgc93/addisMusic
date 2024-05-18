import styled from "@emotion/styled";
import { collection, getDocs, query } from "firebase/firestore";
import { FirestoreError } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { TbMusicPlus } from "react-icons/tb";
import { auth, firestore } from "../../config/firebase_config";
import { fadeClose, fadeOpen } from "../../styles/animation";
import { AnimatedBtn } from "../../styles/styled_components";
import FetchError from "../../ui/FetchError";
import LoaderNote from "../../ui/LoaderNote";
import PlaylistCard from "../../ui/PlaylistCard";
import EmptyPlaylist from "../playlists/EmptyPlylist";
import PlaylistAddCard from "../playlists/PlaylistAddCard";
import PlaylistDetail from "../playlists/PlaylistDetail";

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
`;
const AddBtnToolTip = styled.span`
	position: absolute;
	left: 100%;

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
	const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);

	const user = auth.currentUser;

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isDetailing, setIsDetailing] = useState(false);
	const [selectedPlaylist, setSelectedPlaylist] = useState("");

	const [shouldDisplayed, setShouldDisplayed] = useState();

	const [userPlaylists, setUserPlaylists] = useState([]);

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

			const playlists = await getDocs(q);
			if (playlists.docs.length == 0) {
				throw new Error(
					"Unable to fetch playlist, Check you connection please!"
				);
			}

			const allPlaylists = [];
			playlists.forEach((playlistDoc) => {
				const playlistData = playlistDoc.data();
				allPlaylists.push(playlistData);
				console.log(playlistData);
			});
			setUserPlaylists(allPlaylists);
		} catch (error) {
			if (error instanceof FirestoreError) {
				console.log("firestore error is happened!");
			}
			console.log("Error getting documents:", error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const openPlaylistAdd = () => {
		setIsAddPlaylistOpen(true);
	};
	const showPlaylistDetail = () => {
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
						tryAgain={() => getAllPlaylistDocs()}
					>
						{error}
					</FetchError>
				</LoadingBox>
			)}
			{!isLoading && userPlaylists.length > 0 && !isDetailing && (
				<PlaylistListBox>
					<PlaylistTitle>
						<span>
							{user.displayName
								? `${user.displayName.split(" ")[0]}'s `
								: "your"}
							Playlists
						</span>
					</PlaylistTitle>
					<ListBox>
						{userPlaylists.map((playlist) => (
							<PlaylistCard
								key={playlist.name}
								playlist={playlist}
								setSelectedPlaylist={setSelectedPlaylist}
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
					playlist={selectedPlaylist}
					setIsDetailing={setIsDetailing}
				/>
			)}
			{userPlaylists.length == 0 && !isLoading && !error && <EmptyPlaylist />}

			{isAddPlaylistOpen && (
				<PlaylistAddCard
					isOpened={isAddPlaylistOpen}
					setIsOpened={setIsAddPlaylistOpen}
				/>
			)}
		</PlayListBox>
	);
};

export default PlayList;
