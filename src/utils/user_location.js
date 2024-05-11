export const getUserLoc = () => {
	return new Promise((resolve, reject) => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					var latitude = position.coords.latitude;
					var longitude = position.coords.longitude;
					resolve({ lat: latitude, lng: longitude });
				},
				() => {
					reject("Unable to fine you location, please try again!");
				}
			);
		} else {
			reject("You browser doesn'nt support geoloacation, sorry!");
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
		console.log(error);
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
		console.error(error);
	}
};
