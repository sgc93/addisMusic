import { useState } from "react";
import { MdClose } from "react-icons/md";
import {
	Form,
	FormBox,
	FormBtn,
	FormHeader,
	FormInput,
	FormPage,
	FormSubTitle,
	FormTitle,
	FormTitleBox,
	formBtnStyle,
} from "../../styles/styled_components";
import IconButton from "../../ui/IconButton";

const PlaylistAddCard = ({ isOpened, setIsOpened }) => {
	const [name, setName] = useState("");

	const closePopup = () => {
		setIsOpened(false);
	};

	const handleCreatePlaylist = (event) => {
		event.preventDefault();
	};

	return (
		<FormPage>
			<FormBox>
				<FormHeader>
					<FormTitleBox>
						<FormTitle>Creating a playlist</FormTitle>
						<FormSubTitle>Have one more music folder</FormSubTitle>
					</FormTitleBox>
					<IconButton handleClick={() => closePopup()}>
						<MdClose />
					</IconButton>
				</FormHeader>

				<Form>
					<FormInput
						type="text"
						placeholder="Playlist Name"
						value={name}
						onChange={(event) => setName(event.target.value)}
						required
					/>
					<FormBtn
						style={formBtnStyle}
						type="submit"
						onClick={handleCreatePlaylist}
					>
						Create
					</FormBtn>
				</Form>
			</FormBox>
		</FormPage>
	);
};

export default PlaylistAddCard;
