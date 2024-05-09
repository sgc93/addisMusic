import styled from "@emotion/styled";
import { BiPlay } from "react-icons/bi";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;

	width: 16rem;
	border-radius: 1rem;
	background: linear-gradient(to top, var(--color-bg-primary), #0001);
`;

const ImgBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	border-radius: 1rem 1rem 0rem 0rem;
	overflow: hidden;
`;

const ArtistName = styled.span`
	font-family: "Caveat", cursive;
	font-weight: 600;
	font-size: 1.6rem;
	color: var(--color-text-secondary);
`;

const MusicName = styled.span`
	width: 100%;
	height: 2rem;
	width: 14rem;
	font-weight: 100;
	font-size: 1rem;
	color: var(--color-text-secondary);
	text-align: center;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const PlayBtn = styled.button`
	position: absolute;
	right: 0;
	bottom: 0;

	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.1rem;
	height: 2.1rem;

	font-size: 1.5rem;
	border: none;
	border-radius: 50%;
	margin: 0.7rem;
	padding: 0.3rem;
	background-color: var(--color-bg-tertiary);
	color: var(--color-text-primary);
	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		background-color: var(--color-bg-primary);
	}
`;

const MusicCard = ({ song }) => {
	const handlePlay = () => {
		window.open(song.uri);
	};

	return (
		<Card>
			<ImgBox>
				<PlayBtn onClick={() => handlePlay()}>
					<BiPlay />
				</PlayBtn>
				<img
					src={song.coverArt}
					alt="cover-art"
					width={"100%"}
					height={"100%"}
				/>
			</ImgBox>
			<ArtistName>{song.artist}</ArtistName>
			<MusicName>{song.name}</MusicName>
		</Card>
	);
};

export default MusicCard;
