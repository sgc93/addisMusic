import styled from "@emotion/styled";

const LoaderBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;

	height: 20rem;
	width: 16rem;
	border-radius: 1rem;
	background: linear-gradient(to top, var(--color-bg-primary), #0001);
`;

export default LoaderBox;
