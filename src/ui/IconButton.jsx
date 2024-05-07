import styled from "@emotion/styled";

const IconButtonStyle = styled.button`
	display: flex;
	align-items: center;
	gap: 0.2rem;

	border: none;
	outline: none;

	padding: 0.2rem 0.4rem;
	border-radius: 0.2rem;

	background-color: transparent;
	font-size: 20px;
	color: var(--color-text-secondary);

	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		background-color: var(--color-text-secondary);
		color: var(--color-bg-primary);
	}
`;

const IconButton = ({ children, handleClick }) => {
	return <IconButtonStyle onClick={handleClick}>{children}</IconButtonStyle>;
};

export default IconButton;
