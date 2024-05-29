import styled from "@emotion/styled";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import HeaderModal from "./HeaderModal";
import SearchBtn from "./SearchBtn";
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
	z-index: 1;
`;

const HeaderLeft = styled.div`
	position: relative;
	align-self: flex-start;
	display: flex;
	align-items: center;
	gap: 1rem;

	width: 80%;
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
	const [isAbout, setIsAbout] = useState(false);
	const [isContact, setIsContact] = useState(false);
	const [isLike, setIsLike] = useState(false);
	const shouldOpened = isAbout || isContact;

	const closeModal = () => {
		setIsAbout(false);
		setIsContact(false);
	};

	return (
		<HeaderBox>
			<HeaderLeft>
				<SearchBtn />
				<TextBtn onClick={() => setIsAbout(true)}>About</TextBtn>
				<TextBtn onClick={() => setIsContact(true)}>Contact</TextBtn>
				<LikeBtn>
					<FaThumbsUp />
				</LikeBtn>
			</HeaderLeft>
			<SignInUp />
			{shouldOpened && (
				<HeaderModal
					isAbout={isAbout}
					isLike={isLike}
					isContact={isContact}
					closeModal={closeModal}
				/>
			)}
		</HeaderBox>
	);
};

export default Header;
