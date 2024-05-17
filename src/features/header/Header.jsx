import styled from "@emotion/styled";
import { FaThumbsUp } from "react-icons/fa";
import Search from "./Search";
import SignInUp from "./SignInUp";

const HeaderBox = styled.div`
	position: fixed;
	top: 0;
	right: 0;

	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 80.6%;
	margin: 0.6rem;

	backdrop-filter: blur(4px);
`;

const HeaderLeft = styled.div`
	align-self: flex-start;
	display: flex;
	align-items: center;
	gap: 1rem;

	width: 100%;
`;

const TextBtn = styled.button`
	font-size: 1.1rem;
	font-weight: bold;
	color: var(--color-text-primary);
	background: var(--color-bg-secondary);
	padding: 0.3rem 0.5rem;
	border: none;
	border-radius: 0.4rem;

	cursor: pointer;
`;

const LikeBtn = styled.button`
	font-size: 1.1rem;
	font-weight: bold;
	color: var(--color-text-primary);
	background: var(--color-bg-secondary);
	padding: 0.3rem 0.5rem;
	border: none;
	border-radius: 0.4rem;
`;

const Header = () => {
	return (
		<HeaderBox>
			<HeaderLeft>
				<Search />
				<TextBtn>About</TextBtn>
				<TextBtn>Contact</TextBtn>
				<LikeBtn>
					<FaThumbsUp />
				</LikeBtn>
			</HeaderLeft>
			<SignInUp />
		</HeaderBox>
	);
};

export default Header;
