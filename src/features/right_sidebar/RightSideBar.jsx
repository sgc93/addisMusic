import styled from "@emotion/styled";
import Around from "../around/Around";
import Lyrics from "../lyrics/Lyrics";

const RightSidebarBox = styled.aside`
	width: 40%;
	height: calc(103% + 0.2rem);
	background-color: var(--color-border-primary);
	border-radius: 0.6rem;
	overflow-x: hidden;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		background-color: transparent;
		width: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-bg-tertiary);
		border-radius: 1rem;
	}
`;

const RightSideBar = () => {
	return (
		<RightSidebarBox>
			<Around />
			<Lyrics />
		</RightSidebarBox>
	);
};
export default RightSideBar;
