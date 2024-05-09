import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { SPOTIFY_API } from "../../config/spotify_credintials";
import Error from "../../ui/Error";
import LoaderNote from "../../ui/LoaderNote";
import MusicCard from "../../ui/MusicCard";
import { timeFormatter } from "../../utils/time_formater";

const ListBox = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem 1rem;
`;
const ListTitle = styled.span`
	align-self: flex-start;
	font-size: 1.3rem;
	font-weight: bold;
	color: var(--color-text-primary);
	padding-bottom: 0.2rem;
	margin: 1rem;
	border-bottom: 2px solid var(--color-border-primary);
`;
const List = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	padding: 1rem;
`;

const LoaderBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;

	height: 20rem;
	width: 16rem;
	border-radius: 1rem;
	background: linear-gradient(to top, var(--color-bg-primary), #0001);
`;

const SongList = () => {
	const [songs, setSongs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				setIsLoading(true);
				setError("");

				const url =
					"https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5";
				const options = {
					method: "GET",
					headers: {
						"X-RapidAPI-Key": SPOTIFY_API,
						"X-RapidAPI-Host": "spotify23.p.rapidapi.com",
					},
				};

				const response = await fetch(url, options);

				if (response.ok) {
					const result = await response.json();
					const tracks = [];
					for (var i = 0; i < result.tracks.items.length; i++) {
						const track = result.tracks.items[i];
						tracks.push({
							id: track?.data?.id,
							name: track?.data?.name,
							artist: track?.data?.artists?.items[0]?.profile?.name,
							duration: timeFormatter(
								Math.floor(track?.data?.duration?.totalMilliseconds / 1000)
							),
							coverArt: track?.data?.albumOfTrack?.coverArt?.sources[0]?.url,
							uri: track?.data?.uri,
						});
					}
					setSongs(tracks);
				} else {
					setError("Unable to fetch data from the server, try again!");
				}
			} catch (error) {
				setError("You have lost you connection, please try again!");
			} finally {
				setIsLoading(false);
			}
		};

		fetchSongs();
	}, []);

	return (
		<ListBox>
			<ListTitle>Selected Top Tracks</ListTitle>
			<List>
				{isLoading &&
					Array.from({ length: 8 }).map((index) => (
						<LoaderBox key={index}>
							<LoaderNote loadingMessage={"fetching ..."} />
						</LoaderBox>
					))}
				{error && <Error errorMessage={error} />}
				{songs &&
					!isLoading &&
					!error &&
					songs.map((song) => <MusicCard key={song?.id} song={song} />)}
			</List>
		</ListBox>
	);
};

export default SongList;
