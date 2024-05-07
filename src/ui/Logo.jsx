import styled from "@emotion/styled";

// Define a styled component for the div
const Name = styled.div`
	width: 100%;
	padding: 5px 0px;
	font-size: 20px;
	font-weight: bold;
	color: black;
	border-bottom: 1px solid black;
`;

const LogoBox = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const Logo = () => {
	return (
		<LogoBox>
			<img src="./logo.png" alt="addismusic" />
			<Name>Addis Music</Name>
		</LogoBox>
	);
};

export default Logo;
