import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiFolderOpen } from "react-icons/bi";
import { IoMdArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import TrackCard from "../../ui/TrackCard";
import { FormInput } from "../auth/Components";
import { currentMusicIndex, currentMusicList } from "../music/musicSlice";

const LocalBox = styled.div`
	display: flex;
	flex-direction: column;

	margin: 0rem 0.5rem 1rem 0rem;
`;

const LocalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 1rem;
`;
const LocalText = styled.span`
	font-size: 1.2rem;
	font-weight: bold;

	color: var(--color-bg-primary);
`;

const LocalBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	color: var(--color-text-primary);
	background-color: #3c3ccd;
	border: 1px solid #2b2bbb;
	border-radius: 0.4rem;
	padding: 0.3rem 0.6rem;
	font-size: 1rem;
	font-weight: bold;

	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		color: white;
	}
`;

const InputLabel = styled.label`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	color: var(--color-text-primary);
	background-color: #2b2bbb;
	border: 1px solid #2b2bbb;
	border-radius: 0.4rem;
	padding: 0.3rem 0.6rem;
	font-size: 1rem;
	font-weight: bold;

	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		border-color: var(--color-text-primary);
	}
`;

const Placeholder = styled.span`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

const MusicList = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;

	gap: 1rem;
	padding: 1rem;
`;

const EmptyBox = styled.div`
	align-self: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	padding-top: 10rem;
`;

const EmptyTitle = styled.div`
	text-align: center;
	font-size: 1.3rem;
	font-weight: bold;

	color: var(--color-rad-outer);
`;

const LocalInputLabel = () => {
	return (
		<InputLabel htmlFor="localInput">
			<Placeholder>
				<BiFolderOpen size={17} />
				<span>Open file(s)</span>
			</Placeholder>
			<IoMdArrowDown size={20} />
		</InputLabel>
	);
};

const EmptyLocal = () => {
	return (
		<EmptyBox>
			<EmptyTitle>Navigate to you local and select music(s)</EmptyTitle>
			<LocalInputLabel />
		</EmptyBox>
	);
};

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
			<FormInput
				type="file"
				accept="*.mp3"
				multiple
				onChange={handleSelectingFiles}
				id="localInput"
				hidden
			/>
			{files.length > 0 ? (
				<>
					<LocalHeader>
						<LocalText>Selected Musics</LocalText>
						<LocalInputLabel />
					</LocalHeader>
					<MusicList>
						{files.map((songFile, index) => (
							<TrackCard
								key={index}
								song={songFile}
								index={index}
								shouldMore
								shouldMoreAdd
								isLocal
							/>
						))}
					</MusicList>
				</>
			) : (
				<EmptyLocal />
			)}
		</LocalBox>
	);
};

export default Local;
