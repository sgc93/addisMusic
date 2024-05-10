import styled from "@emotion/styled";
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

const Header = () => {
	return (
		<HeaderBox>
			<Search />
			<SignInUp />
		</HeaderBox>
	);
};

export default Header;
