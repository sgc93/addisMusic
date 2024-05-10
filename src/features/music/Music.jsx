import styled from "@emotion/styled";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MusicLine from "./MuicLine";
import MusicController from "./MusicController";
import PlayedMusic from "./PlayedMusic";
import { currentMusic, currentMusicCurrTime } from "./musicSlice";

const MusicBox = styled.div`
	display: flex;
	align-items: center;

	width: 100%;
	height: 5rem;

	background-color: var(--color-bg-tertiary);
	border-top: 1px solid var(--color-border-primary);
	backdrop-filter: blur(5rem);
`;

const Music = () => {
	const { isPaused, musicList, currMusicIndex } = useSelector(
		(state) => state.currMusic
	);
	const dispatch = useDispatch();
	const musicRef = useRef();

	const handleLoadStart = (e) => {
		const src = e.nativeEvent.srcElement.src;
		const audio = new Audio(src);
		audio.onloadedmetadata = function () {
			if (audio.readyState > 0) {
				dispatch(
					currentMusic({
						music: musicRef.current,
						currTime: 0,
						duration: audio.duration,
					})
				);
			}
		};

		if (isPaused) musicRef.current.play();
	};

	const handleTimeUpdate = () => {
		dispatch(currentMusicCurrTime(musicRef.current.currentTime));
	};

	return (
		<MusicBox>
			<audio
				src={musicList[currMusicIndex]?.url}
				hidden
				ref={musicRef}
				onLoadStart={handleLoadStart}
				onTimeUpdate={handleTimeUpdate}
			/>
			<PlayedMusic playedMusic={musicList[currMusicIndex]} />
			<MusicController />
			<MusicLine />
		</MusicBox>
	);
};

export default Music;
