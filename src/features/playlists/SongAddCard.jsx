import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { CgImage, CgMusic } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import {
	Form,
	FormBox,
	FormBtn,
	FormFileInput,
	FormHeader,
	FormInput,
	FormInputLabel,
	FormPage,
	FormSubTitle,
	FormTitle,
	FormTitleBox,
	LabelIcon,
	formBtnStyle,
} from "../../styles/styled_components";
import IconButton from "../../ui/IconButton";

const PlaylistName = styled.span`
	color: var(--color-gradient-2);
`;

const SongAddCard = ({ isOpened, setIsOpened }) => {
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [duration, setDuration] = useState("");
	const [coverArt, setCoverArt] = useState("");
	const [music, setMusic] = useState();
	const musicRef = useRef();

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
						<FormTitle>
							Add Music to <PlaylistName>Abc</PlaylistName>
						</FormTitle>
						<FormSubTitle>Add one more song in this folder</FormSubTitle>
					</FormTitleBox>
					<IconButton handleClick={() => closePopup()}>
						<MdClose />
					</IconButton>
				</FormHeader>

				<Form>
					<audio src={music} ref={musicRef} hidden />
					<FormInput
						type="text"
						placeholder="Song title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					<FormInput
						type="text"
						placeholder="Artist Name"
						value={artist}
						onChange={(event) => setArtist(event.target.value)}
					/>
					<FormFileInput
						type="file"
						placeholder="Cover art"
						id="coverArtInput"
						onChange={(event) => setCoverArt(event.target.value)}
					/>
					<FormInputLabel htmlFor="coverArtInput">
						<span>Upload cover art</span>
						<LabelIcon>
							<CgImage />
						</LabelIcon>
					</FormInputLabel>
					<FormFileInput
						type="file"
						placeholder="Cover art"
						id="coverArtInput"
						onChange={(event) => setCoverArt(event.target.value)}
					/>
					<FormInputLabel htmlFor="coverArtInput">
						<span>Upload song</span>
						<LabelIcon>
							<CgMusic />
						</LabelIcon>
					</FormInputLabel>

					<FormBtn
						style={formBtnStyle}
						type="submit"
						onClick={handleCreatePlaylist}
					>
						Add
					</FormBtn>
				</Form>
			</FormBox>
		</FormPage>
	);
};

export default SongAddCard;
