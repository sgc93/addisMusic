import styled from "@emotion/styled";
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

const SongList = () => {
	return (
		<ListBox>
			<ListTitle>Selected Top Tracks</ListTitle>
			<List>
				{Array.from({ length: 10 }).map((index) => (
					<MusicCard key={index} />
				))}
			</List>
		</ListBox>
	);
};

export default SongList;
