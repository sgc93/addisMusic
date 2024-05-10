import styled from "@emotion/styled";
import { BiRefresh } from "react-icons/bi";
import Error from "./Error";

const ErrorBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;

	flex-direction: column;
	padding: 1rem;
	width: 50%;
	text-align: center;
	border-radius: 1rem;

	background-color: var(--color-text-tertiary);
`;
const ErrorImg = styled.img`
	width: 5rem;
	height: 5rem;
	padding-bottom: 1rem;
`;
const ErrorDetail = styled.span`
	color: var(--color-bg-primary);
`;

const RefreshBtn = styled.button`
	display: flex;
	gap: 0.5rem;

	font-size: 1.2rem;
	color: var(--color-bg-primary);
	background-color: var(--color-text-tertiary);

	padding: 0.2rem 0.5rem;
	margin: 1rem;
	border: none;
	border-radius: 0.6rem;
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		background-color: var(--color-text-primary);
	}
`;

const IconStyle = styled.span`
	font-size: 20px;
`;

const FetchError = ({ error, detail }) => {
	return (
		<ErrorBox>
			<ErrorImg src="./loader.svg" />
			<Error errorMessage={error} />
			<ErrorDetail>{detail}</ErrorDetail>
			<RefreshBtn>
				<IconStyle>
					<BiRefresh />
				</IconStyle>
				<span>refresh</span>
			</RefreshBtn>
		</ErrorBox>
	);
};

export default FetchError;
