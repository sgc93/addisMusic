import styled from "@emotion/styled";

const MusicBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;

	width: calc(100% - 1rem);

	padding: 0.5rem 1rem;
	background: linear-gradient(to top, var(--color-bg-secondary), #0001);
`;

const ImgBox = styled.div`
	display: flex;
	align-items: center;

	height: 50%;
	width: 50%;

	padding: 3px;
	background: linear-gradient(
		45deg,
		var(--color-gradient-1),
		var(--color-gradient-2),
		var(--color-gradient-3)
	);
	border-radius: 100%;
`;

const ArtistName = styled.span`
	font-family: "Caveat", cursive;
	font-weight: 600;
	font-size: 1.6rem;
	color: var(--color-text-secondary);
`;

const MusicName = styled.span`
	width: 100%;
	height: 2rem;
	font-weight: 100;
	font-size: 1rem;
	color: var(--color-text-secondary);
	text-align: center;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const PlayedMusic = () => {
	return (
		<MusicBox>
			<ImgBox>
				<img src="./logo.png" alt="artist" width={"100%"} height={"100%"} />
			</ImgBox>
			<ArtistName>Sew Sealiw S.</ArtistName>
			<MusicName>I have a meeting with God</MusicName>
		</MusicBox>
	);
};

export default PlayedMusic;
