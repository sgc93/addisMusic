import styled from "@emotion/styled";
import { MdRestartAlt } from "react-icons/md";

const ErrorBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.7rem;

	padding-bottom: 1rem;
`;

const ErrorMessage = styled.span`
	color: var(--color-text-error);
	font-weight: 600;
	font-size: 1.3rem;
`;

const TryAgainBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	background-color: var(--color-bg-secondary);
	border: none;
	font-size: 1.2rem;
	color: var(--color-text-secondary);
	padding: 0.2rem 1rem;
	border-radius: 0.3rem;

	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		background-color: var(--color-bg-tertiary);
		color: var(--color-text-primary);
	}
`;

const IconStyle = styled.span`
	font-size: 25px;
`;
const Error = ({ errorMessage, shouldTryAgain, handleClick }) => {
	return (
		<ErrorBox>
			<ErrorMessage>{errorMessage}</ErrorMessage>
			{shouldTryAgain && (
				<TryAgainBtn onClick={handleClick}>
					<IconStyle>
						<MdRestartAlt />
					</IconStyle>
					<span>try again</span>
				</TryAgainBtn>
			)}
		</ErrorBox>
	);
};

export default Error;
