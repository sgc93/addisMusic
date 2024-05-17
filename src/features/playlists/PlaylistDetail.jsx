import styled from "@emotion/styled";
import { BiArrowBack } from "react-icons/bi";
import IconButton from "../../ui/IconButton";

const DetailBox = styled.section`
	display: flex;
	flex-direction: column;
	gap: 0.7rem;

	width: 100%;
	height: 100%;
`;
const DetailHeader = styled.div`
	display: flex;
	width: 100%;
	height: 40%;
`;

const DetailContent = styled.div`
	width: 100%;
`;

const PlaylistDetail = ({ playlist, setIsDetailing }) => {
	const { name, createdAt, updatedAt, musics } = playlist;

	const backToPlaylists = () => setIsDetailing(false);

	return (
		<DetailBox>
			<DetailHeader>
				<IconButton handleClick={() => backToPlaylists()}>
					<BiArrowBack />
				</IconButton>
			</DetailHeader>
			<DetailContent>this is the content of the detail</DetailContent>
		</DetailBox>
	);
};

export default PlaylistDetail;
