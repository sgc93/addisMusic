import styled from "@emotion/styled";
import { useState } from "react";
import { FaVolumeLow } from "react-icons/fa6";
import {
	TbPlayerPause,
	TbPlayerPlay,
	TbPlayerTrackNext,
	TbPlayerTrackPrev,
} from "react-icons/tb";
import IconButton from "../../ui/IconButton";

const ControllerBox = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	font-size: 20px;
	padding: 0.5rem 1rem;

	border-radius: 0.6rem;
	background-color: var(--color-bg-primary);
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
`;

const MusicController = () => {
	const [isPaused, setIsPaused] = useState(false);

	const pauseMusic = () => setIsPaused(false);
	const playMusic = () => setIsPaused(true);

	return (
		<ControllerBox>
			<IconButton>
				<FaVolumeLow />
			</IconButton>
			<Flex>
				<IconButton>
					<TbPlayerTrackPrev />
				</IconButton>
				{isPaused ? (
					<IconButton handleClick={pauseMusic}>
						<TbPlayerPause />
					</IconButton>
				) : (
					<IconButton handleClick={playMusic}>
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
