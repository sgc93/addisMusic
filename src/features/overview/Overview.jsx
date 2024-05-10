import styled from "@emotion/styled";
import Around from "./Around";
import BillBoard from "./BilBoard";
import SongList from "./SongList";

const OverviewBox = styled.div`
	display: flex;
	flex-direction: column;

	gap: 0.6rem;
	padding: 1rem;
`;

const Overview = () => {
	return (
		<OverviewBox>
			<BillBoard />
			<SongList />
			<Around />
		</OverviewBox>
	);
};

export default Overview;
