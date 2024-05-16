import styled from "@emotion/styled";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
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
import FileRename from "./FileRename";

const PlaylistName = styled.span`
	color: var(--color-gradient-2);
`;

const FileBox = styled.div``;

const SongAddCard = ({ isOpened, setIsOpened }) => {
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [duration, setDuration] = useState(0);
	const [coverUrl, setCoverUrl] = useState("");
	const [musicUrl, setMusicUrl] = useState("");

	const [coverFile, setCoverFile] = useState("");
	const [coverName, setCoverName] = useState("");
	const [coverSrc, setCoverSrc] = useState("");

	const [musicSrc, setMusicSrc] = useState("");
	const [musicName, setMusicName] = useState("");
	const [musicFile, setMusicFile] = useState("");

	const [isMusic, setIsMusic] = useState(false);

	const [isRenameBoxOpened, setIsRenameBoxOpened] = useState(false);

	const musicRef = useRef();
	const user = useSignedInUser();

	useEffect(() => {
		setMusicName(musicFile.name);
		setDuration(musicFile.size);
	}, [musicFile]);

	const uploadMusic = async () => {
		try {
			const musicReference = ref(storage, `  ${user.uid}/musics/${musicName}`);
			const uploadTask = await uploadBytes(musicReference, musicFile);
			const downloadURL = await getDownloadURL(uploadTask.ref);
			return downloadURL; // downloadUrl is unique
		} catch (error) {
			console.log("Error uploading music:", error);
		}
	};

	const uploadCoverArt = async () => {
		try {
			const coverArtRef = ref(
				storage,
				`fileList${user.uid}/coverArts/${coverName}`
			);
			const uploadTask = await uploadBytes(coverArtRef, coverFile);
			const coverArtURL = await getDownloadURL(uploadTask.ref);
			return coverArtURL; // Return the download URL it is also unique : can be used as id
		} catch (error) {
			console.error("Error uploading cover art:", error);
			// Handle upload errors
		}
	};

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
		setIsMusic(true);
		const file = event.target.files[0];
		if (file && file.type === "audio/mpeg") {
			const audioSrc = URL.createObjectURL(file);
			setMusicSrc(audioSrc);
			setMusicFile(file);
			setIsRenameBoxOpened(true);
		} else {
			console.log("file is not selected");
		}
	};

	const handleImgInput = (event) => {
		setIsMusic(false);
		const file = event.target.files[0];
		if (file) {
			const imgUrl = URL.createObjectURL(file);
			setCoverFile(file);
			setCoverSrc(imgUrl);
			setIsRenameBoxOpened(true);
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
					<FileBox>
						<FormFileInput
							type="file"
							accept="image/*"
							id="coverArtInput"
							onChange={handleImgInput}
							hidden
						/>
						<FormInputLabel htmlFor="coverArtInput">
							<FormPlaceholder>
								{coverFile.name ? coverFile.name : "Upload cover art"}
							</FormPlaceholder>
							<LabelIcon>
								<CgImage />
							</LabelIcon>
						</FormInputLabel>
						{!isMusic && isRenameBoxOpened && (
							<FileRename
								file={coverFile}
								setFile={setCoverFile}
								setName={setCoverName}
								question={"would you like to rename the Cover Art?"}
								title={"Enter new cover art name"}
								isRenameBoxOpened={isRenameBoxOpened}
								setIsRenameBoxOpened={setIsRenameBoxOpened}
							/>
						)}
					</FileBox>
					<FileBox>
						<FormFileInput
							type="file"
							accept=".mp3"
							id="musicInput"
							onChange={handleMusicInput}
							hidden
						/>
						<FormInputLabel htmlFor="musicInput">
							<FormPlaceholder>
								{musicFile.name ? musicFile.name : "Upload song"}
							</FormPlaceholder>
							<LabelIcon>
								<CgMusic />
							</LabelIcon>
						</FormInputLabel>
						{isMusic && isRenameBoxOpened && (
							<FileRename
								file={musicFile}
								setFile={setMusicFile}
								setName={setMusicName}
								question={"would you like to rename this music?"}
								title={"Enter new music name"}
								isRenameBoxOpened={isRenameBoxOpened}
								setIsRenameBoxOpened={setIsRenameBoxOpened}
							/>
						)}
					</FileBox>
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
