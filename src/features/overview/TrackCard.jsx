import styled from "@emotion/styled";
import { useState } from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { GoHeart } from "react-icons/go";
import { timeFormatter } from "../../utils/time_formater";

const Card = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.6rem;

	height: 5rem;
	padding: 0rem 1rem;
	border-radius: 0.5rem;
	color: ${(props) =>
		props.isSelected
			? "var(--color-gradient-3)"
			: "var(--color-text-secondary)"};

	background-color: ${(props) =>
		props.isSelected ? "var(--color-border-primary)" : ""};

	box-shadow: -0.5px 0.5px 5px 1px var(--color-bg-tertiary);
	transition: all 0.4s;
	&:hover {
		background-color: var(--color-border-primary);
		color: var(--color-gradient-3);
	}
`;

const ImgBox = styled.div`
	display: flex;
	align-items: center;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	overflow: hidden;
`;

const DataBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	padding: 0rem 1rem 0.5rem;
	min-width: 10rem;
`;

const ArtistName = styled.span`
	font-family: "Caveat", cursive;
	font-weight: 600;
	font-size: 1.4rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const MusicName = styled.span`
	font-weight: 100;
	font-size: 1rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const MusicTime = styled.span`
	display: flex;
	align-items: center;
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
	background-color: var(--color-border-primary);
	color: var(--color-bg-tertiary);
	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		background-color: var(--color-text-primary);
		color: var(--color-bg-primary);
	}
`;

const TrackCard = ({ songs, song, index }) => {
	const [selectedIndex, setSelectedIndex] = useState();
	const [hint, setHint] = useState("");

	const handlePlay = (index) => {
		setSelectedIndex(index);
		console.log(`is selected: ${index == selectedIndex}`);
		console.log(`selected music: ${songs[selectedIndex]}`);
	};
	const addToFavorite = () => {
		// add to favorite
	};
	const addToSongs = () => {
		// add to user's songs list
	};

	return (
		<Card isSelected={index === selectedIndex}>
			<ImgBox>
				<img
					src={song.coverArt}
					alt="cover-art"
					width={"100%"}
					height={"100%"}
				/>
			</ImgBox>
			<DataBox>
				<ArtistName>{song.artist}</ArtistName>
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
						onMouseEnter={() => setHint("play")}
						onMouseLeave={() => setHint("")}
					>
						{selectedIndex == index ? <BiPause /> : <BiPlay />}
					</Btn>
				</BtnList>
			</BtnBox>
		</Card>
	);
};

export default TrackCard;
