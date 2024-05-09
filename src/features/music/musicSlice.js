import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	music: null,
	isPaused: false,
	volume: 50,
	currTime: 0,
	duration: 0,
};
const musicSlice = createSlice({
	name: "music",
	initialState,
	reducers: {
		currentMusic(state, action) {
			console.log(action.payload);
			state.music = action.payload.music;
			state.currTime = action.payload.currTime;
			state.duration = state.payload.duration;
		},
		currentMusicPausePlay(state, action) {
			state.isPaused = action.payload;
		},
		currentMusicVolume(state, action) {
			state.volume = action.payload;
		},
		currentMusicCurrTime(state, action) {
			state.currTime = action.payload;
		},
		currentMusicDuration(state, action) {
			state.duration = action.payload;
		},
	},
});

export const {
	currentMusic,
	currentMusicPausePlay,
	currentMusicVolume,
	currentMusicCurrTime,
	currentMusicDuration,
} = musicSlice.actions;

export default musicSlice.reducer;
