import { useState } from "react";
import { TbMusicPlus } from "react-icons/tb";
import {
	AnimatedBtn,
	FormBox,
	FormPage,
	FormSubTitle,
	FormTitle,
	FormTitleBox,
} from "../../styles/styled_components";
import PlaylistAddCard from "./PlaylistAddCard";

const EmptyPlaylist = () => {
	const [isAddOpened, setIsAddOpened] = useState(false);

	const showAddBox = () => setIsAddOpened(true);

	return isAddOpened ? (
		<PlaylistAddCard isOpened={isAddOpened} setIsOpened={setIsAddOpened} />
	) : (
		<FormPage>
			<FormBox>
				<FormTitleBox>
					<FormTitle>You have no playlists</FormTitle>
					<FormSubTitle>Click plus button to create one!</FormSubTitle>
				</FormTitleBox>
				<AnimatedBtn onClick={() => showAddBox()}>
					<TbMusicPlus />
				</AnimatedBtn>
			</FormBox>
		</FormPage>
	);
};

export default EmptyPlaylist;
