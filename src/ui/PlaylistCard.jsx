const PlaylistCard = ({ playlist }) => {
	const { name, createdAt, updatedAt, musics } = playlist;
	return (
		<div>
			<span>{name}</span>
		</div>
	);
};

export default PlaylistCard;
