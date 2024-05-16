import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiRename } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { FormInput, FormSubTitle } from "../../styles/styled_components";
import IconButton from "../../ui/IconButton";
import { renameMusicFile } from "../../utils/file";

const RenameBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0.5rem 0.5rem 0rem;
	color: var(--color-text-tertiary);
`;
const Question = styled.span`
	font-size: small;
`;
const RenameFormBox = styled.div`
	position: absolute;
	left: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	padding: 1rem;
	width: fit-content;
	background: radial-gradient(var(--color-rad-outer), var(--color-bg-primary));
	border: 1px solid var(--color-border-primary);
	border-radius: 0.6rem;

	margin-left: 0.5rem;
`;

const TitleBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const RenameForm = styled.div`
	display: flex;
	gap: 1rem;
`;

const DoneBtn = styled.button`
	background-color: var(--color-text-tertiary);
	color: var(--color-bg-primary);
	border: none;
	outline: none;
	border-radius: 0.4rem;
	font-size: small;
	font-weight: 600;
	padding: 0.4rem 0.7rem;
	margin: 0.1rem 0;
	cursor: pointer;
	transition: 0.4s;
	&:hover {
		background-color: var(--color-text-primary);
	}
`;

const RenameError = styled.span`
	color: var(--color-text-error);
	font-weight: bold;
	font-size: small;
	background-color: var(--color-text-secondary);
	border-radius: 0.3rem;
	padding: 0.2rem 0.5rem;
	text-align: center;
`;

const FileRename = ({
	question,
	title,
	file,
	setFile,
	isRenameBoxOpened,
	setIsRenameBoxOpened,
}) => {
	const [newName, setNewName] = useState("");
	const [error, setError] = useState("");
	const [isRenameOpened, setIsRenameOpened] = useState(false);
	const [isRenameBoxHovered, setIsRenameBoxHovered] = useState(false);

	useEffect(() => {
		let timeoutId;
		if (isRenameBoxOpened && !isRenameBoxHovered) {
			timeoutId = setTimeout(() => {
				setIsRenameBoxOpened(false);
			}, 4000);
		}

		return () => clearTimeout(timeoutId);
	}, [isRenameBoxOpened, isRenameBoxHovered]);

	const openRenameBox = (event) => {
		event.preventDefault();
		setIsRenameOpened(true);
	};

	const closeRenameBox = (event) => {
		event.preventDefault();
		setIsRenameOpened(false);
	};

	const isNameValid = () => {
		if (newName.length > 0) {
			return true;
		} else {
			return false;
		}
	};

	const handleRenaming = async (event) => {
		event.preventDefault();
		if (newName.length > 0) {
			try {
				const response = await renameMusicFile(file, newName);
				setFile(response);
			} catch (error) {
				setError(error.message);
			}
		} else {
			setError("Enter new name please");
		}
	};

	return (
		<RenameBox
			onMouseEnter={() => setIsRenameBoxHovered(true)}
			onMouseLeave={() => setIsRenameBoxHovered(false)}
		>
			<Question>{question}</Question>
			<IconButton handleClick={openRenameBox}>
				<BiRename />
			</IconButton>
			{isRenameOpened && (
				<RenameFormBox>
					<TitleBox>
						<FormSubTitle>{title}</FormSubTitle>
						<IconButton handleClick={closeRenameBox}>
							<MdClose />
						</IconButton>
					</TitleBox>
					{error && <RenameError>{error}</RenameError>}
					<RenameForm>
						<FormInput
							type="text"
							placeholder="New file name"
							width={"12rem"}
							value={newName}
							onChange={(e) => {
								setError("");
								setNewName(e.target.value);
							}}
						/>
						<DoneBtn onClick={handleRenaming}>Done</DoneBtn>
					</RenameForm>
				</RenameFormBox>
			)}
		</RenameBox>
	);
};

export default FileRename;
