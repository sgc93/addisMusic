import { call, put, takeEvery } from "redux-saga/effects";
import { SPOTIFY_API } from "../../config/spotify_credintials";
import { timeFormatter } from "../../utils/time_formater";

const url =
	"https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5";
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": SPOTIFY_API,
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com",
	},
};

function* loadCategoriesWork() {
	try {
		const response = yield call(fetch, url, options);

		if (response.ok) {
			const result = yield response.json();
			console.log(result);

			const albums = [];
			const artists = [];
			const tracks = [];

			for (var i = 0; i < result.tracks.items.length; i++) {
				const album = result.albums.items[i];
				const artist = result.artists.items[i];
				const track = result.tracks.items[i];
				albums.push({
					name: album?.data?.name,
					artist: album?.data?.artists?.items[0]?.profile?.name,
					year: album?.data?.date?.year,
					coverArt: album?.data?.coverArt?.sources[0]?.url,
					uri: album?.data?.uri,
				});
				artists.push({
					name: artist?.data?.profile?.name,
					avatar: artist?.data?.visuals?.avatarImage?.sources[0]?.url,
					uri: artist?.data?.uri,
				});
				tracks.push({
					id: track?.data?.id,
					name: track?.data?.name,
					artist: track?.data?.artists?.items[0]?.profile?.name,
					duration: timeFormatter(
						Math.floor(track?.data?.duration?.totalMilliseconds / 1000)
					),
					coverArt: track?.data?.albumOfTrack?.coverArt?.sources[0]?.url,
					uri: track?.data?.uri,
				});
			}
			yield put({
				type: "categories/loadCategoriesSuccess",
				payload: {
					albums: albums,
					artists: artists,
					tracks: tracks,
				},
			});
		} else {
			yield put({
				type: "categories/loadCategoriesFailure",
				payload: "Unable to fetch data from the server, try again!",
			});
		}
	} catch (error) {
		yield put({
			type: "categories/loadCategoriesFailure",
			payload: "You have lost you connection, please try again!",
		});
	} finally {
		yield put({
			type: "categories/loadCategoriesEnd",
		});
	}
}

function* categoriesSaga() {
	yield takeEvery("categories/loadCategories", loadCategoriesWork);
}

export default categoriesSaga;
