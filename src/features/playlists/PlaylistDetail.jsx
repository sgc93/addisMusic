import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { fadeOpen } from "../../styles/animation";
import IconButton from "../../ui/IconButton";
import TrackCard from "../../ui/TrackCard";
import { how_many_songs } from "../../utils/summarizer";
import { currentMusicIndex, currentMusicList } from "../music/musicSlice";
import SongAddCard from "./SongAddCard";

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
	display: ${(props) => (props.shouldDisplay ? "flex" : "none")};

	flex-direction: column;
	gap: 0.5rem;

	width: 100%;
	padding: 0.3rem 0.5rem 1rem;
	animation: ${fadeOpen} 0.4s linear;
`;

const ListTitle = styled.span`
	color: var(--color-bg-primary);
	font-size: 1.2rem;
	font-weight: bold;
`;

const MusicList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const AddBtn = styled.button`
	align-self: center;
	font-weight: bold;
	font-size: 1.2rem;

	padding: 0.5rem 1rem;
	margin-top: 1rem;
	border: none;
	outline: none;
	border-radius: 0.4rem;
	color: var(--color-text-secondary);
	background-color: var(--color-bg-primary);

	opacity: 0.9;
	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		opacity: 1;
		color: var(--color-text-primary);
	}
`;

const PlaylistDetail = ({ playlist, setIsDetailing }) => {
	const { name, createdAt, updatedAt, musics } = playlist;
	const isUpdated = !(createdAt === updatedAt);
	const dispatch = useDispatch();
	const [isAddSongOpen, setIsAddSongOpen] = useState(false);

	useEffect(() => {
		if (playlist) {
			dispatch(currentMusicList(playlist.musics));
			dispatch(currentMusicIndex(0));
		}
	});

	const backToPlaylists = () => setIsDetailing(false);
	const openMusicAdd = () => setIsAddSongOpen(true);

	return (
		<DetailBox>
			{isAddSongOpen && (
				<SongAddCard
					isOpened={isAddSongOpen}
					setIsOpened={setIsAddSongOpen}
					playlistName={playlist.name}
				/>
			)}
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
			<DetailContent shouldDisplay={!isAddSongOpen}>
				{musics.length == 0 && (
					<AddBtn onClick={() => openMusicAdd()}> Add music</AddBtn>
				)}
				{musics.length > 0 && (
					<>
						<ListTitle>
							Musics in{" "}
							<span style={{ color: "var(--color-gradient-1)" }}>{name}</span>
						</ListTitle>
						<MusicList>
							{musics.map((music, index) => (
								<TrackCard song={music} index={index} key={index} />
							))}
							<AddBtn onClick={() => openMusicAdd()}>Add more music</AddBtn>
						</MusicList>
					</>
				)}
			</DetailContent>
		</DetailBox>
	);
};

export default PlaylistDetail;
