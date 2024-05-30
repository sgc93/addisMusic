import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playlistUpdateClose } from "../features/playlists/playlistSlice";

export const useClearUpdateState = (closePopup) => {
	const { isUpdated } = useSelector((state) => state.playlist);
	const dispatch = useDispatch();

	useEffect(() => {
		let timeoutId;
		if (isUpdated) {
			timeoutId = setTimeout(() => {
				closePopup();
				dispatch(playlistUpdateClose());
			}, 1500);
		}
		return () => clearTimeout(timeoutId);
	}, [isUpdated]);
};
