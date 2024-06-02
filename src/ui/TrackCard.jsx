import styled from "@emotion/styled";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { BiCheckCircle, BiError, BiPause, BiPlay } from "react-icons/bi";
import { BsMusicNote } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { LuLoader2 } from "react-icons/lu";
import { MdClose, MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore, storage } from "../config/firebase_config";
import {
	currentMusicIndex,
	currentMusicOpenedIndex,
	currentMusicPausePlay,
	currentMusicTouch,
} from "../features/music/musicSlice";
import {
	playlistLoad,
	playlistSelect,
	playlistUpdateAll,
	playlistUpdateFavorite,
	playlistUpdateNames,
} from "../features/playlists/playlistSlice";
import { useNavigateMenu } from "../hooks/useNavigateMenu";
import { fadeClose, fadeOpen, rotate360 } from "../styles/animation";
import {
	SuccessBox,
	SuccessImg,
	SuccessMessage,
} from "../styles/styled_components";
import { timeFormatter } from "../utils/time_formater";
import Error from "./Error";
import LoaderNote from "./LoaderNote";

const Card = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.6rem;

	height: 5rem;
	padding: 0rem 1rem;
	border-radius: 0.4rem;
	color: ${(props) =>
		props.isSelected
			? "var(--color-bg-primary)"
			: "var(--color-text-tertiary)"};

	background-color: ${(props) =>
		props.isSelected
			? "var(--color-border-primary)"
			: "var(--color-rad-outer2)"};

	transition: all 0.4s;
	&:hover {
		background-color: var(--color-border-primary);
		color: var(--color-bg-primary);
	}

	animation: ${fadeOpen} 0.4s linear;
`;

const ImgBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 4rem;
	width: 4rem;
	overflow: hidden;
	border-radius: 100%;
`;

const PlayingImg = styled.div`
	position: absolute;
	border-radius: 100%;
	background-color: var(--color-text-secondary);
	animation: ${(props) => (props.isPlaying ? fadeOpen : fadeClose)} 0.6s;
`;

const TrackImg = styled.img`
	display: flex;
	align-items: center;
	height: 100%;
	width: 100%;
	border-radius: 100%;
`;

const DataBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	padding: 0rem 1rem 0.5rem;
	width: 30%;
`;

const ArtistName = styled.span`
	font-weight: 600;
	font-size: 1.3rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: ${(props) => (props.isSelected ? "var(--color-gradient-1)" : "")};
`;

const MusicName = styled.span`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 1.1rem;
`;

const MusicTime = styled.span`
	display: flex;
	align-items: center;
	font-size: 1.2rem;
`;

const BtnBox = styled.div`
	position: absolute;
	right: 0;
	bottom: 1rem;

	display: flex;
	flex-direction: column;
	align-items: end;
	justify-content: end;

	height: 5.5rem;
`;

const BtnList = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	padding: 0.3rem 1rem;
	margin: 0.2rem;
`;

const BtnText = styled.span`
	align-self: flex-end;
	padding: 0.4rem 0.7rem;
	border-radius: 1rem;
	color: var(--color-text-primary);
	background-color: var(--color-bg-tertiary);
	backdrop-filter: blur(5rem);
	animation: ${(props) => (props.hint ? fadeOpen : fadeClose)} 0.5s;
`;

const Btn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.1rem;
	height: 2.1rem;

	font-size: 1.5rem;
	border: none;
	border-radius: 50%;
	padding: 0.3rem;
	background: ${(props) =>
		props.shouldBeBold ? "var(--color-bg-primary)" : "none"};
	color: ${(props) =>
		props.shouldBeBold
			? props.isSucceed
				? "var(--color-text-success)"
				: props.error
				? "var(--color-text-warning)"
				: "var(--color-text-primary),"
			: "var(--color-text-primary)"};
	cursor: pointer;
	transition: all 0.4s;

	animation: ${(props) => (props.isLoading ? rotate360 : "")} 1s linear;
	animation-iteration-count: infinite;

	&:hover {
		background-color: var(--color-bg-primary);
	}
`;

const DotBtnBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const DotBtnDetail = styled.div`
	position: absolute;
	right: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.4rem;

	width: 13rem;
	padding: 0.7rem;
	margin: 0.5rem;
	border-radius: 0.4rem;
	box-shadow: -1rem 1rem 03rem 0.3rem var(--color-bg-tertiary);

	background: radial-gradient(
		var(--color-rad-outer) 10%,
		var(--color-bg-primary)
	);
	backdrop-filter: blur(7rem);

	animation: ${(props) => (props.isOpened ? fadeOpen : fadeClose)} 0.8s;

	z-index: 1;
`;

const DetailTitle = styled.div`
	color: var(--color-gradient-2);
	text-transform: capitalize;
	font-weight: bold;
	border-bottom: 1px solid var(--color-border-primary);
