import styled from "@emotion/styled";
import Around from "./Around";
import BillBoard from "./BilBoard";
import SongList from "./SongList";

const OverviewBox = styled.div`
	display: flex;
	align-items: start;
	gap: 1rem;
	// flex-direction: column;

	height: 94%;
`;

const LeftBox = styled.div`
	height: calc(103% + 0.2rem);
	border-radius: 0.6rem;
	background-color: var(--color-bg-secondary);
`;

const Overview = () => {
	return (
		<OverviewBox>
			<LeftBox>
				<BillBoard />
				<SongList />
			</LeftBox>
			<Around />
		</OverviewBox>
	);
};

export default Overview;
