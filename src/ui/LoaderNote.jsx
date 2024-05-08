import styled from "@emotion/styled";

const LoaderNoteBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.7rem;
`;

const LoadingSvg = styled.img`
	width: 10rem;
`;

const LoadingMessage = styled.span`
	color: var(--color-text-tertiary);
	font-weight: thin;
	font-size: 1rem;
`;

const LoaderNote = ({ loadingMessage }) => {
	return (
		<LoaderNoteBox>
			<LoadingSvg src="./loader.svg" />
			<LoadingMessage>{loadingMessage}</LoadingMessage>
		</LoaderNoteBox>
	);
};

export default LoaderNote;
