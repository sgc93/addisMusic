import styled from "@emotion/styled";
import { useState } from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
	currentMusicIndex,
	currentMusicPausePlay,
} from "../../features/music/musicSlice";
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
	background-color: var(--color-border-primary);
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
	align-items: center;
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
	const [isPlayerHover, setIsPlayerHover] = useState(false);

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
					<Btn
						onClick={() => addToFavorite()}
						onMouseEnter={() => setHint("add to favorites")}
						onMouseLeave={() => setHint("")}
					>
						<GoHeart color="red" />
					</Btn>
					<Btn
						onClick={() => addToSongs()}
						onMouseEnter={() => setHint("add to you songs")}
						onMouseLeave={() => setHint("")}
					>
						<CgAdd />
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
