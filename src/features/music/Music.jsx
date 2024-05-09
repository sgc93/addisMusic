import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { timeFormatter } from "../../utils/time_formater";
import MusicLine from "./MuicLine";
import MusicController from "./MusicController";

const MusicBox = styled.div`
	display: flex;
	gap: 0.7rem;

	width: 100%;
`;

const Music = () => {
	const [duration, setDuration] = useState(0);
	const musicRef = useRef();

	const handleLoadStart = (e) => {
		const src = e.nativeEvent.srcElement.src;
		const audio = new Audio(src);
		audio.onloadedmetadata = function () {
			if (audio.readyState > 0) {
				setDuration(audio.duration);
			}
		};
	};

	return (
		<MusicBox>
			<audio
				src="./sample.mp3"
				hidden
				ref={musicRef}
				onLoadStart={handleLoadStart}
			/>
			<MusicController music={musicRef.current} />
			<MusicLine currTime={"00:00"} totalTime={timeFormatter(duration)} />
		</MusicBox>
	);
};

export default Music;
