import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiArrowBack, BiEdit } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { CgMore } from "react-icons/cg";
import { MdClose, MdDelete, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fadeOpen } from "../../styles/animation";
import TrackCard from "../../ui/TrackCard";
import { how_many_songs, playlist_summarizer } from "../../utils/summarizer";
import { currentMusicIndex, currentMusicList } from "../music/musicSlice";
import PlaylistEditCard from "./PlaylistEditCard";
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

const AboutBtn = styled.button`
	position: relative;
	display: flex;
	align-items: center;

	padding: 0.2rem 0.4rem;
	color: var(--color-text-primary);
	/* background-color: var(--color-bg-primary); */
	background: none;
	font-size: 1.2rem;
	border: none;
	border-radius: 0.3rem;

	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		color: var(--color-bg-primary);
		background-color: var(--color-text-primary);
	}
`;

const BtnBox = styled.span`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 9rem;
`;

const BtnTooltip = styled.span`
	display: ${(props) => (props.shouldDisplay ? "flex" : "none")};
	align-items: center;
	justify-content: center;
	position: absolute;

	padding: 0.2rem 0.4rem;
	margin-bottom: 4rem;

	border-radius: 0.6rem;
	background-color: var(--color-text-secondary);
	color: ${(props) =>
		props.isDelete ? "var(--color-text-error)" : "var(--color-bg-primary)"};
	font-weight: bold;
	font-size: small;
	text-align: center;
	animation: ${fadeOpen} 0.4s linear;
`;

const AboutDetail = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;

	background: var(--color-text-tertiary);
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: 2px 2px 15px 2px var(--color-bg-tertiary);

	max-height: 80%;
	overflow: hidden;
	animation: ${fadeOpen} 0.4s linear;
`;

const DetailTab = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	background: var(--color-text-tertiary);
	padding: 0.5rem;
	border-radius: 0.3rem;
`;

const TabTitle = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 1rem;
	color: var(--color-bg-primary);
	padding-bottom: 0.2rem;
	border-bottom: 1px solid var(--color-bg-tertiary);
`;
const TabBody = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	font-weight: bold;
	color: var(--color-bg-primary);
`;

const PlaylistDetail = ({ setIsDetailing, setIsPlaylistDeleteOpened }) => {
	const { selectedPlaylist } = useSelector((state) => state.playlist);
	const dispatch = useDispatch();
	const { name, createdAt, updatedAt, musics } = selectedPlaylist;
	const isUpdated = !(createdAt === updatedAt);
	const [isAddSongOpen, setIsAddSongOpen] = useState(false);
	const [isPlaylistEditOpened, setIsPlaylistEditOpened] = useState(false);

	const [tooltip, setTooltip] = useState("");
	const [isDetailed, setIsDetailed] = useState(false);
	const [detailData, setDetailData] = useState(false);
	const { artists, favorites } = detailData;

	useEffect(() => {
		if (selectedPlaylist.musics.length > 0) {
			setDetailData(playlist_summarizer(selectedPlaylist));
			dispatch(currentMusicList(selectedPlaylist.musics));
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
					playlistName={name}
				/>
			)}
			{isPlaylistEditOpened && (
				<PlaylistEditCard
					setIsOpened={setIsPlaylistEditOpened}
					playlistName={name}
				/>
			)}
			<DetailHeader>
				<AboutBtn onClick={() => backToPlaylists()}>
					<BiArrowBack />
				</AboutBtn>
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
						<BtnBox>
							<AboutBtn
								onClick={() => setIsPlaylistEditOpened(true)}
								onMouseEnter={() => setTooltip("edit")}
								onMouseLeave={() => setTooltip("")}
							>
								<BiEdit />
							</AboutBtn>
							<AboutBtn
								onClick={() => setIsPlaylistDeleteOpened(true)}
								onMouseEnter={() => setTooltip("delete permanently")}
								onMouseLeave={() => setTooltip("")}
							>
								<MdDelete />
							</AboutBtn>
							<AboutBtn
								onClick={() => setIsDetailed((isDetailed) => !isDetailed)}
								onMouseEnter={() =>
									setTooltip(isDetailed ? "hide detail" : "show detail")
								}
								onMouseLeave={() => setTooltip("")}
							>
								{isDetailed ? <MdClose /> : <CgMore />}
							</AboutBtn>
							<BtnTooltip
								isDelete={tooltip == "delete permanently"}
								shouldDisplay={tooltip}
							>
								{tooltip}
							</BtnTooltip>
						</BtnBox>
						{isDetailed && detailData && (
							<AboutDetail>
								<DetailTab>
									<TabTitle>
										<BsPerson /> <span>{artists.length} artists</span>
									</TabTitle>
									<TabBody>
										{artists &&
											artists.map((artist, index) => (
												<span key={index}>{artist} </span>
											))}
									</TabBody>
								</DetailTab>
								<DetailTab>
									<TabTitle>
										<MdOutlineFavoriteBorder color="red" />{" "}
										<span>{favorites.length} favorites</span>
									</TabTitle>
									<TabBody>
										{favorites &&
											favorites.map((music, index) => (
												<span key={index}>{music.title}</span>
											))}
									</TabBody>
								</DetailTab>
							</AboutDetail>
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
								<TrackCard
									song={music}
									index={index}
									key={index}
									shouldMore={true}
									shouldMoreAdd={false}
								/>
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
