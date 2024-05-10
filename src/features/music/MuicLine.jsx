import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { timeFormatter } from "../../utils/time_formater";
import { currentMusicCurrTime } from "./musicSlice";

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

const MusicLine = () => {
	const dispatch = useDispatch();
	const { currTime, duration, music } = useSelector((state) => state.currMusic);

	const handleChangingCurrTime = (time) => {
		music.currentTime = time;
		dispatch(currentMusicCurrTime(time));
	};

	return (
		<MusicLineBox>
			<MusicTime>{timeFormatter(currTime)}</MusicTime>
			<Line
				type="range"
				min={0}
				max={duration}
				value={currTime}
				onChange={(e) => handleChangingCurrTime(Number(e.target.value))}
				disabled={currTime == duration}
			/>
			<MusicTime>
				{timeFormatter(currTime == duration ? 0 : duration - currTime)}
			</MusicTime>
		</MusicLineBox>
	);
};

export default MusicLine;
