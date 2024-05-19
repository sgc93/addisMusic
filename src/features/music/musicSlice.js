import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	musicList: [],
	music: null,
	isPaused: false,
	volume: 50,
	currTime: 0,
	duration: 0,
	currMusicIndex: 0,
	touchedIndex: null,
};
const musicSlice = createSlice({
	name: "music",
	initialState,
	reducers: {
		currentMusic(state, action) {
			state.music = action.payload.music;
			state.currTime = action.payload.currTime;
			state.duration = Number(action.payload.duration);
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
		currentMusicList(state, action) {
			state.musicList = action.payload;
		},
		currentMusicIndex(state, action) {
			state.currMusicIndex = action.payload;
		},
		currentMusicTouch(state, action) {
			state.touchedIndex = action.payload;
		},
	},
});

export const {
	currentMusic,
	currentMusicPausePlay,
	currentMusicVolume,
	currentMusicCurrTime,
	currentMusicDuration,
	currentMusicList,
	currentMusicIndex,
	currentMusicTouch,
} = musicSlice.actions;

export default musicSlice.reducer;
