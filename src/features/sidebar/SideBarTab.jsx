import styled from "@emotion/styled";

const Tab = styled.button`
	display: flex;
	align-items: center;
	gap: 0.8rem;

	background-color: var(--color-tab-bg);
	color: var(--color-text-secondary);
	border-radius: 0.5rem;
	border: none;
	outline: none;
	margin-right: 1rem;
	padding: 0.5rem 1rem;
	font-size: 1.2rem;

	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		color: var(--color-text-primary);
		background-color: var(--color-tab-hover-bg);
	}
`;

const SideBarTab = ({ handleClick, children }) => {
	return <Tab onClick={handleClick}>{children}</Tab>;
};

export default SideBarTab;
