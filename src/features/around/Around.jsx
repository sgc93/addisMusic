import styled from "@emotion/styled";
import { useState } from "react";
import { TbMusicPin } from "react-icons/tb";
import AroundWindow from "./AroundWindow";

const AroundBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;

	padding: 1rem;
	border-radius: 0.6rem;
	border-radius: 1rem;
`;

const AroundText = styled.div`
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	padding: 1rem 1.4rem;
	margin: 0rem 1rem;
	border-radius: 0.6rem;
	background-color: var(--color-text-primary);
`;

const AroundTitle = styled.span`
	align-self: flex-start;
	display: flex;
	align-items: center;
	gap: 0.6rem;
	font-size: 1.2rem;
	font-weight: bold;
	color: var(--color-bg-primary);
	opacity: 0.9;
`;

const AroundSubtitle = styled.span`
	text-align: center;
	font-size: 1.1rem;
	color: var(--color-bg-primary);
`;
const AroundBtn = styled.button`
	align-self: flex-end;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	font-weight: 600;
	color: var(--color-bg-primary);
	background-color: var(--color-bg-secondary);
	border: none;
	border-radius: 0.6rem;
	outline: none;
	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		color: var(--color-text-primary);
		background-color: var(--color-bg-primary);
	}
`;

const Around = () => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<AroundBox>
			{isOpened ? (
				<AroundWindow />
			) : (
				<>
					<AroundTitle>
						<TbMusicPin opacity={0.8} />
						Top Tracks In Your Country
					</AroundTitle>
					<AroundText>
						<img src="./location.gif" alt="" width={100} height={100} />
						<AroundSubtitle>
							Unveil the rhythmic heartbeat of your homeland with our curated
							selection of top tracks from your country.
						</AroundSubtitle>
						<AroundBtn onClick={() => setIsOpened(true)}>Explore </AroundBtn>
					</AroundText>
				</>
			)}
		</AroundBox>
	);
};

export default Around;
