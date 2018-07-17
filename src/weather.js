const request = require("request");

const getWeather = (latitude, longitude, callback) => {
	const key = `781830a32443493ba551b19721902ba6`;
	request(
		{
			url: `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`,
			json: true
		},
		(error, response, body) => {
			try {
				error
					? callback(`Unable to connect to Darksky servers`)
					: response && response.statusCode === 200
					? callback(undefined, {
						currently: body.currently.summary,
						temperature: Math.floor((body.currently.temperature - 32) / (9 / 5)),
						today: body.daily.data[0].summary,
						tomorrow: body.daily.data[1].summary,
						summary: body.daily.summary
					})
					: callback(`Unable to fetch weather`);
			} catch (e) {
				callback(`Invalid location, pleases type again.`);
			}
		}
	);
};

module.exports.getWeather = getWeather;