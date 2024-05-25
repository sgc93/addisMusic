import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { RiFileMusicFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
	FormInputLabel,
	FormPlaceholder,
	LabelIcon,
} from "../../styles/styled_components";
import TrackCard from "../../ui/TrackCard";
import { FormInput } from "../auth/Components";
import { currentMusicIndex, currentMusicList } from "../music/musicSlice";

const LocalBox = styled.div`
	display: flex;
	flex-direction: column;

	margin: 0rem 0.5rem 1rem 0rem;
`;

const MusicList = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 1rem;
	padding: 1rem;
`;

const LocalHeader = styled.div``;
const LocalBody = styled.div``;

const Local = () => {
	const [files, setFiles] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (files.length > 0) {
			dispatch(currentMusicList(files));
			dispatch(currentMusicIndex(0));
		}
	}, [files]);

	const handleSelectingFiles = (event) => {
		const selectedFiles = event.target.files;

		if (selectedFiles.length > 0) {
			const songs = [];
			for (var i = 0; i < selectedFiles.length; i++) {
				const song = {
					title: selectedFiles[i].name,
					coverArt: "./note1.jpg",
					isFavorite: false,
					url: URL.createObjectURL(selectedFiles[i]),
				};
				songs.push(song);
			}
			setFiles(songs);
		}
	};

	return (
		<LocalBox>
			<MusicList>
				{files.map((songFile, index) => (
					<TrackCard
						key={index}
						song={songFile}
						index={index}
						shouldMore
						shouldMoreAdd
					/>
				))}
			</MusicList>
			<FormInput
				type="file"
				accept="*.mp3"
				multiple
				onChange={handleSelectingFiles}
				id="localInput"
				hidden
			/>
			<FormInputLabel htmlFor="localInput">
				<FormPlaceholder>Select file(s)</FormPlaceholder>
				<LabelIcon>
					<RiFileMusicFill size={20} />
				</LabelIcon>
			</FormInputLabel>
		</LocalBox>
	);
};

export default Local;
