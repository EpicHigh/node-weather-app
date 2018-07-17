const request = require("request");

const geocodeAddress = (address, callback) => {
	const addressEncoded = encodeURI(address);
	const key = `AIzaSyCU3ZeEV4FUzNia6cltZ2QBE_w-AiWVMDY`;
	request(
		{
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${key}`,
			json: true
		},
		(error, response, body) => {
			try {
				error
					? callback(`Unable to connect to Google servers`)
					: response && response.statusCode === 200
					? callback(undefined, {
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng
					})
					: callback(`${response.statusCode}: Not found`);
			} catch (e) {
				callback(`Invalid address, pleases type again.`);
			}
		}
	);
};

module.exports.geocodeAddress = geocodeAddress;
