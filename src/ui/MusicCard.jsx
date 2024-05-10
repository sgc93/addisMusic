import styled from "@emotion/styled";
import { useState } from "react";
import { BiPlay } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { GoHeart } from "react-icons/go";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;

	width: 16rem;
	border-radius: 1rem;
	background: linear-gradient(to top, var(--color-bg-primary), #0001);
`;

const ImgBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	border-radius: 1rem 1rem 0rem 0rem;
	overflow: hidden;
`;

const ArtistName = styled.span`
	font-family: "Caveat", cursive;
	font-weight: 600;
	font-size: 1.6rem;
	padding: 0.5rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: var(--color-text-secondary);
`;

const MusicName = styled.span`
	width: 100%;
	height: 2rem;
	width: 14rem;
	font-weight: 100;
	font-size: 1rem;
	padding: 0rem 0.5rem 0.5rem;
	color: var(--color-text-tertiary);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const BtnBox = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: end;

	height: 5.5rem;
`;

const BtnList = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	padding: 0.3rem 1rem;
	margin: 0.2rem;
	border-radius: 0.6rem;
	background-color: var(--color-bg-tertiary);
`;
const BtnText = styled.span`
	padding: 0.4rem 1rem;
	border-radius: 2rem;
	color: var(--color-text-primary);
	background-color: var(--color-bg-primary);
`;
const Btn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.1rem;
	height: 2.1rem;

	font-size: 1.5rem;
	border: none;
	border-radius: 50%;
	padding: 0.3rem;
	background-color: var(--color-rad-center);
	color: var(--color-bg-primary);
	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		background-color: var(--color-text-primary);
	}
`;

const MusicCard = ({ song }) => {
	const [hint, setHint] = useState("");

	const handlePlay = () => {
		window.open(song.uri);
	};
	const addToFavorite = () => {
		window.open(song.uri);
	};
	const addToSongs = () => {
		window.open(song.uri);
	};

	return (
		<Card>
			<ImgBox>
				<BtnBox>
					{hint && <BtnText>{hint}</BtnText>}
					<BtnList>
						<Btn
							onClick={() => addToFavorite()}
							onMouseEnter={() => setHint("add to favorites")}
							onMouseLeave={() => setHint("")}
						>
							<GoHeart color="red" />
						</Btn>
						<Btn
							onClick={() => addToSongs()}
							onMouseEnter={() => setHint("add to you songs")}
							onMouseLeave={() => setHint("")}
						>
							<CgAdd />
						</Btn>
						<Btn
							onClick={() => handlePlay()}
							onMouseEnter={() => setHint("play")}
							onMouseLeave={() => setHint("")}
						>
							<BiPlay />
						</Btn>
					</BtnList>
				</BtnBox>
				<img
					src={song.coverArt}
					alt="cover-art"
					width={"100%"}
					height={"100%"}
				/>
			</ImgBox>
			<ArtistName>{song.artist}</ArtistName>
			<MusicName>{song.name}</MusicName>
		</Card>
	);
};

export default MusicCard;
