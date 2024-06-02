import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const NotFoundBox = styled.section`
	width: 100dvw;
	height: 100dvh;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	background: radial-gradient(var(--color-rad-center), var(--color-rad-outer));
`;

const NotFoundMessage = styled.span`
	text-transform: capitalize;
	font-weight: bold;
	font-size: 1.5rem;
`;

const BackBtn = styled.button`
	color: #2b2bbb;
	background: none;
	border: 1px solid #2b2bbb;
	border-radius: 0.4rem;
	padding: 0.3rem 0.6rem;
	font-size: 1rem;
	font-weight: bold;

	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		color: white;
		background-color: #3c3ccd;
	}
`;
const NotFoundPage = () => {
	const navigateTo = useNavigate();
	return (
		<NotFoundBox>
			<img src="../../public/logo.png" alt="logo" width={100} />
			<NotFoundMessage>Page Not found</NotFoundMessage>
			<BackBtn onClick={() => navigateTo("/")}>Back to home</BackBtn>
		</NotFoundBox>
	);
};

export default NotFoundPage;
