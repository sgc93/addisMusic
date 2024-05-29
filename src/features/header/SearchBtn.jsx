import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { TbMusicSearch, TbMusicX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SearchBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 0.4rem 0rem;
	border-radius: 0.4rem;

	background-color: var(--color-bg-tertiary);
	width: 32%;
`;

const SearchInput = styled.input`
	width: 80%;
	font-size: 1.2rem;
	color: var(--color-text-secondary);
	background-color: transparent;
	outline: none;
	border: none;

	&::placeholder {
		color: #fff8;
	}
`;

const SearchIcon = styled.button`
	display: flex;
	padding: 0.3rem;
	font-size: 1.4rem;
	color: var(--color-text-secondary);
	background: transparent;
	border: none;
	outline: none;
	border-radius: 0.4rem;

	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		background-color: var(--color-bg-secondary);
	}
`;

const SearchBtn = () => {
	const [query, setQuery] = useState("");
	const navigateTo = useNavigate();

	useEffect(() => {
		if (query) {
			navigateTo(`/search?q=${query}`);
		}
	}, [query]);

	return (
		<SearchBox>
			<SearchInput
				type="text"
				placeholder="Search songs ..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<SearchIcon onClick={() => (query ? setQuery("") : {})}>
				{query ? <TbMusicX /> : <TbMusicSearch />}
			</SearchIcon>
		</SearchBox>
	);
};

export default SearchBtn;
