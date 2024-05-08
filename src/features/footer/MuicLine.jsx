import styled from "@emotion/styled";

const MusicLineBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	width: 84.4%;
	padding: 1rem;
	margin-right: 0.6rem;

	background-color: var(--color-bg-tertiary);
	border: 1px solid var(--color-border-secondary);
	border-radius: 0.6rem;
`;

const Line = styled.span`
	height: 0.24rem;
	width: 100%;
	background-color: var(--color-text-secondary);
	border-radius: 1rem;

	cursor: pointer;
	transition: all 0.8s;
	&:hover {
		height: 0.3rem;
		background-color: var(--color-text-primary);
	}
`;

const MusicTime = styled.span`
	color: var(--color-text-secondary);
`;

const MusicLine = () => {
	return (
		<MusicLineBox>
			<MusicTime>0:00</MusicTime>
			<Line />
			<MusicTime>5:34</MusicTime>
		</MusicLineBox>
	);
};

export default MusicLine;
