export const timeFormatter = (duration) => {
	let min = Math.floor(duration / 60);
	let sec = Math.floor(duration % 60);
	if (min < 10) {
		min = `0${min}`;
	}
	if (sec < 10) {
		sec = `0${sec}`;
	}
	return `${min}:${sec}`;
};
