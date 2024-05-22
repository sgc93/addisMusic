import styled from "@emotion/styled";
import { useState } from "react";
import { FormInput } from "../auth/Components";

const LocalBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 97%;

	margin: 0rem 0.5rem 1rem 0rem;
	background: linear-gradient(to top, var(--color-bg-tertiary), #ffffff13 10%);
`;

const Local = () => {
	const [files, setFiles] = useState([]);

	const handleSelectingFiles = (event) => {
		const selectedFiles = event.target.files;
		console.log(selectedFiles);
	};

	return (
		<LocalBox>
			<FormInput
				type="file"
				accept="*.mp3"
				multiple
				onChange={handleSelectingFiles}
			/>
		</LocalBox>
	);
};

export default Local;
