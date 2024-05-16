import styled from "@emotion/styled";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { CgImage, CgMusic } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { firestore, storage } from "../../config/firebase_config";
import { useSignedInUser } from "../../hooks/CheckAuth";
import {
	Form,
	FormBox,
	FormBtn,
	FormFileInput,
	FormHeader,
	FormInput,
	FormInputLabel,
	FormPage,
	FormPlaceholder,
	FormSubTitle,
	FormTitle,
	FormTitleBox,
	LabelIcon,
	formBtnStyle,
} from "../../styles/styled_components";
import IconButton from "../../ui/IconButton";

const PlaylistName = styled.span`
	color: var(--color-gradient-2);
`;

const SongAddCard = ({ isOpened, setIsOpened }) => {
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [duration, setDuration] = useState("");
	const [coverArt, setCoverArt] = useState("");
	const [coverName, setCoverName] = useState("");

	const [musicSrc, setMusicSrc] = useState("");
	const [musicName, setMusicName] = useState("");

	const musicRef = useRef();
	const user = useSignedInUser();

	const uploadMusic = async (musicFile) => {
		try {
			const musicRef = ref(storage, `  ${user.uid}/musics/${musicFile.name}`);
			const uploadTask = await uploadBytes(musicRef, musicFile);
			const downloadURL = await getDownloadURL(uploadTask.ref);
			return downloadURL; // downloadUrl is unique
		} catch (error) {
			console.log("Error uploading music:", error);
		}
	};

	async function uploadCoverArt(imageFile) {
		try {
			const coverArtRef = ref(
				storage,
				`fileList${user.uid}/coverArts/${imageFile.name}`
			);
			const uploadTask = await uploadBytes(coverArtRef, imageFile);
			const coverArtURL = await getDownloadURL(uploadTask.ref);
			return coverArtURL; // Return the download URL it is also unique : can be used as id
		} catch (error) {
			console.error("Error uploading cover art:", error);
			// Handle upload errors
		}
	}

	async function addMusicToPlaylist(playlistId) {
		try {
			// upload music
			// upload cover art
			// have all data
			// Create a reference to the playlist document
			const playlistRef = doc(firestore, `playlists${user.id}`, playlistId);

			// Get the current playlist data (optional)
			const playlistSnapshot = await getDoc(playlistRef);
			if (!playlistSnapshot.exists) {
				console.error(`Playlist document '${playlistId}' not found.`);
				return;
			}
			const playlistData = playlistSnapshot.data();

			// Add the music data to the 'musics' array
			// playlistData.musics.push(musicData);

			// Update the playlist document with the updated 'musics' array
			await updateDoc(playlistRef, playlistData);
			console.log("Music added to playlist successfully.");
		} catch (error) {
			console.error("Error adding music to playlist:", error);
		}
	}

	const closePopup = () => {
		setIsOpened(false);
	};

	const handleCreatePlaylist = (event) => {
		event.preventDefault();
	};

	const handleMusicInput = (event) => {
		const file = event.target.files[0];
		console.log(file);
		if (file && file.type === "audio/mpeg") {
			const audioSrc = URL.createObjectURL(file);
			setMusicSrc(audioSrc);
			setMusicName(file.name);
		} else {
			console.log("file is not selected");
		}
	};

	return (
		<FormPage>
			<FormBox>
				<FormHeader>
					<FormTitleBox>
						<FormTitle>
							Add Music to <PlaylistName>Abc</PlaylistName>
						</FormTitle>
						<FormSubTitle>Add one more song in this folder</FormSubTitle>
					</FormTitleBox>
					<IconButton handleClick={() => closePopup()}>
						<MdClose />
					</IconButton>
				</FormHeader>

				<Form>
					<audio src={musicSrc} ref={musicRef} controls />
					<FormInput
						type="text"
						placeholder="Song title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					<FormInput
						type="text"
						placeholder="Artist Name"
						value={artist}
						onChange={(event) => setArtist(event.target.value)}
					/>
					<input
						type="file"
						placeholder="Cover art"
						id="coverArtInput"
						onChange={(event) => setCoverArt(event.target.value)}
					/>
					<FormInputLabel htmlFor="coverArtInput">
						<span>Upload cover art</span>
						<LabelIcon>
							<CgImage />
						</LabelIcon>
					</FormInputLabel>
					<FormFileInput
						type="file"
						accept=".mp3"
						placeholder="Cover art"
						id="musicInput"
						onChange={handleMusicInput}
						hidden
					/>
					<FormInputLabel htmlFor="musicInput">
						<FormPlaceholder>
							{musicName ? musicName : "Upload song"}
						</FormPlaceholder>
						<LabelIcon>
							<CgMusic />
						</LabelIcon>
					</FormInputLabel>

					<FormBtn
						style={formBtnStyle}
						type="submit"
						onClick={handleCreatePlaylist}
					>
						Add
					</FormBtn>
				</Form>
			</FormBox>
		</FormPage>
	);
};

export default SongAddCard;
