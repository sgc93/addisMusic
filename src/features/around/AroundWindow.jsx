import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiCheck, BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import FetchError from "../../ui/FetchError";
import LoaderNote from "../../ui/LoaderNote";
import { getUserLoc, reverseGeoCode } from "../../utils/user_location";

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

	const [statusIndex, setStatusIndex] = useState(0);

	useEffect(() => {
		let timeoutId;
		const askUserLoc = async () => {
			setIsLoading(true);
			setError("");
			try {
				const locResponse = await getUserLoc();
				if (locResponse.hasData) {
					updateStatus("completed", "finding user country");
					setUserLoc(locResponse.data);
				} else {
					updateStatus("uncompleted", "finding user country");
				}

				const response = await reverseGeoCode(locResponse.data);
				if (response.hasData) {
					updateStatus("completed", `fetching top tracks in ${response.data}`);
				} else {
					updateStatus("uncompleted", `fetching top tracks in your country.`);
				}

				// const tracks = await getTracks(country);
				// if (tracks) {
				// 	updateStatus("completed", `done`);
				// } else {
				// 	updateStatus("uncompleted", `operation failed, sorry!`);
				// }
				// console.log(tracks);
			} catch (newError) {
				setError(newError.message);
			} finally {
				setIsLoading(false);
			}
		};

		askUserLoc();
		return () => clearTimeout(timeoutId);
	}, []);

	const updateStatus = (isCurrStatCompleted, nextStatusTitle) => {
		setStatus((prevStatus) => {
			console.log(
				"status index: " +
					statusIndex +
					"\n status: " +
					prevStatus[statusIndex].title
			);

			const updatedStatus = prevStatus.map((stat, index) =>
				index === statusIndex
					? { ...stat, isCompleted: isCurrStatCompleted }
					: stat
			);

			return updatedStatus.length === 0 ||
				updatedStatus[updatedStatus.length - 1].title !== nextStatusTitle
				? [...updatedStatus, { title: nextStatusTitle, isCompleted: "loading" }]
				: updatedStatus;
		});

		setStatusIndex((index) => index + 1);
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
			{/* {userLoc && `Your location is lat: ${userLoc.lat}, lng: ${userLoc.lng}`} */}
		</AroundWindowBox>
	);
};

export default AroundWindow;
