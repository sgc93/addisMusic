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
import IconButton from "../../ui/IconButton";

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

const MusicController = ({ music, resetMusicTime, isMusicFinished }) => {
	const [isPaused, setIsPaused] = useState(false);
	const [volume, setVolume] = useState(50);
	const [isOpened, setIsOpened] = useState(false);

	useEffect(() => {
		if (music && isMusicFinished) {
			handlePlayingMusic(true);
			resetMusicTime();
		}
	}, [isMusicFinished]);

	const handlePlayingMusic = (pause) => {
		if (pause) {
			setIsPaused(!pause);
			music.pause();
		} else {
			setIsPaused(!pause);
			music.play();
		}
	};

	const handleChangingVolume = (vol) => {
		setVolume(vol);
		music.volume = vol / 100;
	};

	const toggleSound = () => {
		volume > 0 ? setVolume(0) : setVolume(50);
	};

	const toggleVolumeBox = () => setIsOpened((isOpened) => !isOpened);

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
				<IconButton>
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

				<IconButton>
					<TbPlayerTrackNext />
				</IconButton>
			</Flex>
		</ControllerBox>
	);
};

export default MusicController;
