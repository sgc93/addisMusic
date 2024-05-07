import styled from "@emotion/styled";
import { FaVolumeLow } from "react-icons/fa6";
import {
	TbPlayerPause,
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
	return (
		<ControllerBox>
			<IconButton>
				<FaVolumeLow />
			</IconButton>
			<Flex>
				<IconButton>
					<TbPlayerTrackPrev />
				</IconButton>
				<IconButton>
					<TbPlayerPause />
				</IconButton>
				{/* <TbPlayerPlay /> */}
				<IconButton>
					<TbPlayerTrackNext />
				</IconButton>
			</Flex>
		</ControllerBox>
	);
};

export default MusicController;