`;

const DetailChoice = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.7rem;

	padding: 0.4rem;
`;

const Choice = styled.div`
	display: flex;
	flex-direction: column;
	align-items: end;
	gap: 0.5rem;
`;
const ChoiceTitle = styled.span`
	color: ${(props) =>
		props.isDelete
			? "var(--color-text-warning)"
			: "var(--color-text-tertiary)"};
	font-weight: thin;
	font-size: small;
`;

const ChoiceBtn = styled.button`
	padding: 0.3rem 0.6rem;
	background-color: ${(props) =>
		props.isDelete ? "var(--color-text-error)" : "var(--color-bg-primary)"};
	color: var(--color-text-primary);
	font-weight: bold;
	border-radius: 0.4rem;
	border: 2px solid var(--color-bg-primary);
	outline: none;

	opacity: 0.8;
	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		opacity: 1;
		border-color: var(--color-text-tertiary);
	}
	&:active {
		opacity: 1;
		border-color: var(--color-border-primary);
	}
`;

const TrackNo = styled.span`
	padding-right: 1rem;
	font-size: 1.2rem;
	font-weight: 600;
`;

const btnStyle = {
	backgroundColor: "var(--color-text-primary)",
};

const Playlists = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;

	width: 100%;
`;

const PlaylistBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0.3rem 0.6rem;
	background-color: var(--color-bg-primary);
	color: var(--color-text-primary);
	font-weight: bold;
	border-radius: 0.4rem;
	border: 2px solid var(--color-bg-primary);
	outline: none;

	opacity: 0.8;
	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		opacity: 1;
		border-color: var(--color-text-tertiary);
	}
	&:active {
		opacity: 1;
		border-color: var(--color-border-primary);
	}
`;

const Name = styled.span`
	width: 80%;
	height: 1rem;
	text-align: start;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const Musics = styled.span`
	display: flex;
	align-items: center;
	gap: 0.1rem;

	color: var(--color-text-tertiary);
	font-weight: 100;
