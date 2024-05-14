import styled from "@emotion/styled";

export const FormPage = styled.section`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;
	backdrop-filter: blur(10px);
	z-index: 2;
`;
export const FormBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 32%;
	padding: 1rem 1rem 3rem 1rem;

	background: radial-gradient(
		var(--color-bg-tertiary),
		var(--color-bg-primary)
	);
	border: 3px solid var(--color-border-primary);
	border-radius: 1rem;
`;
export const FormHeader = styled.div`
	display: flex;
	align-items: start;
	justify-content: space-between;

	width: 20rem;
	padding: 2rem 0rem 1rem 0rem;
`;
export const FormTitleBox = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0rem 0.5rem;

	border-left: 2px solid var(--color-border-primary);
`;

export const FormTitle = styled.span`
	color: var(--color-text-primary);
	font-size: 1.2rem;
	font-weight: bold;
`;

export const FormSubTitle = styled.span`
	color: var(--color-text-tertiary);
	font-size: 1rem;
	opacity: 0.7;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;

	padding-top: 1rem;
`;

export const FormInput = styled.input`
	background-color: var(--color-bg-tertiary);
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

export const FormFileInput = styled.input`
	display: none;
`;
export const FormInputLabel = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: var(--color-bg-tertiary);
	color: var(--color-text-secondary);
	border: none;
	outline: none;
	border-radius: 0.4rem;
	padding: 0.5rem 1rem;

	width: 18rem;

	cursor: pointer;
	transition: all 0.4s;
	&:hover {
		background-color: var(--color-bg-primary);
		color: var(--color-text-primary);
	}
`;

export const LabelIcon = styled.div`
	display: flex;
	align-items: center;
`;

export const formBtnStyle = {
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

	&:hover {
		color: var(--color-bg-primary);
		background-color: var(--color-text-primary);
	}
	&:active {
		opacity: 0.8;
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