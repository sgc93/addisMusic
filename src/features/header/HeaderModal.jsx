import styled from "@emotion/styled";
import { BiPhone } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { GrContact } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { TbMusicBolt } from "react-icons/tb";
import { TfiEmail } from "react-icons/tfi";
import IconButton from "../../ui/IconButton";

const ModalWindow = styled.div`
	position: absolute;
	top: 2.7rem;
	left: ${(props) => (props.isAbout ? "26.7%" : "33.5%")};
	display: flex;

	max-height: 50dvh;
`;

const ModalBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 0.7rem;

	background: radial-gradient(var(--color-rad-center), var(--color-rad-outer));
	border: 3px solid var(--color-border-primary);
	border-radius: 1rem;
	max-height: 100%;

	box-shadow: 1rem 1rem 1rem 1rem var(--color-bg-tertiary);
	overflow-y: scroll;
	overflow-x: hidden;
	&::-webkit-scrollbar {
		background-color: transparent;
		width: 12px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-bg-secondary);

		border-radius: 1rem;
	}
`;

const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: calc(100% - 2rem);
	padding: 0.5rem 1rem;
	border-bottom: 1px solid var(--color-border-primary);
`;

const HeaderTitle = styled.span`
	font-size: 1.3rem;
	font-weight: bold;
	color: var(--color-text-secondary);
`;

const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.4rem;
	padding: 1rem;
`;

const BodyText = styled.span`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const BodyTextHeader = styled.span`
	writing-mode: vertical-lr;
	font-size: 1.2rem;
	font-weight: bold;

	color: var(--color-gradient-2);
`;
const BodyTextContent = styled.span`
	font-size: 1.07rem;
	color: var(--color-bg-primary);
`;

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

	margin-top: 1rem;
	font-weight: bold;
	font-size: 1.2rem;
	color: var(--color-bg-primary);
`;

const Feature = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0rem 1rem;
`;

const FeatureTitle = styled.span`
	color: var(--color-bg-4);
	font-weight: bold;
	font-size: large;

	display: flex;
	align-items: center;
	gap: 0.4rem;
`;
const FeatureBody = styled.span`
	font-size: small;
	padding: 0rem 1rem;
	color: var(--color-bg-4);
`;

const Contacts = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	padding: 1rem;
`;
const Contact = styled.a`
	display: flex;
	align-items: center;
	gap: 0.3rem;

	text-decoration: none;
	font-weight: bold;

	transition: all 0.4s;

	&:hover {
		color: var(--color-bg-primary);
	}
`;

const HeaderModal = ({ isAbout, isContact, closeModal }) => {
	return (
		<ModalWindow isAbout={isAbout}>
			<ModalBox>
				<ModalHeader>
					<HeaderTitle>{isAbout ? "About" : "Contact"}</HeaderTitle>
					<IconButton handleClick={() => closeModal()}>
						<MdClose />
					</IconButton>
				</ModalHeader>
				<ModalBody>
					{isAbout && (
						<>
							<BodyText>
								<BodyTextHeader>AddisMusic</BodyTextHeader>
								<BodyTextContent>
									Welcome to AddisMusic, your ultimate destination for a
									seamless music streaming, storage, and playing experience.
									AddisMusic is designed with ease of use in mind, providing
									music enthusiasts with a platform to enjoy their favorite
									tunes effortlessly. Whether you’re storing your personal music
									collection or exploring new tracks, AddisMusic has got you
									covered.
								</BodyTextContent>
							</BodyText>
							<Features>
								<span>Key features:</span>
								{features.map((feature, index) => (
									<Feature key={index}>
										<FeatureTitle>
											<TbMusicBolt />
											{feature.title}
										</FeatureTitle>
										<FeatureBody>{feature.body}</FeatureBody>
									</Feature>
								))}
							</Features>
							<BodyTextContent>
								At AddisMusic, we are committed to enhancing your musical
								journey with features that are both powerful and user-friendly.
								Join us and transform the way you experience music today!
							</BodyTextContent>
						</>
					)}
					{isContact && (
						<>
							<FeatureTitle>
								<GrContact />
								<span>Feel free to contact via:</span>
							</FeatureTitle>
							<Contacts>
								<Contact href="mailto:smachewgedefaw@gmail.com">
									<TfiEmail /> <span>smachewgedefaw@gmail.com</span>
								</Contact>
								<Contact href="call:0989669943">
									{" "}
									<BiPhone /> <span>+2519669943</span>
								</Contact>
								<Contact href="sjdf">
									<BsGithub /> <span>sgc93</span>
								</Contact>
							</Contacts>
						</>
					)}
				</ModalBody>
			</ModalBox>
		</ModalWindow>
	);
};

export default HeaderModal;
