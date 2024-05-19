import styled from "@emotion/styled";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { auth, firestore } from "../../config/firebase_config";
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
					<LoaderNote
						loadingMessage={`Deleting ${playlistName} permanently ...`}
					/>
				) : (
					!isSucceed && (
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
