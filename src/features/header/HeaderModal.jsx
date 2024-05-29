import styled from "@emotion/styled";
import { MdClose } from "react-icons/md";
import IconButton from "../../ui/IconButton";
import {
	AuthBox,
	AuthHeader,
	SubTitle,
	Title,
	TitleBox,
} from "../auth/Components";

const ModalWindow = styled.div`
	position: absolute;
	top: -0.6rem;
	right: -0.6rem;
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100dvw;
	height: 100dvh;
	backdrop-filter: blur(10px);
`;

const HeaderModal = ({ isAbout, isContact, isLike, closeModal }) => {
	return (
		<ModalWindow>
			<AuthBox>
				<AuthHeader>
					<TitleBox>
						<Title>{isAbout ? "About" : "Contact"}</Title>
						<SubTitle>
							{isAbout
								? "it is important to know the intension of what we are looking intensionally!"
								: "feel free to contact for good reasons!"}
						</SubTitle>
					</TitleBox>
					<IconButton handleClick={() => closeModal()}>
						<MdClose />
					</IconButton>
				</AuthHeader>
			</AuthBox>
		</ModalWindow>
	);
};

export default HeaderModal;
