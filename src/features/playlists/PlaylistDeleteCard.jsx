import styled from "@emotion/styled";
import { useEffect } from "react";
import { IoWarning } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../config/firebase_config";
import { useClearUpdateState } from "../../hooks/useClearUpdateState";
import {
	CreateError,
	FormPage,
	SuccessBox,
	SuccessImg,
	SuccessMessage,
} from "../../styles/styled_components";
import LoaderNote from "../../ui/LoaderNote";
import { playlistReset, playlistUpdate } from "./playlistSlice";

const DeleteBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.4rem;

	padding: 2rem;
	background-color: var(--color-bg-primary);
	border-radius: 1rem;
	border: 2px solid var(--color-border-primary);

	max-width: 23rem;
`;
const MessageBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.6rem;

	color: var(--color-text-warning);
`;
const IconStyle = styled.span`
	font-size: 2.4rem;
`;
const DeleteMessage = styled.span`
	text-align: center;
`;

const DeleteBtn = styled.button`
	padding: 0.4rem 0.8rem;
	font-weight: bold;
	color: var(--color-text-tertiary);
	background-color: var(--color-text-error);
	border: none;
	border-radius: 0.4rem;
	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		color: var(--color-text-primary);
	}
`;
const CancelBtn = styled.button`
	padding: 0.4rem 0.8rem;
	font-weight: bold;
	color: var(--color-text-tertiary);
	background-color: var(--color-bg-secondary);
	border: none;
	border-radius: 0.4rem;
	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		color: var(--color-text-primary);
	}
`;

const BtnBox = styled.div`
	align-self: flex-end;
	display: flex;
	align-items: center;
	gap: 0.6rem;
`;

const PlaylistDeleteCard = ({ setIsOpened, setIsDetailing }) => {
	const { isUpdating, isUpdated, updateError, allPlaylists, selectedPlaylist } =
		useSelector((state) => state.playlist);
	const playlistName = selectedPlaylist.name;
	const dispatch = useDispatch();
	const user = auth.currentUser;

	useEffect(() => {
		dispatch(playlistReset());
	}, []);

	useEffect(() => {
		let timeoutId;
		if (updateError) {
			timeoutId = setTimeout(() => {
				setIsOpened(false);
			}, 1500);
		}

		return () => clearTimeout(timeoutId);
	}, [updateError]);

	const closePopup = () => {
		setIsOpened(false);
	};

	useClearUpdateState(closePopup);

	const handleDeletingPlaylist = (event) => {
		event.preventDefault();
		if (user) {
			dispatch(
				playlistUpdate({
					updateType: "delete",
					collectionName: `playlists${user.uid}`,
					playlistName: playlistName,
					currentPlaylists: allPlaylists,
				})
			);
			setIsDetailing(false);
		}
	};

	return (
		<FormPage>
			<DeleteBox>
				{isUpdated && (
					<SuccessBox>
						<SuccessImg src="./thumbsup.gif" />
						<SuccessMessage>
							You have deleted
							<span
								style={{
									textTransform: "capitalize",
									color: "var(--color-gradient-3)",
								}}
							>
								{" "}
								{playlistName}
							</span>{" "}
							successfully!
						</SuccessMessage>
					</SuccessBox>
				)}

				{updateError && <CreateError>{updateError}</CreateError>}
				{isUpdating ? (
					<LoaderNote loadingMessage={`Deleting ${playlistName}...`} />
				) : (
					!isUpdated &&
					!updateError && (
						<>
							<MessageBox>
								<IconStyle>
									<IoWarning />
								</IconStyle>
								<DeleteMessage>
									This will permanently delete all data in {playlistName}!
								</DeleteMessage>
							</MessageBox>
							<BtnBox>
								<CancelBtn onClick={() => closePopup()}>Cancel</CancelBtn>
								<DeleteBtn onClick={handleDeletingPlaylist}> Delete</DeleteBtn>
							</BtnBox>
						</>
					)
				)}
			</DeleteBox>
		</FormPage>
	);
};

export default PlaylistDeleteCard;
