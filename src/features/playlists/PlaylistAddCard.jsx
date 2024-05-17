import styled from "@emotion/styled";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { auth, firestore } from "../../config/firebase_config";
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

const CreateError = styled.span`
	text-align: center;
	font-size: 1.1rem;
	color: var(--color-text-error);
	background-color: var(--color-text-tertiary);
	padding: 0.2rem 0.4rem;
	border-radius: 0.4rem;
`;

const PlaylistAddCard = ({ isOpened, setIsOpened }) => {
	const user = auth.currentUser;
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	// working
	const createNewPlaylist = async (collectionName) => {
		if (name.length == 0) {
			setError("enter playlist name first");
		} else {
			setIsLoading(true);
			setError("");
			const playlistData = {
				name: name,
				createdAt: new Date().toLocaleDateString(),
				updatedAt: new Date().toLocaleDateString(),
			};
			try {
				const docRef = doc(firestore, collectionName, name);
				await setDoc(docRef, {
					...playlistData,
					musics: [],
				});
			} catch (error) {
				setError("un able to create new playlist");
				console.log("Error creating playlist document:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const closePopup = () => {
		setIsOpened(false);
	};

	const handleCreatePlaylist = (event) => {
		event.preventDefault();
		if (name.length == 0) {
			setError("Please enter playlist name!");
		} else {
			createNewPlaylist(`playlist${user.uid}`);
		}
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
				{error && <CreateError>{error}</CreateError>}
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
