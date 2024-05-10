import styled from "@emotion/styled";

const MusicBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	height: 4rem;
	margin: 0.5rem 1rem 0.5rem 1rem;
	border-right: 1px solid var(--color-border-primary);
`;

const MusicImg = styled.img`
	display: flex;
	align-items: center;
	height: 3.5rem;
	width: 3.5rem;
	padding: 3px;
	background: linear-gradient(
		45deg,
		var(--color-gradient-1),
		var(--color-gradient-2),
		var(--color-gradient-3)
	);
	border-radius: 100%;
`;

const MusicData = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.1rem;
`;

const ArtistName = styled.span`
	font-family: "Caveat", cursive;
	font-size: 1.5rem;
	color: var(--color-text-secondary);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const MusicName = styled.span`
	width: 15rem;
	height: 2rem;
	font-size: 1rem;
	color: var(--color-text-tertiary);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const PlayedMusic = () => {
	return (
		<MusicBox>
			<MusicImg src="./logo.png" alt="artist" />
			<MusicData>
				<ArtistName>Sew Sealiw S.</ArtistName>
				<MusicName>I have a meeting with God</MusicName>
			</MusicData>
		</MusicBox>
	);
};

export default PlayedMusic;
