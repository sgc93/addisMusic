export const getDuration = (url) => {
	const audio = new Audio(url);
	return audio.duration;
};
