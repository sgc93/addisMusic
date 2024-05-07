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

	margin: 0.6rem;

	width: 80.8%;
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
