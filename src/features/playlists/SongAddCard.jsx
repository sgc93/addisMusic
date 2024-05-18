import styled from "@emotion/styled";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { CgImage, CgMusic } from "react-icons/cg";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";
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

const FavoriteBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;
const FavoriteText = styled.span`
	color: var(--color-text-tertiary);
	text-align: center;
`;
const FavoriteBtn = styled.button`
	display: flex;
	background: none;
	border: none;
	outline: none;

	font-size: 1.4rem;
	transition: all 0.5s;
	color: ${(props) =>
		props.isFavorite
			? "var(--color-text-success)"
			: "var(--color-text-secondary)"};
	cursor: pointer;
`;

const SongAddCard = ({ isOpened, setIsOpened, playlistName }) => {
	// to have music data > title, artist name, duration, cover url and music url
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [duration, setDuration] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);

	// to handling uploadable image file
	const [coverFile, setCoverFile] = useState("");
	const [coverName, setCoverName] = useState("");

	// to handling uploadable music file
	const [musicSrc, setMusicSrc] = useState("");
	const [musicName, setMusicName] = useState("");
	const [musicFile, setMusicFile] = useState("");

	// which file's name is being renamed : music/image
	const [isMusic, setIsMusic] = useState(false);
	const [isRenameBoxOpened, setIsRenameBoxOpened] = useState(false);

	const musicRef = useRef();
	const user = useSignedInUser();

	useEffect(() => {
		setMusicName(musicFile.name);
		const audio = musicRef.current;
		audio.onloadedmetadata = function () {
			if (audio.readyState > 0) {
				setDuration(audio.duration);
			}
		};
	}, [musicFile]);

	useEffect(() => {
		setCoverName(coverFile.name);
	}, [coverFile]);

	const uploadMusic = async () => {
		try {
			const musicReference = ref(
				storage,
				`fileList${user.uid}/musics/${musicName}`
			);
			const uploadTask = await uploadBytes(musicReference, musicFile);
			const downloadURL = await getDownloadURL(uploadTask.ref);
			return downloadURL; // downloadUrl is unique
		} catch (error) {
			//
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
		}
	};

	async function addMusicToPlaylist(playlistId) {
		try {
			// upload music
			const musicDownloadUrl = await uploadMusic();
			// upload cover art
			const coverDownloadUrl = await uploadCoverArt();

			// music data
			const musicData = {
				title: title,
				artist: artist,
				duration: duration,
				isPlayable: true,
				isFavorite: isFavorite,
				coverArt: coverDownloadUrl,
				url: musicDownloadUrl,
			};

			console.log(musicData);

			// store the uploaded files to user's storage
			const playlistDocRef = doc(firestore, `playlists${user.uid}`, playlistId);
			const playlistSnapshot = await getDoc(playlistDocRef);
			if (!playlistSnapshot.exists) {
				console.error(`Playlist document '${playlistId}' not found.`);
				return;
			}
			const playlistData = playlistSnapshot.data();
			console.log(playlistData);
			playlistData.musics.push(musicData);

			await updateDoc(playlistDocRef, playlistData);
			console.log("Music added to playlist successfully.");
		} catch (error) {
			console.error("Error adding music to playlist:", error);
		}
	}

	const closePopup = () => {
		setIsOpened(false);
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
			setCoverFile(file);
			setIsRenameBoxOpened(true);
		} else {
			console.log("file is not selected");
		}
	};

	const handleFavorite = (event) => {
		event.preventDefault();
		setIsFavorite((isFavorite) => !isFavorite);
	};

	return (
		<FormPage>
			<FormBox>
				<FormHeader>
					<FormTitleBox>
						<FormTitle>
							Add Music to <PlaylistName>{playlistName}</PlaylistName>
						</FormTitle>
						<FormSubTitle>Add one more song in this folder</FormSubTitle>
					</FormTitleBox>
					<IconButton handleClick={() => closePopup()}>
						<MdClose />
					</IconButton>
				</FormHeader>

				<Form>
					<audio src={musicSrc} ref={musicRef} hidden />
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
					<FavoriteBox>
						<FavoriteText>Favorite? </FavoriteText>
						<FavoriteBtn isFavorite={isFavorite} onClick={handleFavorite}>
							{isFavorite ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
						</FavoriteBtn>
					</FavoriteBox>
					<FormBtn
						style={formBtnStyle}
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							addMusicToPlaylist(playlistName);
						}}
					>
						Add
					</FormBtn>
				</Form>
			</FormBox>
		</FormPage>
	);
};

export default SongAddCard;
