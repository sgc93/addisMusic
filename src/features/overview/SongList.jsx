import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNavigateMenu } from "../../hooks/useNavigateMenu";
import FetchError from "../../ui/FetchError";
import LoaderNote from "../../ui/LoaderNote";
import TrackCard from "../../ui/TrackCard";
import { currentMusicIndex, currentMusicList } from "../music/musicSlice";
import { publicLoad } from "./publicSongsSlice";

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

const Loading = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const SongList = () => {
	const { isLoading, error, publicSongs } = useSelector(
		(state) => state.public
	);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();
	const openMenu = useNavigateMenu();

	useEffect(() => {
		if (!publicSongs) {
			dispatch(publicLoad());
		}
	}, []);

	useEffect(() => {
		if (publicSongs) {
			if (publicSongs.length > 0) {
				dispatch(currentMusicList(publicSongs));
				dispatch(currentMusicIndex(0));
			}
		}
	}, [publicSongs]);

	return (
		<ListBox>
			<ListHeader>
				<ListBtn isSelected>For you</ListBtn>
				<ListBtn onClick={() => openMenu("songs")}>Your songs</ListBtn>
				<ListBtn onClick={() => navigateTo("/local")}>Play Locals</ListBtn>
			</ListHeader>
			<List>
				{isLoading && (
					<Loading>
						<LoaderNote loadingMessage={"Loading songs ..."} />
					</Loading>
				)}
				{error && (
					<FetchError
						error={error}
						detail={
							"Unable to fetch list of songs due to some kind of technical issue, check your network connection and refresh this page."
						}
					/>
				)}
				{publicSongs && !isLoading && !error && publicSongs.length > 0 ? (
					publicSongs.map((song, index) => (
						<TrackCard
							key={index}
							shouldMoreAdd
							shouldMore
							isLocal
							song={song}
							index={index}
						/>
					))
				) : (
					<span>there no songs streamed from addis music</span>
				)}
			</List>
		</ListBox>
	);
};

export default SongList;
