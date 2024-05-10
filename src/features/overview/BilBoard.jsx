import styled from "@emotion/styled";

const BilBoardBox = styled.div`
	height: 14rem;
	border-radius: 0.6rem 0.6rem 0rem 0rem;
	backdrop-filter: blur(4px);
`;

const HeroText = styled.div`
	padding: 3rem 4rem;

	display: flex;
	flex-direction: column;
`;
const HeroTitle = styled.span`
	font-size: 2.7rem;
	font-weight: bold;
	color: var(--color-text-primary);
`;
const HeroSubtitle = styled.span`
	font-size: 1.4rem;
	font-weight: bold;
	color: var(--color-text-tertiary);
`;

const style = {
	backgroundColor: "var(--color-bg-tertiary)",
	backgroundImage: 'url("./light2.jpg")',
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
