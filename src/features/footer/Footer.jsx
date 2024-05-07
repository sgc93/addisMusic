import styled from "@emotion/styled";
import MusicController from "./MusicController";

const FooterBox = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	gap: 0.7rem;

	padding: 0rem 0.7rem 0.7rem;
`;

const Footer = () => {
	return (
		<FooterBox>
			<MusicController />
			<span>footer 2</span>
		</FooterBox>
	);
};

export default Footer;
