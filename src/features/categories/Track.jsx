import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Error from "../../ui/Error";
import LoaderBox from "../../ui/LoaderBox";
import LoaderNote from "../../ui/LoaderNote";
import MusicCard from "../../ui/MusicCard";

const TrackBox = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 1rem;
`;

const TrackTitle = styled.div`
	display: flex;
	align-items: center;
`;

const ListTitle = styled.span`
	font-size: 1.3rem;
	font-weight: bold;
	color: var(--color-text-primary);
	padding-bottom: 0.2rem;
	margin: 1rem;
	border-bottom: 2px solid var(--color-border-primary);
`;

const ListSubTitle = styled.span`
	font-size: 1rem;
	font-weight: bold;
	color: var(--color-text-tertiary);
`;

const List = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	padding: 1rem;
`;

const Track = () => {
	const { isLoading, error, tracks } = useSelector((state) => state.categories);

	return (
		<TrackBox>
			<TrackTitle>
				<ListTitle>Top 10 Tracks</ListTitle>
				<ListSubTitle>based on Spotify</ListSubTitle>
			</TrackTitle>

			<List>
				{isLoading &&
					Array.from({ length: 8 }).map((index) => (
						<LoaderBox key={index}>
							<LoaderNote loadingMessage={"fetching ..."} />
						</LoaderBox>
					))}
				{error && <Error errorMessage={error} />}
				{tracks &&
					!isLoading &&
					!error &&
					tracks.map((song) => <MusicCard key={song.id} song={song} />)}
			</List>
		</TrackBox>
	);
};

export default Track;
