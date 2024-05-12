import styled from "@emotion/styled";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { storage } from "../../config/firebase_config";
import { useSignedInUser } from "../../hooks/CheckAuth";

const PlayListBox = styled.div`
	padding: 0.5rem 1rem;
`;

const PlayList = () => {
	const user = useSignedInUser();
	const musicRef = useRef();
	const [isLoading, setIsLoading] = useState(false);

	const upload = async () => {
		const musicFile = musicRef.current;
		console.log(musicFile);
		try {
			setIsLoading(true);
			const musicRef = ref(
				storage,
				`musics${user.email.split("@")[0]}/${musicFile.src}`
			);
			const uploadTask = await uploadBytes(musicRef, musicFile);
			const downloadURL = await getDownloadURL(uploadTask.ref);
			console("uploaded musics download url: " + downloadURL);
			return downloadURL;
		} catch (error) {
			console.error("Error uploading music:", error);
			// Handle upload errors
		} finally {
			setIsLoading(true);
		}
	};
	return (
		<PlayListBox>
			{isLoading && <span>Uploading</span>}
			<audio src="./qimemun.mp3" ref={musicRef} controls />
			<button onClick={() => upload()}>upload</button>
		</PlayListBox>
	);
};

export default PlayList;
