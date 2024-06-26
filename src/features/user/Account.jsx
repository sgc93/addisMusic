import styled from "@emotion/styled";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase_config";
import Error from "../../ui/Error";
import FetchError from "../../ui/FetchError";
import IconButton from "../../ui/IconButton";
import LoaderNote from "../../ui/LoaderNote";
import { authUserSet } from "../auth/authSlice";
import {
	checkSignInReset,
	checkSignInResetSuccess,
} from "../auth/singIn/signInSlice";

const UserBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;

const AccountBox = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 1rem;
	background-color: transparent;
	border-radius: 1rem;

	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		background-color: var(--color-bg-tertiary);
	}
`;

const ProfileBox = styled.div`
	position: absolute;
	top: -1.2rem;
	right: 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	padding: 0.7rem 1.5rem 2rem;

	max-width: 20rem;
	min-width: 15rem;
	min-height: 16rem;
	background-color: var(--color-bg-primary);
	border-radius: 1rem;

	z-index: 779;
`;

const Part = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	width: 100%;
	padding-bottom: 0.2rem;
	border-bottom: 1px solid var(--color-border-primary);
`;

const Email = styled.span`
	color: var(--color-text-tertiary);

	width: 100%;
	text-align: center;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const PpImg = styled.img`
	border-radius: 100%;
`;

const CloseBtn = styled.span`
	align-self: flex-end;
`;

const ActionBox = styled.div`
	display: flex;
	// flex-direction: column;
	align-items: center;
	gap: 0.7rem;
`;

const Title = styled.span`
	font-size: small;
	color: var(--color-text-tertiary);
`;

const style = {
	fontWeight: "bold",
	fontSize: "1rem",
	border: "none",
	borderRadius: "0.4rem",

	cursor: "pointer",
	transition: "0.4s",
	width: "8rem",
	padding: "0.4rem 0.5rem",
};

const LogOutBtn = styled.button`
	background-color: var(--color-text-secondary);
	color: var(--color-bg-primary);
	opacity: 0.8;

	&:hover {
		opacity: 1;
	}
	&:active {
		opacity: 0.4;
	}
`;

const ResetBtn = styled.button`
	background-color: var(--color-text-error);
	color: var(--color-text-primary);
	opacity: 0.8;

	&:hover {
		opacity: 1;
	}
	&:active {
		opacity: 0.4;
	}
`;

const SuccessMessage = styled.span`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	background-color: var(--color-bg-secondary);
	color: var(--color-text-success);
	padding: 0.3rem 0.5rem;
	text-align: center;
	border-radius: 0.6rem;
`;

const iconUrl = "./logo.png";

const PassResetBox = styled.div`
	position: absolute;
	top: -1.2rem;
	right: 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	padding: 0.7rem 1.5rem 2rem;

	max-width: 20rem;
	min-width: 15rem;
	background-color: var(--color-bg-primary);
	border-radius: 1rem;

	z-index: 800;
`;

const ResetPart = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	width: 100%;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid var(--color-border-primary);
`;
const ResetEmail = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	font-size: small;
	color: var(--color-text-tertiary);
`;

const ErrorBox = styled.div`
	display: flex;
	align-items: center;
	background-color: var(--color-text-secondary);
	padding: 1rem;
	border-radius: 0.5rem;
`;

const Account = ({ user }) => {
	const [isOpened, setIsOpened] = useState(false);
	const { email, displayName, photoURL } = user;
	const { isLoading, error, isResetSuccess, isResetting } = useSelector(
		(state) => state.signInCheck
	);
	const navigateTo = useNavigate();
	const location = useLocation();
	const pathName = location.pathname;
	const dispatch = useDispatch();

	useEffect(() => {
		let timeoutId;
		if (error || isResetSuccess) {
			timeoutId = setTimeout(() => {
				dispatch(checkSignInResetSuccess(false));
			}, 6000);
		}

		return () => clearTimeout(timeoutId);
	}, [error, isResetSuccess]);

	const openProfile = () => setIsOpened(true);
	const closeProfile = () => setIsOpened(false);
	const logOut = () => {
		if (
			pathName == "/playlists" ||
			pathName == "/favorites" ||
			pathName == "/songs"
		) {
			navigateTo("/");
		}
		dispatch(authUserSet(null));
		signOut(auth);
	};

	const resetPassword = () => {
		dispatch(checkSignInReset(email));
	};

	const closeResetBox = () => {
		dispatch(checkSignInResetSuccess(false));
	};

	return (
		<UserBox>
			{isResetting && (
				<PassResetBox>
					<CloseBtn>
						<IconButton handleClick={() => closeResetBox()}>
							<MdClose />
						</IconButton>
					</CloseBtn>
					<ResetPart>
						<PpImg src={photoURL ? photoURL : iconUrl} width={40} />
						<ResetEmail>
							<span>resetting password of email</span>
							<span style={{ color: "var(--color-text-primary)" }}>
								{email}
							</span>
						</ResetEmail>
					</ResetPart>

					{isLoading && (
						<LoaderNote loadingMessage={"sending reset email ..."} width={70} />
					)}
					{error && (
						<ErrorBox>
							<Error
								errorMessage={error}
								shouldTryAgain={true}
								handleClick={() => resetPassword()}
							/>
						</ErrorBox>
					)}
					{isResetSuccess && (
						<SuccessMessage>
							<BiCheck color="var(--color-text-success)" size={30} />
							<span>Reset email is sent to {email}, check your inbox!</span>
						</SuccessMessage>
					)}
				</PassResetBox>
			)}
			{isOpened && !isResetting && (
				<ProfileBox>
					<CloseBtn>
						<IconButton handleClick={() => closeProfile()}>
							<MdClose />
						</IconButton>
					</CloseBtn>
					<Part>
						<PpImg src={photoURL ? photoURL : iconUrl} width={70} />
						<Email>{displayName ? displayName : email}</Email>
					</Part>

					{isLoading && (
						<LoaderNote loadingMessage={"sending reset email ..."} />
					)}
					{error && (
						<FetchError
							error={error}
							width={"10rem"}
							ImgHeight={"3rem"}
							tryAgain={() => resetPassword()}
						/>
					)}
					{!isLoading && !error && (
						<>
							<ActionBox>
								<Title>Do you want to sign out temporarily?</Title>
								<LogOutBtn style={style} onClick={() => logOut()}>
									Log Out
								</LogOutBtn>
							</ActionBox>
							<ActionBox>
								<Title>Do you want to reset your password?</Title>
								<ResetBtn style={style} onClick={() => resetPassword()}>
									Reset
								</ResetBtn>
							</ActionBox>
						</>
					)}
				</ProfileBox>
			)}

			{!isResetting && !isOpened && (
				<AccountBox onClick={() => openProfile()}>
					<Email>{displayName ? displayName : email}</Email>
					<PpImg src={photoURL ? photoURL : iconUrl} width={30} />
				</AccountBox>
			)}
		</UserBox>
	);
};

export default Account;
