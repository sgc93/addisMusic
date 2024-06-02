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

const EmptyMuscList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	width: 100%;

	font-weight: bold;
	color: var(--color-text-primary);
	font-size: 1.4rem;
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
			{musicList.length > 0 ? (
				<>
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
				</>
			) : (
				<EmptyMuscList>
					<img src="./logo.png" alt="" width={40} />
					<span>
						AddisMusic is an ease to use music streaming and player web app!
					</span>
					<img src="./logo.png" alt="" width={40} />
				</EmptyMuscList>
			)}
		</MusicBox>
	);
};

export default Music;
