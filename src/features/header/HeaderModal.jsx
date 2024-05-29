import styled from "@emotion/styled";
import { MdClose } from "react-icons/md";
import IconButton from "../../ui/IconButton";
import { AuthHeader, SubTitle, Title, TitleBox } from "../auth/Components";

const ModalWindow = styled.div`
	position: absolute;
	top: 2.7rem;
	left: ${(props) => (props.isAbout ? "26.7%" : "40%")};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ModalBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 0.7rem;

	background: radial-gradient(var(--color-rad-center), var(--color-rad-outer));
	border: 3px solid var(--color-border-primary);
	border-radius: 1rem;
`;

const HeaderModal = ({ isAbout, isContact, isLike, closeModal }) => {
	return (
		<ModalWindow isAbout={isAbout}>
			<ModalBox>
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
			</ModalBox>
		</ModalWindow>
	);
};

export default HeaderModal;
