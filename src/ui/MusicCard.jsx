import styled from "@emotion/styled";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;

	width: 15rem;

	padding: 1rem;
	border-radius: 1rem;
	background: linear-gradient(to top, var(--color-bg-primary), #0001);
`;

const ImgBox = styled.div`
	display: flex;
	align-items: center;
	border-radius: 1rem;
	overflow: hidden;
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

const MusicCard = () => {
	return (
		<Card>
			<ImgBox>
				<img src="./light1.jpg" alt="artist" width={"100%"} height={"100%"} />
			</ImgBox>
			<ArtistName>Al Rophinan 9.</ArtistName>
			<MusicName>የኔ ትውልድ</MusicName>
		</Card>
	);
};

export default MusicCard;
