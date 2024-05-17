import styled from "@emotion/styled";
import { BiArrowBack } from "react-icons/bi";
import { fadeOpen } from "../../styles/animation";
import { AnimatedBtn } from "../../styles/styled_components";
import IconButton from "../../ui/IconButton";
import MusicCard from "../../ui/MusicCard";
import { how_many_songs } from "../../utils/summarizer";

const DetailBox = styled.section`
	display: flex;
	flex-direction: column;
	gap: 0.7rem;

	width: 100%;
	height: 100%;
	animation: ${fadeOpen} 0.4s linear;
`;

const DetailHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 1rem;

	padding: 0.5rem 1rem;
	width: 100%;
	height: 40%;
	border-radius: 1rem 1rem;
	background: linear-gradient(
		to top,
		var(--color-bg-primary),
		var(--color-bg-tertiary)
	);
`;

const HeaderContent = styled.div`
	display: flex;
	gap: 1.3rem;
`;

const PlaylistImg = styled.div`
	height: 12rem;
	width: 13rem;

	border-radius: 0.6rem;
	background-image: url("./light1.jpg");
	background-size: cover;
	background-position: center;
`;

const HeaderLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	gap: 1rem;
`;

const PlaylistName = styled.span`
	font-size: 2.1rem;
	font-weight: bold;
	text-transform: capitalize;
	color: var(--color-text-primary);
`;

const PlaylistSongs = styled.span`
	text-transform: capitalize;
	color: var(--color-text-secondary);
`;

const PlaylistTime = styled.span`
	opacity: 0.8;
	color: var(--color-text-tertiary);
`;

const DetailContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	width: 100%;
`;

const ListTitle = styled.span`
	color: var(--color-bg-primary);
	font-size: 1.2rem;
	font-weight: bold;
`;

const MusicList = styled.div``;

const PlaylistDetail = ({ playlist, setIsDetailing }) => {
	const { name, createdAt, updatedAt, musics } = playlist;
	const isUpdated = !(createdAt === updatedAt);

	const backToPlaylists = () => setIsDetailing(false);

	return (
		<DetailBox>
			<DetailHeader>
				<IconButton handleClick={() => backToPlaylists()}>
					<BiArrowBack />
				</IconButton>
				<HeaderContent>
					<PlaylistImg />
					<HeaderLeft>
						<PlaylistName>{name}</PlaylistName>
						<PlaylistSongs>{how_many_songs(musics.length)}</PlaylistSongs>
						<PlaylistTime>
							{isUpdated
								? `updated at ${updatedAt}`
								: `created at ${createdAt}`}
						</PlaylistTime>
					</HeaderLeft>
				</HeaderContent>
			</DetailHeader>
			<DetailContent>
				{musics.length == 0 && <AnimatedBtn> Add music</AnimatedBtn>}
				{musics.length > 0 && (
					<>
						<ListTitle>
							Musics in{" "}
							<span style={{ color: "var(--color-gradient-1)" }}>{name}</span>
						</ListTitle>
						<MusicList>
							{musics.map((music, index) => (
								<MusicCard song={music} key={index} />
							))}
						</MusicList>
					</>
				)}
			</DetailContent>
		</DetailBox>
	);
};

export default PlaylistDetail;
