import styled from "@emotion/styled";

const NotFoundBox = styled.section`
	width: 100dvw;
	height: 100dvh;

	display: flex;
	align-items: center;
	justify-content: center;
`;
const NotFoundPage = () => {
	return <NotFoundBox>page not found, back to home</NotFoundBox>;
};

export default NotFoundPage;
