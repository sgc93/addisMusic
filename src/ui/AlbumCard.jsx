import styled from "@emotion/styled";
import { TbMusicExclamation } from "react-icons/tb";

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

const AlbumName = styled.span`
	font-weight: 600;
	padding: 0rem 1rem;
	color: var(--color-text-secondary);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Box = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	width: 14rem;
	padding: 0rem 1rem 1rem;
`;

const ArtistName = styled.span`
	height: 2rem;
	font-size: 1rem;
	color: var(--color-text-tertiary);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Year = styled.span`
	color: var(--color-text-tertiary);
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

const AlbumCard = ({ album }) => {
	const handlePlay = () => {
		window.open(album.uri);
	};

	return (
		<Card>
			<ImgBox>
				<SeeBtn onClick={() => handlePlay()}>
					<TbMusicExclamation />
				</SeeBtn>
				<img
					src={album.coverArt}
					alt="cover-art"
					width={"100%"}
					height={"100%"}
				/>
			</ImgBox>
			<AlbumName>{album.name}</AlbumName>
			<Box>
				<ArtistName>{album.artist}</ArtistName>
				<Year>{album.year}</Year>
			</Box>
		</Card>
	);
};

export default AlbumCard;
