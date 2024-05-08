import styled from "@emotion/styled";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { auth } from "../../config/firebase_config";

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
	// background-color: transparent;
	background-color: var(--color-bg-secondary);
	border-radius: 1rem;

	cursor: pointer;
	transition: all 0.4s;

	&:hover {
		background-color: var(--color-bg-secondary);
	}
`;

const ProfileBox = styled.div`
	position: absolute;
	top: -1.2rem;
	right: 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	padding: 1rem;

	width: 10rem;
	background-color: var(--color-bg-primary);
	border-radius: 1rem;

	z-index: 1;
`;

const Email = styled.span`
	color: var(--color-text-tertiary);
`;

const PpImg = styled.img`
	border-radius: 100%;
`;

const CloseBtn = styled.span`
	align-self: flex-end;
	font-size: 1.3rem;
	color: var(--color-text-secondary);

	cursor: pointer;
	transition: 0.3s;

	&:hover {
		color: var(--color-text-primary);
	}
`;

const LogOutBtn = styled.button`
	background-color: var(--color-text-secondary);
	color: var(--color-bg-primary);
	border: none;
	border-radius: 0.6rem;

	padding: 0.5rem 1rem;
	margin-top: 0.5rem;
	font-size: 1rem;
	font-weight: 600;

	cursor: pointer;
	transition: 0.4s;

	&:hover {
		background-color: var(--color-text-primary);
	}
`;

const iconUrl = "./logo.png";

const Account = ({ user }) => {
	const [isOpened, setIsOpened] = useState(false);

	const openProfile = () => setIsOpened(true);
	const closeProfile = () => setIsOpened(false);
	const logOut = () => signOut(auth);

	return (
		<UserBox>
			{isOpened ? (
				<ProfileBox>
					<CloseBtn onClick={() => closeProfile()}>
						<IoCloseCircle />
					</CloseBtn>
					<PpImg
						src={user.photoURL ? user.photoURL : iconUrl}
						alt="pp"
						width={70}
					/>
					<Email>{user.displayName ? user.displayName : user.email}</Email>
					<LogOutBtn onClick={() => logOut()}>Log Out</LogOutBtn>
				</ProfileBox>
			) : (
				<AccountBox onClick={() => openProfile()}>
					<Email>{user.displayName ? user.displayName : user.email}</Email>
					<PpImg
						src={user.photoURL ? user.photoURL : iconUrl}
						alt="pp"
						width={30}
					/>
				</AccountBox>
			)}
		</UserBox>
	);
};

export default Account;
