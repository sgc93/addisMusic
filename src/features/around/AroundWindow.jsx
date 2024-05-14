import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiCheck, BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import FetchError from "../../ui/FetchError";
import LoaderNote from "../../ui/LoaderNote";
import {
	getTracks,
	getUserLoc,
	reverseGeoCode,
} from "../../utils/user_location";

const AroundWindowBox = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 0.5rem 1rem;
    border: radius
	background-color: var(--color-text-primary);
`;

const Title = styled.span`
	font-size: 1.1rem;
	font-weight: bold;
	opacity: 0.5;
`;

const Status = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const StatusTitle = styled.span`
	padding: 0.5rem 1rem 0.5rem 0rem;
	color: var(--color-bg-primary);
	font-weight: bold;
	opacity: 0.8;
`;

const StatusCondition = styled.span`
	display: flex;
	align-items: center;
	font-size: 25px;

	color: ${(props) =>
		props.isCompleted ? "var(--color-success)" : "var(--color-bg-tertiary)"};
`;

const AroundWindow = () => {
	const [userLoc, setUserLoc] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({});
	const [status, setStatus] = useState([
		{
			title: "locating user",
			isCompleted: false,
		},
	]);

	const [statusIndex, setStatusIndex] = useState(0);

	useEffect(() => {
		const askUserLoc = async () => {
			setIsLoading(true);
			setError("");
			try {
				const cords = await getUserLoc();
				if (cords.lat) {
					updateStatus(true, "finding user country");
				}
				console.log(cords);
				setUserLoc(cords);
				const country = await reverseGeoCode(cords);
				if (country) {
					updateStatus(true, `fetching top tracks in ${country}`);
				}
				const tracks = await getTracks(country);
				if (tracks.items.length) {
					updateStatus(true, `done`);
				}
				console.log(tracks);
			} catch (newError) {
				console.log(newError);
				setError((error) => newError);
			} finally {
				setIsLoading(false);
			}
		};

		askUserLoc();
	}, []);

	const updateStatus = (completed, nextStatusTitle) => {
		setStatus((status) =>
			[...status, (status[statusIndex].isCompleted = completed)].push({
				title: nextStatusTitle,
				isCompleted: false,
			})
		);
		setStatusIndex((statusIndex) => statusIndex + 1);
	};

	return (
		<AroundWindowBox>
			{isLoading && (
				<>
					<LoaderNote width={50} loadingMessage={"loading..."} />
					<Status>
						<StatusCondition isCompleted={status[statusIndex].isCompleted}>
							{status[statusIndex].isCompleted ? <BiCheck /> : <BsThreeDots />}
						</StatusCondition>
						<StatusTitle>{status[statusIndex].title} </StatusTitle>
						<StatusCondition isCompleted={status[statusIndex].isCompleted}>
							{status[statusIndex].isCompleted ? (
								<BiCheckboxChecked />
							) : (
								<BiCheckbox />
							)}
						</StatusCondition>
					</Status>
				</>
			)}
			{error.message && (
				<FetchError
					error={error.message}
					detail={error.detail}
					width={"100%"}
				/>
			)}
			{userLoc && `Your location is lat: ${userLoc.lat}, lng: ${userLoc.lng}`}
		</AroundWindowBox>
	);
};

export default AroundWindow;
