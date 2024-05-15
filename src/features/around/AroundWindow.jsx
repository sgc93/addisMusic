import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiCheck, BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
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
	justify-content: space-between;
	color: ${(props) =>
		props.isCompleted == "completed"
			? "var(--color-success)"
			: props.isCompleted == "uncompleted"
			? "var(--color-text-error)"
			: "var(--color-bg-primary)"};
	opacity: ${(props) => (props.isCompleted == "loading" ? 0.8 : 1)};
	gap: 0.5rem;
	width: 100%;
	text-align: center;
`;

const StatusTitle = styled.span`
	padding: 0.5rem 1rem 0.5rem 0rem;
	// color: var(--color-bg-primary);
	font-weight: bold;
	opacity: 0.8;
`;

const StatusCondition = styled.span`
	display: flex;
	align-items: center;
	font-size: 25px;
`;

const AroundWindow = () => {
	const [userLoc, setUserLoc] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({});
	const [status, setStatus] = useState([
		{
			title: "Locating user",
			isCompleted: "loading",
		},
	]);
	const [finalStatus, setFinalStatus] = useState();

	const [statusIndex, setStatusIndex] = useState(0);

	useEffect(() => {
		let timeoutId;
		const askUserLoc = async () => {
			setIsLoading(true);
			setError("");
			try {
				const locResponse = await getUserLoc();
				if (locResponse.hasData) {
					updateStatus("completed", 0, "finding user country");
					setUserLoc(locResponse.data);
				} else {
					updateStatus("uncompleted", 0, "unable to locate user");
				}

				const response = await reverseGeoCode(locResponse.data);
				if (response.hasData) {
					updateStatus(
						"completed",
						1,
						`fetching top tracks in ${response.data}`
					);
				} else {
					updateStatus("uncompleted", 1, `unable to find user country.`);
				}

				const tracks = await getTracks(response.data);
				if (tracks.hasData) {
					updateStatus("completed", 2, `done`);
				} else {
					updateStatus(
						"uncompleted",
						2,
						`unable to fetch top tracks in ${response.data}.`
					);
				}
			} catch (newError) {
				setError(newError);
			} finally {
				// setIsLoading(false);
			}
		};

		askUserLoc();
		return () => clearTimeout(timeoutId);
	}, []);

	const updateStatus = (isCurrStatCompleted, currIndex, nextStatusTitle) => {
		setStatus((prevStatus) => [
			...prevStatus
				.map((status, index) =>
					index == currIndex
						? { ...status, isCompleted: isCurrStatCompleted }
						: status
				)
				.concat(
					isCurrStatCompleted != "uncompleted"
						? prevStatus[prevStatus.length - 1].title != nextStatusTitle
							? [
									{
										title: nextStatusTitle,
										isCompleted: "loading",
									},
							  ]
							: []
						: []
				),
		]);

		if (isCurrStatCompleted == "uncompleted")
			setError({
				message: nextStatusTitle,
				detail:
					"Some thing went wrong while doing this specific operation, check you connection and try again!",
			});
	};

	return (
		<AroundWindowBox>
			{isLoading && (
				<>
					<LoaderNote width={50} loadingMessage={"loading..."} />
					{status.map((stat, index) => {
						return (
							<Status key={index} isCompleted={stat.isCompleted}>
								<StatusCondition isCompleted={stat.isCompleted}>
									{stat.isCompleted == "completed" ? (
										<BiCheck />
									) : stat.isCompleted == "uncompleted" ? (
										<GrClose size={18} />
									) : (
										<BsThreeDots />
									)}
								</StatusCondition>
								<StatusTitle>{stat.title} </StatusTitle>
								<StatusCondition>
									{stat.isCompleted == "completed" ? (
										<BiCheckboxChecked />
									) : stat.isCompleted == "uncompleted" ? (
										<BiCheckbox />
									) : (
										<BiCheckbox />
									)}
								</StatusCondition>
							</Status>
						);
					})}
				</>
			)}
			{error && (
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
