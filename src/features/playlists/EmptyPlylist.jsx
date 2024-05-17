import styled from "@emotion/styled";
import { TbMusicPlus } from "react-icons/tb";
import { rotate360 } from "../../styles/animation";
import {
	FormBox,
	FormPage,
	FormSubTitle,
	FormTitle,
	FormTitleBox,
} from "../../styles/styled_components";

const AddBtnBox = styled.div``;

const AddBtnOverly = styled.div``;
const AddBtn = styled.button`
	position: relative;
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: center;

	margin-top: 2rem;
	padding: 0.5rem 0.8rem;
	font-size: 2rem;
	background: none;
	color: var(--color-text-primary);
	border: none;
	outline: none;
	border-radius: 0.6rem;

	cursor: pointer;
	overflow: hidden;
	transition: all 0.5s;

	&::after {
		content: "";
		position: absolute;
		width: 150%;
		height: 50%;
		border-radius: 0.6rem;
		background: linear-gradient(
			43deg,
			var(--color-gradient-1),
			var(--color-gradient-3),
			var(--color-rad-outer),
			var(--color-gradient-2)
		);
		z-index: -2;
		transition: 0.5s;
		animation: ${rotate360} 1.4s linear;
		animation-iteration-count: infinite;
	}

	&::before {
		content: "";
		position: absolute;
		width: 90%;
		height: 90%;
		border-radius: 0.6rem;
		background: radial-gradient(
			var(--color-rad-outer),
			var(--color-bg-primary)
		);
		transition: all 0.3s;
		z-index: -1;
	}

	&:hover::after {
		height: 150%;
	}
	&:hover::before {
		transform: scale(0.8);
	}
`;

const EmptyPlaylist = () => {
	return (
		<FormPage>
			<FormBox>
				<FormTitleBox>
					<FormTitle>You have no playlists</FormTitle>
					<FormSubTitle>Click plus button to create one!</FormSubTitle>
				</FormTitleBox>
				<AddBtnBox>
					<AddBtnOverly />
					<AddBtn>
						<TbMusicPlus />
					</AddBtn>
				</AddBtnBox>
			</FormBox>
		</FormPage>
	);
};

export default EmptyPlaylist;
