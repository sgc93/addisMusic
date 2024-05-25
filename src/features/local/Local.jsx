import styled from "@emotion/styled";
import { useState } from "react";
import { RiFileMusicFill } from "react-icons/ri";
import {
	FormInputLabel,
	FormPlaceholder,
	LabelIcon,
} from "../../styles/styled_components";
import { FormInput } from "../auth/Components";

const LocalBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 97%;

	margin: 0rem 0.5rem 1rem 0rem;
	background: linear-gradient(to top, var(--color-rad-outer2), #ffffff13 10%);
`;

const LocalHeader = styled.div``;
const LocalBody = styled.div``;

const Local = () => {
	const [files, setFiles] = useState([]);
	const [songs, setSongs] = useState([]);

	const handleSelectingFiles = (event) => {
		const selectedFiles = event.target.files;

		if (selectedFiles) {
			setFiles(selectedFiles);
			const allSrc = [];
			for (var i = 0; i < selectedFiles.length; i++) {
				allSrc.push(URL.createObjectURL(selectedFiles[i]));
				setFiles(allSrc);
			}
		}
	};

	return (
		<LocalBox>
			{files.length > 0 && <audio src={files[0]} controls />}
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