`;

const TrackCard = ({
	song,
	index,
	shouldMore,
	shouldMoreAdd,
	isLocal,
	setAddFromList,
}) => {
	const dispatch = useDispatch();
	const user = auth.currentUser;
	const openRoute = useNavigateMenu();

	const { music, isPaused, currMusicIndex, touchedIndex, openedIndex } =
		useSelector((state) => state.currMusic);
	const { allPlaylists, allFavorites, playlistNames } = useSelector(
		(state) => state.playlist
	);
	const isAdding = useSelector((state) => state.playlist.isLoading);
	const addError = useSelector((state) => state.playlist.error);
	const [hasPlaylist, setHasPlaylist] = useState(false);
	const [isAddingTo, setIsAddingTo] = useState(false);

	const isSelected = currMusicIndex == index;
	const isTouched = touchedIndex === index;
	const isDetailOpened = openedIndex === index;

	const [hint, setHint] = useState("");
	const [deleteStatus, setDeleteStatus] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [isSucceed, setIsSucceed] = useState(false);

	useEffect(() => {
		let timeoutId;
		if (isSucceed || error) {
			timeoutId = setTimeout(() => {
				setIsSucceed(false);
				setError("");
				dispatch(currentMusicTouch(null));
			}, 3000);
		}

		return () => clearTimeout(timeoutId);
	}, [error, isSucceed]);

	useEffect(() => {
		let timeoutId;
		if (isDetailOpened && (error || isSucceed)) {
			timeoutId = setTimeout(
				() => {
					setIsSucceed(false);
					setError("");
					handleOpenDetail();
				},
				isSucceed ? 1000 : 2000
			);
		}

		return () => clearTimeout(timeoutId);
	}, [isSucceed, error]);

	useEffect(() => {
		const playlists = [];
		if (allPlaylists) {
			allPlaylists.forEach((playlist) =>
				playlists.push({ name: playlist.name, musics: playlist.musics.length })
			);
			dispatch(playlistUpdateNames(playlists));
			setHasPlaylist(true);
		}
	}, [allPlaylists]);

	const handlePlay = (index) => {
		if (currMusicIndex != index) {
			dispatch(currentMusicIndex(index));
			if (!isPaused) {
				music.play();
				dispatch(currentMusicPausePlay(true));
			}
		} else {
			if (isPaused) {
				music.pause();
				dispatch(currentMusicPausePlay(false));
			} else {
				music.play();
				dispatch(currentMusicPausePlay(true));
			}
		}
	};

	const favorite = async (song, isFavorite) => {
		try {
			setIsLoading(true);
			setError("");
			setIsSucceed(false);

			const docRef = doc(firestore, `playlists${user.uid}`, song.playlist);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists) {
				const docData = docSnap.data();
				const allMusics = docData.musics;

				const updatedMusicList = allMusics.map((music) => {
					if (music.title === song.title) {
						return { ...music, isFavorite: isFavorite };
					} else {
						return music;
					}
				});

				// updating the playlist with the updated music list
				const updatedDocData = { ...docData, musics: updatedMusicList };
				await updateDoc(docRef, updatedDocData);
				const updatedPlaylists = [];
				const favorites = [];
				allPlaylists.forEach((playlist) => {
					if (playlist.name === song.playlist) {
						updatedPlaylists.push(updatedDocData);
					} else {
						updatedPlaylists.push(playlist);
					}
				});
				if (isFavorite) {
					allFavorites.forEach((music) => {
						favorites.push(music);
					});
					favorites.push({ ...song, isFavorite: true });
				} else {
					allFavorites.forEach((music) => {
						if (music.title !== song.title) {
							favorites.push(music);
						}
					});
				}
				console.log(favorites);
				dispatch(playlistUpdateAll(updatedPlaylists));
				dispatch(playlistSelect(updatedDocData));
				dispatch(playlistUpdateFavorite(favorites));
				setIsSucceed(true);
			}
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFavoriteIcon = (song) => {
		dispatch(currentMusicTouch(index));

		if (song.isFavorite) {
			favorite(song, false);
		} else {
			favorite(song, true);
		}
	};

	const handleOpenDetail = () => {
		if (isDetailOpened) {
			dispatch(currentMusicOpenedIndex(null));
			setIsAddingTo(false);
		} else {
			dispatch(currentMusicOpenedIndex(index));
		}
	};

	const handleDeletingMusic = async (song) => {
		try {
			setIsLoading(true);
			setError("");
			setDeleteStatus("");
			setIsSucceed(false);

			setDeleteStatus("Navigating to music's playlists ...");
			const docRef = doc(firestore, `playlists${user.uid}`, song.playlist);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists) {
				const docData = docSnap.data();
				const { musics } = docData;
				const updatedMusicList = [];
				musics.forEach((music) => {
					if (music.title !== song.title) {
						updatedMusicList.push(music);
					}
				});

				setDeleteStatus("Deleting music metadata ...");
				const newPlaylistData = { ...docData, musics: updatedMusicList };
				const updatedPlaylists = [];
				allPlaylists.forEach((playlist) => {
					if (playlist.name === song.playlist) {
						updatedPlaylists.push(newPlaylistData);
					} else {
						updatedPlaylists.push(playlist);
					}
				});
				dispatch(playlistUpdateAll(updatedPlaylists));
				dispatch(playlistSelect(newPlaylistData));
				await updateDoc(docRef, newPlaylistData);

				// Create a reference to the file to delete
				const songRef = ref(storage, song.songRef);
				const coverRef = ref(storage, song.coverRef);

				setDeleteStatus("Deleting music file ...");
				deleteObject(songRef)
					.then(() => {
						//
					})
					.catch((error) => {
						setError("Unable to delete song file.");
					});

				setDeleteStatus("Deleting music's cover art file ...");
				deleteObject(coverRef)
					.then(() => {
						//
					})
					.catch((error) => {
						setError("Unable to delete cover art file.");
					});
				setIsSucceed(true);
			}
		} catch (error) {
			setError("Unable to delete music, please try again!");
		} finally {
			setDeleteStatus("");
			setIsLoading(false);
		}
	};

	const addToPlaylist = (song) => {
		// check if user signed in
		if (user) {
			setIsAddingTo(true);
			if (playlistNames) {
				if (playlistNames.length > 0) {
					setHasPlaylist(true);
				} else {
					setHasPlaylist(false);
				}
			} else {
				dispatch(playlistLoad(user.uid));
			}
		} else {
			console.log("signed in first please");
		}
	};

	const addSongTo = (song, playlistName) => {
		setAddFromList({ song: song, playlistName: playlistName });
		handleOpenDetail();
	};

	return (
		<Card isSelected={isSelected}>
			<TrackNo>{index + 1}</TrackNo>

			<ImgBox>
				<TrackImg
					src={song.coverArt}
					alt="cover-art"
					width={"100%"}
					height={"100%"}
				/>
				{isSelected && isPaused && (
					<PlayingImg isPlaying={isPaused}>
						<img src="./playing.gif" width={200} />
					</PlayingImg>
				)}
			</ImgBox>
			<DataBox>
				<ArtistName isSelected={isSelected}>{song.artist}</ArtistName>
				<MusicName>{song.title}</MusicName>
			</DataBox>
			{!isLocal && <MusicTime>{timeFormatter(song.duration)}</MusicTime>}
			<BtnBox>
				{hint && <BtnText hint={hint}>{hint}</BtnText>}
				<BtnList>
					{shouldMore && (
						<DotBtnBox>
							{isDetailOpened && (
								<DotBtnDetail isOpened={isDetailOpened}>
									<DetailTitle>
										{" "}
										{isLoading && !isSucceed
											? `Deleting ${song.title} ...`
											: isAddingTo
											? "Select playlist"
											: song.title}
									</DetailTitle>
									<DetailChoice>
										{shouldMoreAdd &&
											(isAdding ? (
												<>
													<LoaderNote
														loadingMessage={"loading playlists ..."}
													/>
												</>
											) : (
												<Choice>
													{isAddingTo ? (
														hasPlaylist ? (
															<Playlists>
																{playlistNames.map((playlist, index) => (
																	<PlaylistBtn
																		key={index}
																		onClick={() =>
																			addSongTo(song, playlist.name)
																		}
																	>
																		<Name>{playlist.name}</Name>
																		<Musics>
																			<BsMusicNote />
																			<span>{playlist.musics}</span>
																		</Musics>
																	</PlaylistBtn>
																))}
															</Playlists>
														) : (
															<Playlists>
																<span
																	style={{
																		color: "var(--color-text-secondary)",
																		textAlign: "center",
																	}}
																>
																	You have no playlists yet, create on first!
																</span>
																<ChoiceBtn
																	onClick={() => openRoute("playlists")}
																>
																	Create playlist
																</ChoiceBtn>
															</Playlists>
														)
													) : (
														<>
															<ChoiceTitle>
																Build thicker one of your playlist with{" "}
																<span
																	style={{ color: "var(--color-gradient-2)" }}
																>
																	{song.title}
																</span>
															</ChoiceTitle>
															<ChoiceBtn onClick={() => addToPlaylist(song)}>
																Add to playlist
															</ChoiceBtn>
														</>
													)}
												</Choice>
											))}
										{isLoading && <LoaderNote loadingMessage={deleteStatus} />}
										{isSucceed && (
											<SuccessBox>
												<SuccessImg src="./thumbsup.gif" />
												<SuccessMessage>
													You have deleted {song.title} from {song.playlist}{" "}
													successfully!
												</SuccessMessage>
											</SuccessBox>
										)}
										{error && <Error errorMessage={error} />}
										{!isLoading && !isSucceed && !error && !isLocal && (
											<Choice>
												<ChoiceTitle isDelete={true}>
													<BiError size={15} />{" "}
													<span style={{ fontWeight: "bold" }}>
														Delete this music from {song.playlist} permanently!
													</span>
												</ChoiceTitle>
												<ChoiceBtn
													onClick={() => handleDeletingMusic(song)}
													isDelete={true}
												>
													Delete
												</ChoiceBtn>
											</Choice>
										)}
									</DetailChoice>
								</DotBtnDetail>
							)}

							<Btn
								onClick={() => handleOpenDetail()}
								onMouseEnter={() =>
									setHint(isDetailOpened ? "" : "add to your things")
								}
								onMouseLeave={() => setHint("")}
								shouldBeBold={isDetailOpened}
								style={
									isSelected && isDetailOpened
										? { color: "var(--color-text-primary)" }
										: isDetailOpened
										? { color: "var(--color-text-primary)" }
										: {}
								}
							>
								{isDetailOpened ? <MdClose /> : <HiDotsVertical />}
							</Btn>
						</DotBtnBox>
					)}
					{!isLocal && (
						<Btn
							onClick={() => handleFavoriteIcon(song)}
							onMouseEnter={() =>
								setHint(
									song.isFavorite ? "remove from favorites" : "add to favorites"
								)
							}
							onMouseLeave={() => setHint("")}
							shouldBeBold={isTouched && (isLoading || error || isSucceed)}
							isSucceed={isSucceed}
							error={error}
							isLoading={isTouched && isLoading}
						>
							{isTouched ? (
								!isLoading && !error && !isSucceed ? (
									song.isFavorite ? (
										<GoHeartFill color="red" />
									) : (
										<GoHeart color="red" />
									)
								) : isLoading ? (
									<LuLoader2 />
								) : error ? (
									<MdError />
								) : (
									isSucceed && <BiCheckCircle />
								)
							) : song.isFavorite ? (
								<GoHeartFill color="red" />
							) : (
								<GoHeart color="red" />
							)}
						</Btn>
					)}
					<Btn
						onClick={() => handlePlay(index)}
						onMouseEnter={() => {
							setHint(isPaused && isSelected ? "pause" : "play");
						}}
						onMouseLeave={() => {
							setHint("");
						}}
						shouldBeBold={isSelected}
						isSelected={isSelected}
						style={isSelected ? btnStyle : {}}
					>
						{isSelected && isPaused ? <BiPause /> : <BiPlay />}
					</Btn>
				</BtnList>
			</BtnBox>
		</Card>
	);
};

export default TrackCard;
