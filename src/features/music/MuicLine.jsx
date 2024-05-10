import styled from "@emotion/styled";
import { timeFormatter } from "../../utils/time_formater";

const MusicLineBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	width: 84.4%;
	height: 4rem;
	padding: 1rem;
	margin-right: 0.6rem;
`;

const Line = styled.input`
	height: 0.24rem;
	width: 100%;
	background-color: var(--color-text-secondary);
	border-radius: 1rem;
	border: none;
	outline: none;

	cursor: pointer;
`;

const MusicTime = styled.span`
	color: var(--color-text-secondary);
	width: 2.5rem;
`;

const MusicLine = ({ currTime, totalTime, handleChangingCurrTime }) => {
	return (
		<MusicLineBox>
			<MusicTime>{timeFormatter(currTime)}</MusicTime>
			<Line
				type="range"
				min={0}
				max={totalTime}
				value={currTime}
				onChange={(e) => handleChangingCurrTime(Number(e.target.value))}
				disabled={currTime == totalTime}
			/>
			<MusicTime>
				{timeFormatter(currTime == totalTime ? 0 : totalTime - currTime)}
			</MusicTime>
		</MusicLineBox>
	);
};

export default MusicLine;
