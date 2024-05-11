import styled from "@emotion/styled";
import { useState } from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
	currentMusicIndex,
	currentMusicPausePlay,
} from "../../features/music/musicSlice";
import { fadeClose, fadeOpen } from "../../styles/animation";
import { timeFormatter } from "../../utils/time_formater";

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

	&.span {
		color: ${(props) =>
			props.isSelected
				? "var(--color-gradient-1)"
				: "var(--color-text-secondary)"};
	}
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
	background-color: ${(props) =>
		props.bg == "colored"
			? "var(--color-text-primary)"
			: "var(--color-border-primary)"};
	color: ${(props) =>
		props.bg == "colored"
			? "var(--color-bg-primary)"
			: "var(--color-bg-tertiary)"};
	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		background-color: var(--color-text-primary);
		color: var(--color-bg-primary);
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
	background-color: var(--color-bg-tertiary);
	backdrop-filter: blur(7rem);

	animation: ${(props) => (props.isOpened ? fadeOpen : fadeClose)} 0.5s linear;

	z-index: 1;
`;

const DetailTitle = styled.div`
	color: var(--color-text-tertiary);
	border-bottom: 1px solid var(--color-border-primary);
	opacity: 0.8;
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
	color: var(--color-bg-primary);
	font-weight: thin;
`;
const ChoiceBtn = styled.button`
	padding: 0.2rem 0.5rem;
	background-color: var(--color-bg-secondary);
	color: var(--color-text-primary);
	font-weight: bold;
	border-radius: 0.4rem;
	border: none;
	outline: none;

	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		background-color: var(--color-bg-primary);
	}
`;

const TrackNo = styled.span`
	padding-right: 1rem;
	font-size: 1.2rem;
	font-weight: 600;
`;

const TrackCard = ({ song, index }) => {
	const dispatch = useDispatch();
	const { music, isPaused, currMusicIndex } = useSelector(
		(state) => state.currMusic
	);
	const isSelected = currMusicIndex == index;
	const [hint, setHint] = useState("");
	const [isOpened, setIsOpened] = useState(false);

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

	const addToFavorite = () => {
		// add to favorite
	};
	const addToSongs = () => {
		// add to user's songs list
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
					<PlayingImg>
						<img src="./playing.gif" width={200} />
					</PlayingImg>
				)}
			</ImgBox>
			<DataBox>
				<ArtistName isSelected={isSelected}>{song.artist}</ArtistName>
				<MusicName>{song.name}</MusicName>
			</DataBox>
			<MusicTime>{timeFormatter(song.duration)}</MusicTime>
			<BtnBox>
				{hint && <BtnText>{hint}</BtnText>}
				<BtnList>
					<DotBtnBox>
						{isOpened && (
							<DotBtnDetail isOpened={isOpened}>
								<DetailTitle> {song.name}</DetailTitle>
								<DetailChoice>
									<Choice>
										<ChoiceTitle>
											Build thicker one of your playlist with this track
										</ChoiceTitle>
										<ChoiceBtn onClick={() => {}}>Add to playlist</ChoiceBtn>
									</Choice>
									<Choice>
										<ChoiceTitle>
											Enrich your song list by one more track
										</ChoiceTitle>
										<ChoiceBtn onClick={() => {}}>Add to playlist</ChoiceBtn>
									</Choice>
								</DetailChoice>
							</DotBtnDetail>
						)}

						<Btn
							onClick={() => setIsOpened((isOpened) => !isOpened)}
							onMouseEnter={() => setHint(isOpened ? "" : "add to your things")}
							onMouseLeave={() => setHint("")}
							bg={isOpened ? "colored" : ""}
						>
							{isOpened ? <MdClose /> : <CgAdd />}
						</Btn>
					</DotBtnBox>
					<Btn
						onClick={() => addToFavorite()}
						onMouseEnter={() =>
							setHint(
								song.isFavorite ? "remove from favorites" : "add to favorites"
							)
						}
						onMouseLeave={() => setHint("")}
						bg={song.isFavorite ? "colored" : ""}
					>
						{song.isFavorite ? (
							<GoHeartFill color="red" />
						) : (
							<GoHeart color="red" />
						)}
					</Btn>
					<Btn
						onClick={() => handlePlay(index)}
						onMouseEnter={() => {
							setHint(isPaused && isSelected ? "pause" : "play");
						}}
						onMouseLeave={() => {
							setHint("");
						}}
						bg={isSelected ? "colored" : ""}
					>
						{isSelected && isPaused ? <BiPause /> : <BiPlay />}
					</Btn>
				</BtnList>
			</BtnBox>
		</Card>
	);
};

export default TrackCard;
