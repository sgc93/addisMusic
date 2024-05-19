import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
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

const PlaylistEditCard = ({ isOpened, setIsOpened, playlistName }) => {
	const user = auth.currentUser;
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isSucceed, setIsSucceed] = useState(false);
	const hasWarning = playlistName === name;

	const [status, setStatus] = useState("");

	useEffect(() => {
		setName(playlistName);
	}, []);

	// working
	const updatePlaylist = async (collectionName) => {
		try {
			setIsLoading(true);
			setError("");
			setIsSucceed(false);
			setStatus("");

			const oldPlaylistRef = doc(
				firestore,
				`playlists${user.uid}`,
				playlistName
			);
			const newPlaylistRef = doc(firestore, `playlists${user.uid}`, name);
			setStatus("getting old playlist data...");
			const oldPlaylistSnap = await getDoc(oldPlaylistRef);

			if (!oldPlaylistSnap.exists) {
				const oldData = oldPlaylistSnap.data();
				const updatedData = {
					...oldData,
					name: name,
					updatedAt: new Date().toLocaleDateString(),
				};
				setStatus("creating new playlist with updated data...");
				await setDoc(newPlaylistRef, updatedData);
				setStatus("deleting old playlist ...");
				await deleteDoc(oldPlaylistRef);

				setIsSucceed(true);
			}
		} catch (error) {
			console.log(error);
			setError(`Unable to update ${playlistName}, Check you connection`);
		} finally {
			setIsLoading(false);
			setStatus("");
		}
	};

	const closePopup = () => {
		setIsOpened(false);
	};

	const handleUpdatingPlaylist = (event) => {
		event.preventDefault();
		if (name.length == 0) {
			setError("Please enter playlist name!");
		} else if (hasWarning) {
			setError("No change has been made!");
		} else {
			updatePlaylist(`playlists${user.uid}`);
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
							updated successfully!
						</SuccessMessage>
					</SuccessBox>
				)}
				{status && <span>{status}</span>}
				{hasWarning && !error && (
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
								onClick={handleUpdatingPlaylist}
							>
								Update
							</FormBtn>
						</Form>
					)
				)}
			</FormBox>
		</FormPage>
	);
};

export default PlaylistEditCard;
