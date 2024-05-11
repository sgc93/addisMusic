import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
	getTracks,
	getUserLoc,
	reverseGeoCode,
} from "../../utils/user_location";

const AroundWindowBox = styled.section`
	width: 22rem;
	height: 15rem;
    border: radius
	background-color: var(--color-text-primary);
	backdrop-filter: blur(4rem);
`;

const AroundWindow = () => {
	const [userLoc, setUserLoc] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [status, setStatus] = useState("locating you");

	useEffect(() => {
		const askUserLoc = async () => {
			setIsLoading(true);
			try {
				const coords = await getUserLoc();
				console.log(coords);
				setUserLoc(coords);
				const data = await reverseGeoCode(coords);
				const tacks = await getTracks(data);
				console.log(tacks);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		askUserLoc();
	}, []);

	return (
		<AroundWindowBox>
			{userLoc && `Your location is lat: ${userLoc.lat}, lng: ${userLoc.lng}`}
		</AroundWindowBox>
	);
};

export default AroundWindow;
