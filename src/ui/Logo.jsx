import styled from "@emotion/styled";

// Define a styled component for the div
const Name = styled.div`
	width: 100%;
	padding: 5px 0px;
	font-size: 20px;
	font-weight: bold;
	color: var(--color-text-primary);
	border-bottom: 2px solid var(--color-border-primary);
`;

const LogoBox = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
`;

const Logo = () => {
	return (
		<LogoBox>
			<img src="./logo.png" alt="addismusic" width={40} />
			<Name>Addis Music</Name>
		</LogoBox>
	);
};

export default Logo;
