import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { LuSearchX } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { fadeOpen } from "../../styles/animation";

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
	align-items: center;
	justify-content: center;

	height: 70%;
	font-size: 1.3rem;
	font-weight: bold;
`;

const Search = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q");
	const [results, setResults] = useState([]);

	useEffect(() => {
		setResults([]);
	}, [query]);

	return (
		<SearchBox>
			{results.length > 0 ? (
				<>
					<SearchTitle>
						Search results for <SearchQ>{query}</SearchQ>
					</SearchTitle>
					<ResultLists>results</ResultLists>
				</>
			) : (
				<EmptyResult>
					<LuSearchX />
				</EmptyResult>
			)}
		</SearchBox>
	);
};
export default Search;
