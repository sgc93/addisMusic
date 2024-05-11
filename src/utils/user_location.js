export const getUserLoc = () => {
	return new Promise((resolve, reject) => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					var latitude = position.coords.latitude;
					var longitude = position.coords.longitude;
					resolve({ lat: latitude, lng: longitude });
				},
				(error) => {
					// reject(error.message);
					reject({
						message: error.message,
						detail:
							"Unable to locate user because of location access denial, please permit the access and try again!",
						statusIndex: 0,
						nextStatus: "finding your country",
					});
				}
			);
		} else {
			reject("You browser doesn't support geoloacation, sorry!");
			// reject({
			// 	message: "You browser doesn't support geoloacation, sorry!",
			// 	statusIndex: 0,
			// 	nextStatus: "finding your country",
			// });
		}
	});
};
const api_key = "385156798584904297315x10176";
export const reverseGeoCode = async (coords) => {
	const url = `https://geocode.xyz/${coords.lat},${coords.lng}?geoit=json&auth=${api_key}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.country;
	} catch (error) {
		return {
			message: "unable to decode you location, try again!",
			statusIndex: 1,
			nextStatus: "fetching top tracks in --",
		};
	}
};

export const getTracks = async (country_code) => {
	const url = `https://shazam-api6.p.rapidapi.com/shazam/top_tracks_country?${country_code}=UZ&limit=10`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "e0eb433222mshe94ff72b7e662b9p1c4f14jsn6b4e63be9c85",
			"X-RapidAPI-Host": "shazam-api6.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
	} catch (error) {
		return {
			message: "Unable to fetch tracks, try again!",
			statusIndex: 1,
			nextStatus: "fetching top tracks in --",
		};
	}
};
