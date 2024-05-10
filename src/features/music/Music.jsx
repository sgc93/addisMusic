import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { musicList } from "../../assets/music_list";
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
	const musics = musicList;
	const [currMusicIndex, setCurrMusicIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
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

	const playNext = () => {
		if (currMusicIndex == musics.length - 1) {
			setCurrMusicIndex(0);
		} else {
			setCurrMusicIndex((currMusicIndex) => Number(currMusicIndex + 1));
		}
	};

	const PlayPrevious = () => {
		if (currMusicIndex == 0) {
			setCurrMusicIndex(musics.length - 1);
		} else {
			setCurrMusicIndex((currMusicIndex) => Number(currMusicIndex - 1));
		}
	};

	const playNextPrev = (direction) => {
		direction > 0 ? playNext() : PlayPrevious();
		console.log(musics[currMusicIndex], currMusicIndex, direction);
	};

	return (
		<MusicBox>
			<audio
				src={musics[currMusicIndex]?.url}
				hidden
				ref={musicRef}
				onLoadStart={handleLoadStart}
				onTimeUpdate={handleTimeUpdate}
			/>
			<PlayedMusic playedMusic={musics[currMusicIndex]} isPaused={isPaused} />
			<MusicController
				playNextPrev={playNextPrev}
				isPaused={isPaused}
				setIsPaused={setIsPaused}
			/>
			<MusicLine />
		</MusicBox>
	);
};

export default Music;
