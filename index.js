const geocode = require("./src/geocode");
const weather = require("./src/weather");
const argv = require("yargs")
  .option({
    a: {
      demand: true,
      alias: `address`,
      describe: `Address to fetch weather for`,
      string: true
    }
  })
  .help()
.alias(`help`, `h`).argv;

geocode.geocodeAddress(argv.a, (error, {address, latitude, longitude}) => {
	if (error) {
		console.log(error);
	} else {
		console.log(`Address: ${address}`);
		weather.getWeather(
			latitude,
			longitude,
			(error, {currently, temperature, today, tomorrow, summary}) => {
				if (error) {
					console.log(error);
				} else {
					console.log(`Now: ${currently}`);
					console.log(`Temperature: ${temperature}°C`);
					console.log(`Today: ${today}`);
					console.log(`Tomorrow: ${tomorrow}`);
					console.log(`Summary: ${summary}`);
				}
			}
		)
	}
});
