import styled from "@emotion/styled";

export const AuthPage = styled.section`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100dvw;
	height: 100dvh;
	backdrop-filter: blur(10px);
	z-index: 788;
`;
export const AuthBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 1rem 1rem 3rem 1rem;

	background: radial-gradient(
		var(--color-rad-center2),
		var(--color-rad-outer2)
	);
	border: 3px solid var(--color-border-primary);
	border-radius: 1rem;
`;
export const AuthHeader = styled.div`
	align-self: flex-start;
	display: flex;
	align-items: start;
	justify-content: space-between;
	padding: 2rem 2rem;
	margin-bottom: 2rem;
	width: 93%;
`;
export const TitleBox = styled.div`
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	padding: 0rem 0.5rem;

	border-left: 2px solid var(--color-border-primary);
`;

export const Title = styled.span`
	color: var(--color-text-primary);
	font-size: 1.6rem;
	font-weight: bold;
`;

export const SubTitle = styled.span`
	color: var(--color-text-tertiary);
	font-size: 1.2rem;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;
`;

export const FormInput = styled.input`
	background-color: var(--color-bg-secondary);
	border: none;
	outline: none;
	border-radius: 0.4rem;
	padding: 0.5rem 1rem;

	width: 18rem;
	font-size: 1.3rem;
	color: var(--color-text-secondary);

	transition: all 0.4s;
	&:focus {
		outline: 2px solid var(--color-border-primary);
	}
	&::placeholder {
		color: var(--color-text-tertiary);
		font-size: 1rem;
	}
`;

export const btnStyles = {
	margin: "0.3rem 0rem",
	padding: "0.5rem 2rem",
	fontSize: "1.3rem",
	borderRadius: "0.4rem",
	outline: "none",
	border: "none",
	cursor: "pointer",
	transition: "all 0.4s",
	width: "20rem",
};

export const FormBtn = styled.button`
	color: var(--color-text-primary);
	background-color: var(--color-bg-primary);
	opacity: 0.8;

	&:hover {
		opacity: 1;
	}
	&:active {
		opacity: 0.8;
	}
`;

export const GoogleBtn = styled.button`
	color: var(--color-bg-primary);
	background-color: var(--color-text-secondary);
	font-weight: 600;

	display: flex;
	align-items: center;
	gap: 0.9rem;

	&:hover {
		background-color: var(--color-text-primary);
	}
	&:active {
		background-color: var(--color-text-secondary);
	}
`;
export const OrDiv = styled.div`
	width: 20rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const H4 = styled.span`
	width: 10%;
	padding: 0.5rem 1rem;
	color: var(--color-text-secondary);
	font-size: 1.2rem;
`;

export const Line = styled.span`
	height: 2px;
	width: calc(45% - 0.5rem);
	border-radius: 1rem;
	background-color: var(--color-bg-secondary);
`;

export const AuthPageToggler = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.7rem;

	padding: 1rem;
	width: 20rem;
`;
export const TogglerText = styled.span`
	font-size: 1.2rem;
	font-weight: thin;
	color: var(--color-bg-primary);
`;
export const TogglerBtn = styled.button`
	padding: 0.4rem 1rem;
	background-color: var(--color-bg-primary);
	color: var(--color-text-primary);
	font-weight: bold;
	font-size: 1rem;
	border: none;
	border-radius: 0.4rem;

	cursor: pointer;
	transition: 0.4s;

	opacity: 0.7;

	&:hover {
		opacity: 1;
	}
	&:active {
		opacity: 0.4;
	}
`;
