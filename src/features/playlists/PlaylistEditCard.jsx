import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useClearUpdateState } from "../../hooks/useClearUpdateState";
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
import { playlistReset, playlistUpdate } from "./playlistSlice";

const PlaylistEditCard = ({ setIsOpened, playlistName }) => {
	const { isUpdating, isUpdated, updateError, allPlaylists } = useSelector(
		(state) => state.playlist
	);

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authUser);

	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const hasWarning = !isUpdated && playlistName === name;

	useEffect(() => {
		setName(playlistName);
		dispatch(playlistReset());
	}, []);

	const closePopup = () => {
		setIsOpened(false);
	};

	useClearUpdateState(closePopup);

	const handleUpdatingPlaylist = (event) => {
		event.preventDefault();
		if (name.length == 0) {
			setError("Please enter playlist name!");
		} else if (hasWarning) {
			setError("No change has been made!");
		} else {
			if (user) {
				dispatch(
					playlistUpdate({
						updateType: "rename",
						collectionName: `playlists${user.uid}`,
						oldPlaylistName: playlistName,
						newPlaylistName: name,
						currentPlaylists: allPlaylists,
					})
				);

				// updatePlaylist(`playlists${user.uid}`, playlistName, name);
			}
		}
	};

	return (
		<FormPage>
			<FormBox>
				<FormHeader>
					<FormTitleBox>
						<FormTitle>Renaming a playlist</FormTitle>
						<FormSubTitle>Ya, Names should be expressive!</FormSubTitle>
					</FormTitleBox>
					<IconButton handleClick={() => closePopup()}>
						<MdClose />
					</IconButton>
				</FormHeader>
				{isUpdated && (
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
				{hasWarning && !error && !updateError && (
					<CreateWarning>
						<WarningIcon>
							<IoWarning />
						</WarningIcon>
						<span>No change has been made yet!</span>
					</CreateWarning>
				)}
				{error && !updateError && <CreateError>{error}</CreateError>}
				{!error && updateError && <CreateError>{updateError}</CreateError>}
				{isUpdating ? (
					<LoaderNote
						loadingMessage={`Renaming ${playlistName} to ${name} ...`}
					/>
				) : (
					!isUpdated &&
					!updateError && (
						<Form>
							<FormInput
								type="text"
								placeholder="Playlist Name"
								value={name}
								onChange={(event) => {
									setName(event.target.value);
									setError("");
								}}
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
