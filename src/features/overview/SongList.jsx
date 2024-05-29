import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { musicList } from "../../assets/music_list";
import { useNavigateMenu } from "../../hooks/useNavigateMenu";
import FetchError from "../../ui/FetchError";
import LoaderBox from "../../ui/LoaderBox";
import LoaderNote from "../../ui/LoaderNote";
import TrackCard from "../../ui/TrackCard";
import { currentMusicList } from "../music/musicSlice";

const ListBox = styled.div`
	width: 100%;
	height: 61%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem 1rem;
	margin-top: 1rem;

	overflow-x: hidden;
	overflow-y: scroll;

	border-radius: 0.6rem;

	&::-webkit-scrollbar {
		background-color: transparent;
		width: 12px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-bg-secondary);

		border-radius: 1rem;
	}
`;
const List = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 1rem;
	padding: 1rem;
`;

const ListHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 0.4rem;

	padding-left: 1rem;
`;

const ListBtn = styled.button`
	background: radial-gradient(var(--color-rad-outer), var(--color-bg-primary));
	color: var(--color-text-primary);
	font-size: 1.2rem;

	padding: 0.3rem 1rem;
	outline: none;
	border: 2px solid;
	border-color: ${(props) =>
		props.isSelected ? "var(--color-text-primary)" : "var(--color-bg-primary)"};
	border-radius: 0.5rem;

	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		border-color: var(--color-text-primary);
	}
`;

const SongList = () => {
	const dispatch = useDispatch();
	const navigateTo = useNavigate();
	const openMenu = useNavigateMenu();

	const tracks = musicList;
	const isLoading = false;
	const error = "";

	if (tracks) {
		dispatch(currentMusicList(tracks));
	}

	return (
		<ListBox>
			<ListHeader>
				<ListBtn isSelected>For you</ListBtn>
				<ListBtn onClick={() => openMenu("/songs")}>Your songs</ListBtn>
				<ListBtn onClick={() => navigateTo("/local")}>Play Locals</ListBtn>
			</ListHeader>
			<List>
				{isLoading &&
					Array.from({ length: 8 }).map((index) => (
						<LoaderBox key={index}>
							<LoaderNote loadingMessage={"fetching ..."} />
						</LoaderBox>
					))}
				{error && (
					<FetchError
						error={error}
						detail={
							"Unable to fetch list of recommended musics due to some kind of technical issue, check your network connection and refresh this page."
						}
					/>
				)}
				{tracks &&
					!isLoading &&
					!error &&
					tracks.map((song, index) => (
						<TrackCard
							key={song?.id}
							shouldMore={true}
							song={song}
							index={index}
						/>
					))}
			</List>
		</ListBox>
	);
};

export default SongList;
