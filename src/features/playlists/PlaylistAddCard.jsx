import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../config/firebase_config";
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
import { playlistAdd, playlistAddClose } from "./playlistSlice";

const PlaylistAddCard = ({ currentPlaylists, setIsOpened }) => {
	const user = auth.currentUser;
	const { isAdding, addError, isPlaylistAdded } = useSelector(
		(state) => state.playlist
	);
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [error, setError] = useState(false);

	useEffect(() => {
		let timeoutId;
		if (isPlaylistAdded) {
			timeoutId = setTimeout(() => {
				closePopup();
				dispatch(playlistAddClose());
			}, 1500);
		}
		return () => clearTimeout(timeoutId);
	}, [isPlaylistAdded]);

	const closePopup = () => {
		setIsOpened(false);
	};

	const handleCreatePlaylist = (event) => {
		event.preventDefault();
		if (name.length == 0) {
			setError("Please enter playlist name!");
		} else {
			dispatch(
				playlistAdd({
					name: name,
					collectionName: `playlists${user.uid}`,
					currentPlaylists: currentPlaylists,
				})
			);
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
				{isPlaylistAdded && (
					<SuccessBox>
						<SuccessImg src="./thumbsup.gif" />
						<SuccessMessage>
							<span style={{ textTransform: "capitalize" }}>{name}</span> is
							created successfully!
						</SuccessMessage>
					</SuccessBox>
				)}
				{error && !addError && <CreateError>{error}</CreateError>}
				{!error && addError && <CreateError>{addError}</CreateError>}
				{isAdding ? (
					<LoaderNote loadingMessage={`Creating ${name} ...`} />
				) : (
					!isPlaylistAdded && (
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
