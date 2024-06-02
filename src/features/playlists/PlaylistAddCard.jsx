import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useClearUpdateState } from "../../hooks/useClearUpdateState";
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
import { playlistReset, playlistUpdate } from "./playlistSlice";

const PlaylistAddCard = ({ currentPlaylists, setIsOpened }) => {
	const { user } = useSelector((state) => state.authUser);
	const { isUpdating, updateError, isUpdated } = useSelector(
		(state) => state.playlist
	);
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	useEffect(() => {
		dispatch(playlistReset());
	}, []);

	const closePopup = () => {
		setIsOpened(false);
	};

	useClearUpdateState(closePopup);

	const handleCreatePlaylist = (event) => {
		event.preventDefault();
		if (name.length == 0) {
			setError("Please enter playlist name!");
		} else {
			dispatch(
				playlistUpdate({
					updateType: "create",
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
				{isUpdated && (
					<SuccessBox>
						<SuccessImg src="./thumbsup.gif" />
						<SuccessMessage>
							<span style={{ textTransform: "capitalize" }}>{name}</span> is
							created successfully!
						</SuccessMessage>
					</SuccessBox>
				)}
				{error && !updateError && <CreateError>{error}</CreateError>}
				{!error && updateError && <CreateError>{updateError}</CreateError>}
				{isUpdating ? (
					<LoaderNote loadingMessage={`Creating ${name} ...`} />
				) : (
					!isUpdated && (
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
