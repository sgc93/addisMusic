import styled from "@emotion/styled";

const BilBoardBox = styled.div`
	width: calc(100 - 2rem);
	height: calc(50% - 2rem);

	border: 2px solid var(--color-border-primary);
	border-radius: 0.6rem;
`;

const HeroText = styled.div`
	padding: 3rem 4rem;

	display: flex;
	flex-direction: column;
`;
const HeroTitle = styled.span`
	font-size: 2.7rem;
	font-weight: bold;
	color: var(--color-bg-primary);
`;
const HeroSubtitle = styled.span`
	font-size: 1.4rem;
	font-weight: bold;
	color: #0009;
`;

const style = {
	backgroundColor: "var(--color-text-tertiary)",
	backgroundImage: 'url("./note2.jpg")',
	backgroundPosition: "center",
	backgroundSize: "cover",
};

const BillBoard = () => {
	return (
		<BilBoardBox style={style}>
			<HeroText>
				<HeroTitle>Real message from real feeling!</HeroTitle>
				<HeroSubtitle>
					Explore astounding songs, well managed information and enjoy by a
					sound of mature lyrics.
				</HeroSubtitle>
			</HeroText>
		</BilBoardBox>
	);
};

export default BillBoard;
