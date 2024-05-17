import { TbMusicPlus } from "react-icons/tb";
import {
	AnimatedBtn,
	FormBox,
	FormPage,
	FormSubTitle,
	FormTitle,
	FormTitleBox,
} from "../../styles/styled_components";

const EmptyPlaylist = () => {
	return (
		<FormPage>
			<FormBox>
				<FormTitleBox>
					<FormTitle>You have no playlists</FormTitle>
					<FormSubTitle>Click plus button to create one!</FormSubTitle>
				</FormTitleBox>
				<AnimatedBtn>
					<TbMusicPlus />
				</AnimatedBtn>
			</FormBox>
		</FormPage>
	);
};

export default EmptyPlaylist;
