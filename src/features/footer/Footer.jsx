import styled from "@emotion/styled";
import MusicLine from "./MuicLine";
import MusicController from "./MusicController";

const FooterBox = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	gap: 0.7rem;

	width: 100dvw;

	padding: 0rem 0.7rem 0.7rem;
`;

const Footer = () => {
	return (
		<FooterBox>
			<MusicController />
			<MusicLine />
		</FooterBox>
	);
};

export default Footer;
