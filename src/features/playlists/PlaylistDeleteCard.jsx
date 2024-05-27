import styled from "@emotion/styled";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { auth, firestore, storage } from "../../config/firebase_config";
import {
	CreateError,
	FormPage,
	SuccessBox,
	SuccessImg,
	SuccessMessage,
} from "../../styles/styled_components";
import LoaderNote from "../../ui/LoaderNote";

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

const PlaylistDeleteCard = ({ isOpened, setIsOpened, playlistName }) => {
	const user = auth.currentUser;
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isSucceed, setIsSucceed] = useState(false);
	const [deletingStatus, setDeletingStatus] = useState("");

	useEffect(() => {
		let timeoutId;
		if (isSucceed || error) {
			timeoutId = setTimeout(() => {
				setIsOpened(false);
			}, 2000);
		}

		return () => clearTimeout(timeoutId);
	}, [isSucceed, error]);

	const deletePlaylist = async (collectionName, playlistId) => {
		try {
			setIsLoading(true);
			setError("");
			setIsSucceed(false);
			setDeletingStatus("");

			const playlistRef = doc(firestore, collectionName, playlistId);
			setDeletingStatus("Navigating to playlist ...");
			const playlistSnap = await getDoc(playlistRef);
			if (playlistSnap.exists) {
				setDeletingStatus(`Deleting ${playlistName}'s metadata ...`);
				await deleteDoc(playlistRef);

				const { musics } = playlistSnap.data();

				musics.forEach((music, index) => {
					setDeletingStatus(`Deleting songs (${index + 1}/${musics.length})`);
					const songRef = ref(storage, music.songRef);
					const coverRef = ref(storage, music.coverRef);

					setDeletingStatus("Deleting music file ...");
					deleteObject(songRef)
						.then(() => {
							//
						})
						.catch((error) => {
							setError("Unable to delete song file.");
						});

					setDeletingStatus("Deleting music's cover art file ...");
					deleteObject(coverRef)
						.then(() => {
							//
						})
						.catch((error) => {
							setError("Unable to delete cover art file.");
						});
				});

				setIsSucceed(true);
			} else {
				console.log("playlist doesnot exist andymore");
				throw new Error(`${playlistName} doesn't exist anymore!`);
			}
		} catch (error) {
			console.log(error);
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
			deletePlaylist(`playlists${user.uid}`, playlistName);
		}
	};

	return (
		<FormPage>
			<DeleteBox>
				{isSucceed && (
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

				{error && <CreateError>{error}</CreateError>}
				{isLoading ? (
					<LoaderNote loadingMessage={deletingStatus} />
				) : (
					!isSucceed &&
					!error && (
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
