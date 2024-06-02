import styled from "@emotion/styled";
import { MdClose } from "react-icons/md";
import IconButton from "../../ui/IconButton";
import { AuthHeader, SubTitle, Title, TitleBox } from "../auth/Components";

const ModalWindow = styled.div`
	position: absolute;
	top: 2.7rem;
	left: ${(props) => (props.isAbout ? "26.7%" : "40%")};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ModalBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 0.7rem;

	background: radial-gradient(var(--color-rad-center), var(--color-rad-outer));
	border: 3px solid var(--color-border-primary);
	border-radius: 1rem;
`;

const ModalBody = styled.div``;

const features = [
	{
		title: "Authentication and Authorization Secure Sign-In and Sign-Out",
		body: "We prioritize your security. Sign in to access your personalized music experience and sign out when you’re done, knowing your data is safe.",
	},
	{
		title: "Personalized Playlists Create and Modify Your Own Playlists",
		body: "With AddisMusic, you have complete control over your music playlists. Only you can modify them, ensuring your collection remains uniquely yours.",
	},
	{
		title: "Local Storage Music Playback Play Multiple Music Files",
		body: "Easily access and play music files from your local storage. AddisMusic seamlessly integrates with your device, making your personal music library readily available.",
	},
	{
		title: "Access to Public Songs Discover and Add Public Songs",
		body: "Explore a vast library of public songs. Listen to new tracks and add them to your personal collection with just a click.",
	},
	{
		title: "Music Downloads Download Your Favorite Tracks",
		body: "Whether from public collections or your personalized playlists, download your favorite songs to enjoy offline anytime, anywhere.",
	},
	{
		title: "Top Charts Integration Stay Updated with Top 10 Lists",
		body: "AddisMusic keeps you in the loop with the latest trends. Check out the top 10 songs, artists, and albums based on Spotify’s charts and stay ahead of the music curve.",
	},
];

const Features = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
const Feature = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-top: 1rem;
`;
const FeatureTitle = styled.span`
	color: var(--color-bg-primary);
	font-weight: bold;
	font-size: 1.2rem;
`;
const FeatureBody = styled.span``;

const HeaderModal = ({ isAbout, isContact, isLike, closeModal }) => {
	return (
		<ModalWindow isAbout={isAbout}>
			<ModalBox>
				<AuthHeader>
					<TitleBox>
						<Title>{isAbout ? "About" : "Contact"}</Title>
						<SubTitle>
							{isAbout
								? "it is important to know the intension of what we are looking intensionally!"
								: "feel free to contact for good reasons!"}
						</SubTitle>
					</TitleBox>
					<IconButton handleClick={() => closeModal()}>
						<MdClose />
					</IconButton>
				</AuthHeader>
				<ModalBody>
					<span>
						Welcome to AddisMusic, your ultimate destination for a seamless
						music streaming, storage, and playing experience. <br /> AddisMusic
						is designed with ease of use in mind, providing music enthusiasts
						with a platform to enjoy their favorite tunes effortlessly. Whether
						you’re storing your personal music collection or exploring new
						tracks, AddisMusic has got you covered.
					</span>
					<Features>
						{features.map((feature, index) => (
							<Feature key={index}>
								<FeatureTitle>{feature.title}</FeatureTitle>
								<FeatureBody>{feature.body}</FeatureBody>
							</Feature>
						))}
					</Features>
					<span>
						At AddisMusic, we are committed to enhancing your musical journey
						with features that are both powerful and user-friendly. Join us and
						transform the way you experience music today!
					</span>
				</ModalBody>
			</ModalBox>
		</ModalWindow>
	);
};

export default HeaderModal;
