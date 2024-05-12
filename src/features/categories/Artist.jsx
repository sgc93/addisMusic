import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import ArtistCard from "../../ui/ArtistCard";
import FetchError from "../../ui/FetchError";
import LoaderBox from "../../ui/LoaderBox";
import LoaderNote from "../../ui/LoaderNote";
import { loadCategories } from "./categoriesSlice";

const ArtistBox = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 1rem;
`;

const ArtistTitle = styled.div`
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
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 2rem;
	padding: 1rem;
`;
const Artist = () => {
	const { isLoading, error, artists } = useSelector(
		(state) => state.categories
	);
	const dispatch = useDispatch();

	const tryAgain = () => dispatch(loadCategories());

	return (
		<ArtistBox>
			<ArtistTitle>
				<ListTitle>Top 10 Artists</ListTitle>
				<ListSubTitle>based on Spotify</ListSubTitle>
			</ArtistTitle>

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
							"Unable to fetch list of Top 10 Artists due to some kind of technical issue, check your network connection and refresh this page."
						}
						tryAgain={() => tryAgain()}
					/>
				)}
				{artists &&
					!isLoading &&
					!error &&
					artists.map((artist) => (
						<ArtistCard key={artist.name} artist={artist} />
					))}
			</List>
		</ArtistBox>
	);
};

export default Artist;
