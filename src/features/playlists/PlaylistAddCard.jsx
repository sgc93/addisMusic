import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { auth, firestore } from "../../config/firebase_config";
import {
	CreateError,
	Form,
	FormBox,
	FormBtn,
	FormHeader,
	FormInput,
	FormPage,
	FormSubTitle,
	FormTitle,
	FormTitleBox,
	SuccessBox,
	SuccessImg,
	SuccessMessage,
	formBtnStyle,
} from "../../styles/styled_components";
import IconButton from "../../ui/IconButton";
import LoaderNote from "../../ui/LoaderNote";

const PlaylistAddCard = ({ isOpened, setIsOpened }) => {
	const user = auth.currentUser;
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isSucceed, setIsSucceed] = useState(false);

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
				setIsSucceed(true);
			} catch (error) {
				setError("Unable to create new playlist, Check you connection");
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
			createNewPlaylist(`playlists${user.uid}`);
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
				{isSucceed && (
					<SuccessBox>
						<SuccessImg src="./thumbsup.gif" />
						<SuccessMessage>
							<span style={{ textTransform: "capitalize" }}>{name}</span> is
							created successfully!
						</SuccessMessage>
					</SuccessBox>
				)}
				{error && <CreateError>{error}</CreateError>}
				{isLoading ? (
					<LoaderNote loadingMessage={`Creating ${name} ...`} />
				) : (
					!isSucceed && (
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
					)
				)}
			</FormBox>
		</FormPage>
	);
};

export default PlaylistAddCard;
