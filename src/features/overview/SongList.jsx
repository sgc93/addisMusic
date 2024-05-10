import styled from "@emotion/styled";
import { musicList } from "../../assets/music_list";
import FetchError from "../../ui/FetchError";
import LoaderBox from "../../ui/LoaderBox";
import LoaderNote from "../../ui/LoaderNote";
import TrackCard from "./TrackCard";

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
const ListTitle = styled.span`
	align-self: flex-start;
	font-size: 1.3rem;
	font-weight: bold;
	color: var(--color-text-primary);
	padding-bottom: 0.2rem;
	margin: 1rem;
	border-bottom: 2px solid var(--color-border-primary);
`;
const List = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 2rem;
	padding: 1rem;
`;

const SongList = () => {
	const tracks = musicList;
	const isLoading = false;
	const error = "";

	return (
		<ListBox>
			<ListTitle>Selected Top Tracks</ListTitle>
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
							songs={tracks}
							song={song}
							index={index}
						/>
					))}
			</List>
		</ListBox>
	);
};

export default SongList;
