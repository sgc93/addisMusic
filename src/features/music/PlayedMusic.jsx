import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const MusicBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	height: 4rem;
	margin: 0.5rem 1rem 0.5rem 1rem;
	border-right: 1px solid var(--color-border-primary);
`;

const rotate = keyframes`
	0% {
		transform: rotate(0deg)
	}
	100% {
		transform: rotate(360deg)
	}
`;

const MusicData = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.1rem;
`;

const ArtistName = styled.span`
	font-family: "Caveat", cursive;
	font-size: 1.5rem;
	color: var(--color-text-secondary);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const MusicName = styled.span`
	width: 15rem;
	height: 2rem;
	font-size: 1rem;
	color: var(--color-text-tertiary);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const MusicImg = styled.img`
	display: flex;
	align-items: center;
	height: 3.5rem;
	width: 3.5rem;
	padding: 3px;
	background: linear-gradient(
		45deg,
		var(--color-gradient-1),
		var(--color-gradient-2),
		var(--color-gradient-3)
	);
	border-radius: 100%;

	animation: ${(props) => (props.isPaused ? rotate : "")} 2s linear infinite;
`;

const PlayedMusic = ({ playedMusic }) => {
	const isPaused = useSelector((state) => state.currMusic.isPaused);
	return (
		<MusicBox>
			<MusicImg
				src={playedMusic.coverArt}
				alt="playing-music"
				isPaused={isPaused}
			/>
			<MusicData>
				<ArtistName>{playedMusic.artist}</ArtistName>
				<MusicName>{playedMusic.name}</MusicName>
			</MusicData>
		</MusicBox>
	);
};

export default PlayedMusic;
