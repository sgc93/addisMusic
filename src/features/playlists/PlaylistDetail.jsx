import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { CgMore } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fadeOpen } from "../../styles/animation";
import IconButton from "../../ui/IconButton";
import TrackCard from "../../ui/TrackCard";
import { how_many_songs, playlist_summarizer } from "../../utils/summarizer";
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
	margin-bottom: 0.6rem;
`;

const PlaylistImg = styled.div`
	width: 12rem;
	height: 10rem;

	border-radius: 0.6rem;
	background-image: url("./light1.jpg");
	background-size: cover;
	background-position: center;
`;

const HeaderLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
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

const About = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 1rem;
	margin-left: 3rem;
`;

const AboutBtn = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const BtnBox = styled.span`
	background-color: var(--color-bg-primary);
	border-radius: 0.3rem;
`;

const BtnTooltip = styled.span`
	display: ${(props) => (props.isHovered ? "block" : "none")};
	position: absolute;
	right: calc(100% + 0.4rem);
	top: 0;
	width: 5rem;
	padding: 0.2rem 0.4rem;

	border-radius: 0.6rem;
	background-color: var(--color-text-secondary);
	color: var(--color-bg-primary);
	font-weight: bold;
	font-size: small;
	text-align: center;
	animation: ${fadeOpen} 0.4s linear;
`;

const AboutDetail = styled.div`
	display: flex;
`;

const PlaylistDetail = ({ playlist, setIsDetailing }) => {
	const { name, createdAt, updatedAt, musics } = playlist;
	const isUpdated = !(createdAt === updatedAt);
	const dispatch = useDispatch();
	const [isAddSongOpen, setIsAddSongOpen] = useState(false);

	const [isHovered, setIsHovered] = useState(false);
	const [isDetailed, setIsDetailed] = useState(true);

	useEffect(() => {
		if (playlist) {
			playlist_summarizer(playlist);
			dispatch(currentMusicList(playlist.musics));
			dispatch(currentMusicIndex(0));
		}
	}, []);

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
						<PlaylistTime>playlist</PlaylistTime>
						<PlaylistName>{name}</PlaylistName>
						<PlaylistSongs>{how_many_songs(musics.length)}</PlaylistSongs>
						<PlaylistTime>
							{isUpdated
								? `updated at ${updatedAt}`
								: `created at ${createdAt}`}
						</PlaylistTime>
					</HeaderLeft>
					<About>
						<AboutBtn>
							<BtnBox
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<IconButton
									handleClick={() => setIsDetailed((isDetailed) => !isDetailed)}
								>
									{isDetailed ? <MdClose /> : <CgMore />}
								</IconButton>
							</BtnBox>
							<BtnTooltip isHovered={isHovered}>
								{" "}
								{isDetailed ? "hide detail" : "show detail"}
							</BtnTooltip>
						</AboutBtn>
						{isDetailed && (
							<AboutDetail>this is summarization about {name}</AboutDetail>
						)}
					</About>
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
