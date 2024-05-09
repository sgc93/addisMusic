import styled from "@emotion/styled";
import MusicCard from "../../ui/MusicCard";

const ListBox = styled.div`
	width: 100%;
`;
const ListTitle = styled.span``;
const List = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1.2rem;
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
