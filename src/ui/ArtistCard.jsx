import styled from "@emotion/styled";
import { BsMusicNoteList } from "react-icons/bs";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;

	width: 16rem;
	border-radius: 1rem;
	background: linear-gradient(to top, var(--color-bg-primary), #0001 30%);
`;

const ImgBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	height: 80%;
	border-radius: 1rem 1rem 0rem 0rem;
	overflow: hidden;
`;

const ArtistName = styled.span`
	font-weight: 600;
	padding: 0rem 1rem;
	color: var(--color-text-secondary);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const SeeBtn = styled.button`
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
	background-color: var(--color-text-tertiary);
	color: var(--color-bg-primary);
	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		background-color: var(--color-text-primary);
	}
`;

const ArtistCard = ({ artist }) => {
	const handlePlay = () => {
		window.open(artist.uri);
	};

	return (
		<Card>
			<ImgBox>
				<SeeBtn onClick={() => handlePlay()}>
					<BsMusicNoteList />
				</SeeBtn>
				<img
					src={artist.avatar}
					alt="cover-art"
					width={"100%"}
					height={"100%"}
				/>
			</ImgBox>
			<ArtistName>{artist.name}</ArtistName>
		</Card>
	);
};

export default ArtistCard;
