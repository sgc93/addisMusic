import styled from "@emotion/styled";
import { useRef, useState } from "react";
import MusicLine from "./MuicLine";
import MusicController from "./MusicController";

const MusicBox = styled.div`
	display: flex;
	gap: 0.7rem;

	width: 100%;
`;

const Music = () => {
	const [duration, setDuration] = useState(0);
	const [currTime, setCurrTime] = useState(0);
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

	const handleTimeUpdate = () => {
		setCurrTime(musicRef.current.currentTime);
	};

	const handleChangingCurrTime = (time) => {
		musicRef.current.currentTime = time;
		setCurrTime(time);
	};

	const resetMusicTime = () => {
		setCurrTime(0);
		setDuration(musicRef.current.duration);
	};

	return (
		<MusicBox>
			<audio
				src="./sample.mp3"
				hidden
				ref={musicRef}
				onLoadStart={handleLoadStart}
				onTimeUpdate={handleTimeUpdate}
			/>
			<MusicController
				music={musicRef.current}
				isMusicFinished={currTime == duration}
				resetMusicTime={resetMusicTime}
			/>
			<MusicLine
				currTime={currTime}
				totalTime={duration}
				handleChangingCurrTime={handleChangingCurrTime}
			/>
		</MusicBox>
	);
};

export default Music;
