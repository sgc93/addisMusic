import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "authUser",
	initialState: { user: null },
	reducers: {
		authUserSet(state, action) {
			state.user = action.payload;
		},
	},
});

export const { authUserSet } = authSlice.actions;
export default authSlice.reducer;
