const PlaylistDetail = ({ playlist }) => {
	const { name, createdAt, updatedAt, musics } = playlist;
	return <div>{name}</div>;
};

export default PlaylistDetail;
