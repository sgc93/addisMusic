export const how_many_songs = (songs) => {
	if (songs == 0) {
		return "has no songs yet!";
	} else if (songs > 0) {
		return "1 song";
	} else {
		return `${songs} songs`;
	}
};
