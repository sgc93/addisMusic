import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { auth, firestore } from "../../config/firebase_config";
import {
	CreateError,
	CreateWarning,
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
	WarningIcon,
	formBtnStyle,
} from "../../styles/styled_components";
import IconButton from "../../ui/IconButton";
import LoaderNote from "../../ui/LoaderNote";

const PlaylistDeleteCard = ({ isOpened, setIsOpened, playlistName }) => {
	const user = auth.currentUser;
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isSucceed, setIsSucceed] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);

	const deletePlaylist = async (collectionName, playlistId) => {
		try {
			setIsLoading(true);
			setError("");
			setIsSucceed(false);

			const playlistRef = doc(firestore, collectionName, playlistId);
			await deleteDoc(playlistRef);
			setIsSucceed(true);
		} catch (error) {
			setError(`Unable to delete ${playlistName}, Check you connection`);
		} finally {
			setIsLoading(false);
		}
	};

	const closePopup = () => {
		setIsOpened(false);
	};

	const handleDeletingPlaylist = (event) => {
		event.preventDefault();
		if (user) {
			deletePlaylist(`playlists${user.uid}`, playlistName, name);
		}
	};

	return (
		<FormPage>
			<FormBox>
				<FormHeader>
					<FormTitleBox>
						<FormTitle>Deleting a playlist</FormTitle>
						<FormSubTitle>Y one more music folder</FormSubTitle>
					</FormTitleBox>
					<IconButton handleClick={() => closePopup()}>
						<MdClose />
					</IconButton>
				</FormHeader>
				{isSucceed && (
					<SuccessBox>
						<SuccessImg src="./thumbsup.gif" />
						<SuccessMessage>
							<span
								style={{
									textTransform: "capitalize",
									color: "var(--color-gradient-1)",
								}}
							>
								{playlistName}
							</span>{" "}
							is updated to{" "}
							<span
								style={{
									textTransform: "capitalize",
									color: "var(--color-gradient-3)",
								}}
							>
								{name}
							</span>{" "}
							successfully!
						</SuccessMessage>
					</SuccessBox>
				)}
				{!error && (
					<CreateWarning>
						<WarningIcon>
							<IoWarning />
						</WarningIcon>
						<span>No change has been made yet!</span>
					</CreateWarning>
				)}
				{error && <CreateError>{error}</CreateError>}
				{isLoading ? (
					<LoaderNote loadingMessage={`Updating ${name} ...`} />
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
								onClick={handleDeletingPlaylist}
							>
								Delete
							</FormBtn>
						</Form>
					)
				)}
			</FormBox>
		</FormPage>
	);
};

export default PlaylistDeleteCard;
