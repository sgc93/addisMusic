import styled from "@emotion/styled";
import { TbMusicPin } from "react-icons/tb";

const AroundBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;

	width: 40%;
	padding: 1rem;
`;
const AroundText = styled.div`
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	padding: 1rem 1.4rem;
	border-radius: 0.6rem;
	background: radial-gradient(
		var(--color-bg-secondary),
		var(--color-rad-outer)
	);
`;

const AroundTitle = styled.span`
	align-self: flex-start;
	font-size: 1.3rem;
	font-weight: bold;
	color: var(--color-rad-center);
	padding: 0.1rem 0rem;
	border-bottom: 1px solid var(--color-border-primary);
`;
const AroundSubtitle = styled.span`
	font-size: 1.1rem;
	color: var(--color-text-tertiary);
`;
const AroundBtn = styled.button`
	align-self: flex-end;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	font-weight: 600;
	color: var(--color-bg-primary);
	background-color: var(--color-text-tertiary);
	border: none;
	border-radius: 0.6rem;
	outline: none;
	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		color: var(--color-text-primary);
		background-color: var(--color-bg-secondary);
	}
`;

const IconStyle = styled.span`
	font-size: 4rem;
	color: var(--color-text-tertiary);
`;

const Around = () => {
	return (
		<AroundBox>
			<AroundText>
				<IconStyle>
					<TbMusicPin />
				</IconStyle>
				<AroundTitle>Top Tracks In Your Country</AroundTitle>
				<AroundSubtitle>
					Unveil the rhythmic heartbeat of your homeland with our curated
					selection of top tracks from your country.
				</AroundSubtitle>
				<AroundBtn>Explore </AroundBtn>
			</AroundText>
		</AroundBox>
	);
};

export default Around;
