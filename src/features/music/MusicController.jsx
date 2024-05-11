import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh, FaVolumeLow } from "react-icons/fa6";
import {
	TbPlayerPause,
	TbPlayerPlay,
	TbPlayerTrackNext,
	TbPlayerTrackPrev,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../ui/IconButton";
import {
	currentMusicCurrTime,
	currentMusicDuration,
	currentMusicIndex,
	currentMusicPausePlay,
} from "./musicSlice";

const ControllerBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	font-size: 20px;
	padding: 0rem 2rem 0rem 1rem;
	height: 4rem;
	border-right: 1px solid var(--color-border-primary);
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
`;

const VolumeBox = styled.div`
	position: absolute;
	top: -2rem;
	left: 0.2rem;
	display: flex;
	align-items: center;
	gap: 0.4rem;

	padding: 0.5rem 1rem;
	border-radius: 3rem;

	background-color: var(--color-bg-primary);
`;

const VolumeInput = styled.input`
	width: 4.8rem;

	background-color: var(--color-text-secondary);
	border-radius: 1rem;
	border: none;
	outline: none;

	cursor: pointer;
`;
const VolValue = styled.span`
	color: var(--color-text-tertiary);
	font-size: 1rem;
	width: 1.2rem;
	padding-left: 0.2rem;
`;

const MusicController = () => {
	const { currTime, duration, music, isPaused, currMusicIndex, musicList } =
		useSelector((state) => state.currMusic);
	const isMusicFinished = currTime == duration;
	const dispatch = useDispatch();

	const [volume, setVolume] = useState(50);
	const [isOpened, setIsOpened] = useState(false);

	useEffect(() => {
		let timeoutId;
		if (isOpened) {
			timeoutId = setTimeout(() => {
				setIsOpened(false);
			}, 3000);
		}
	}, [isOpened]);

	useEffect(() => {
		if (music && isMusicFinished) {
			handlePlayingMusic(true);
			resetMusicTime();
		}
	}, [isMusicFinished]);

	const handlePlayingMusic = (pause) => {
		if (pause) {
			dispatch(currentMusicPausePlay(!pause));
			music.pause();
		} else {
			dispatch(currentMusicPausePlay(!pause));
			music.play();
		}
	};

	const resetMusicTime = () => {
		dispatch(currentMusicCurrTime(0));
		dispatch(currentMusicDuration(music.duration));
	};

	const handleChangingVolume = (vol) => {
		setVolume(vol);
		music.volume = vol / 100;
	};

	const toggleSound = () => {
		volume > 0 ? handleChangingVolume(0) : handleChangingVolume(50);
	};

	const toggleVolumeBox = () => setIsOpened((isOpened) => !isOpened);

	const playNext = () => {
		if (currMusicIndex == musicList.length - 1) {
			dispatch(currentMusicIndex(0));
		} else {
			dispatch(currentMusicIndex(currMusicIndex + 1));
		}
	};

	const PlayPrevious = () => {
		if (currMusicIndex == 0) {
			dispatch(currentMusicIndex(musicList.length - 1));
		} else {
			dispatch(currentMusicIndex(currMusicIndex - 1));
		}
	};

	const playNextPrev = (direction) => {
		direction > 0 ? playNext() : PlayPrevious();
	};

	return (
		<ControllerBox>
			<IconButton handleClick={() => toggleVolumeBox()}>
				{volume == 0 ? (
					<FaVolumeMute color="var(--color-text-error)" />
				) : volume < 50 ? (
					<FaVolumeLow />
				) : (
					<FaVolumeHigh />
				)}
			</IconButton>
			{isOpened && (
				<VolumeBox>
					<IconButton handleClick={() => toggleSound()}>
						{volume == 0 ? (
							<FaVolumeMute color="var(--color-text-error)" />
						) : (
							<FaVolumeLow />
						)}
					</IconButton>
					<VolumeInput
						type="range"
						min={0}
						max={100}
						value={volume}
						onChange={(e) => handleChangingVolume(e.target.value)}
					/>
					<VolValue>{volume}</VolValue>
				</VolumeBox>
			)}
			<Flex>
				<IconButton handleClick={() => playNextPrev(-1)}>
					<TbPlayerTrackPrev />
				</IconButton>
				{isPaused ? (
					<IconButton handleClick={() => handlePlayingMusic(true)}>
						<TbPlayerPause />
					</IconButton>
				) : (
					<IconButton handleClick={() => handlePlayingMusic(false)}>
						<TbPlayerPlay />
					</IconButton>
				)}

				<IconButton handleClick={() => playNextPrev(1)}>
					<TbPlayerTrackNext />
				</IconButton>
			</Flex>
		</ControllerBox>
	);
};

export default MusicController;
