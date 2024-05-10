import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Error from "../../ui/Error";
import LoaderNote from "../../ui/LoaderNote";
import MusicCard from "../../ui/MusicCard";

const ListBox = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem 1rem;
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
	flex-wrap: wrap;
	gap: 2rem;
	padding: 1rem;
`;

const LoaderBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;

	height: 20rem;
	width: 16rem;
	border-radius: 1rem;
	background: linear-gradient(to top, var(--color-bg-primary), #0001);
`;

const SongList = () => {
	const { isLoading, error, tracks } = useSelector((state) => state.categories);

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
				{error && <Error errorMessage={error} />}
				{tracks &&
					!isLoading &&
					!error &&
					tracks.map((song) => <MusicCard key={song?.id} song={song} />)}
			</List>
		</ListBox>
	);
};

export default SongList;
