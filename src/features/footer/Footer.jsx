import styled from "@emotion/styled";
import Music from "../music/Music";

const FooterBox = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;

	width: 100dvw;

	padding: 0rem 0.7rem 0.7rem;
`;

const Footer = () => {
	return (
		<FooterBox>
			<Music />
		</FooterBox>
	);
};

export default Footer;
