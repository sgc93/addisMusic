import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { TbMusicExclamation } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fadeOpen } from "../../styles/animation";
import TrackCard from "../../ui/TrackCard";

const SearchBox = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	height: 97%;
	animation: ${fadeOpen};
`;

const SearchTitle = styled.span`
	display: flex;
	align-items: center;
	gap: 0.5em;

	font-size: 1.2rem;
	color: var(--color-bg-primary);
	font-weight: bold;
`;
const SearchQ = styled.span`
	color: var(--color-gradient-2);
	text-transform: uppercase;
`;
const ResultLists = styled.div`
	display: flex;
	flex-direction: column;

	gap: 1rem;
	padding: 1rem;

	overflow-y: scroll;
	overflow-x: hidden;
	&::-webkit-scrollbar {
		background-color: transparent;
		width: 12px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-bg-secondary);

		border-radius: 1rem;
	}
`;
const EmptyResult = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	height: 70%;
`;

const EmptyTitle = styled.span`
	font-size: 1.3rem;
	font-weight: bold;
`;
const EmptySubTitle = styled.span``;

const Search = () => {
	const { allSongs, isLoading, error } = useSelector((state) => state.playlist);
	const { publicSongs } = useSelector((state) => state.public);
	const isPublicLoading = useSelector((state) => state.public.isLoading);
	const publicError = useSelector((state) => state.public.error);

	const isSearchLoading = isLoading || isPublicLoading;
	const searchError = error || publicError;

	const [searchParams] = useSearchParams();
	const query = searchParams.get("q");
	const [results, setResults] = useState([]);

	useEffect(() => {
		const search = (query) => {
			if (publicSongs) {
				const validSongs = [];
				publicSongs.forEach((music) => {
					const str = (music.title + " " + music.artist).toLowerCase();
					if (str.includes(query.toLowerCase())) {
						validSongs.push(music);
					}
				});
				setResults(validSongs);
			} else {
				//
			}
		};

		if (query) search(query);
	}, [query]);

	return (
		<SearchBox>
			{results.length > 0 ? (
				<>
					<SearchTitle>
						Search results for <SearchQ>{query}</SearchQ>
					</SearchTitle>
					<ResultLists>
						{results.map((result, index) => (
							<TrackCard key={index} song={result} index={index} />
						))}
					</ResultLists>
				</>
			) : (
				<EmptyResult>
					<TbMusicExclamation size={40} color="var(--color-text-error)" />
					<EmptyTitle>Music not found</EmptyTitle>
					<EmptySubTitle>
						update query with song title or artist name
					</EmptySubTitle>
				</EmptyResult>
			)}
		</SearchBox>
	);
};
export default Search;
