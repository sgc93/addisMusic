import styled from "@emotion/styled";
import { how_many_songs } from "../utils/summarizer";

const PlaylistCardBox = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	background-color: var(--color-bg-secondary);
	border-radius: 0.2rem;
	padding: 1rem 2rem;
	width: calc(50% - 5rem);
	cursor: pointer;
	transition: 0.4s;

	&:hover {
		background-color: var(--color-bg-tertiary);
	}
`;

const PlaylistPart = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const CardName = styled.span`
	color: var(--color-bg-primary);
`;

const PlaylistName = styled.span`
	font-size: 1.3rem;
	font-weight: bold;
	text-transform: capitalize;
	color: var(--color-text-primary);
`;
const PlaylistSongs = styled.span`
	text-transform: capitalize;
	color: var(--color-bg-primary);
`;
const PlaylistTime = styled.span`
	opacity: 0.8;
	color: var(--color-bg-primary);
`;

const PlaylistCard = ({ playlist, handleClick, setSelectedPlaylist }) => {
	const { name, createdAt, updatedAt, musics } = playlist;
	const isUpdated = !(createdAt === updatedAt);

	const detailPlaylist = (playlist) => {
		handleClick();
		setSelectedPlaylist(playlist);
	};

	return (
		<PlaylistCardBox onClick={() => detailPlaylist(playlist)}>
			<PlaylistPart>
				<PlaylistName>{name}</PlaylistName>
				<CardName>playlist</CardName>
			</PlaylistPart>
			<PlaylistPart>
				<PlaylistSongs>{how_many_songs(musics.length)}</PlaylistSongs>
				{isUpdated ? (
					<PlaylistTime>Updated {updatedAt}</PlaylistTime>
				) : (
					<PlaylistTime>Created {createdAt}</PlaylistTime>
				)}
			</PlaylistPart>
		</PlaylistCardBox>
	);
};

export default PlaylistCard;
