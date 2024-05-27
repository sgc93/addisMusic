import { timeFormatter } from "./time_formater";

export const how_many_songs = (songs) => {
	if (songs == 0) {
		return "has no songs yet!";
	} else if (songs == 1) {
		return "1 song";
	} else {
		return `${songs} songs`;
	}
};

export const playlist_summarizer = (playlist) => {
	const { musics } = playlist;
	const folders = [];
	const artists = [];
	const favorites = [];
	let total_duration = 0;

	musics.forEach((music) => {
		// duration
		total_duration += music.duration;

		// favorite musics
		if (music.isFavorite) {
			favorites.push(music);
		}

		// folder by artist
		if (folders.length > 0) {
			let isThereBefore = {};
			folders.forEach((folder) => {
				if (folder.artist === music.artist) {
					isThereBefore = {
						isIt: true,
						folder: folder,
					};
				}
			});

			if (isThereBefore.isIt) {
				const { folder } = isThereBefore;
				folders[folders.indexOf(folder)].musics.push(music);
			} else {
				artists.push(music.artist);
				folders.push({
					artist: music.artist,
					musics: [music],
				});
			}
		} else {
			artists.push(music.artist);
			folders.push({
				artist: music.artist,
				musics: [music],
			});
		}
	});

	return {
		artists: artists,
		favorites: favorites,
		folders: folders,
		isFolderable: folders.length > 0,
		totalDuration: timeFormatter(total_duration),
	};
};
