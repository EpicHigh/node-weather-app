const request = require("request");
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
	.alias(`help`,`h`)
	.argv;

const address = encodeURI(argv.a);
const key = `AIzaSyCU3ZeEV4FUzNia6cltZ2QBE_w-AiWVMDY`;

request(
  {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`,
    json: true
  },
  (error, response, body) => {
  	try {
		  error
			  ? console.log(`${error}`)
			  : response && response.statusCode === 200
			  ? console.log(
				  `Address: ${
					  body.results[0].formatted_address
					  } \nLocation: latitude="${
					  body.results[0].geometry.location.lat
					  }" longitude="${body.results[0].geometry.location.lng}"`
			  )
			  : console.log(`${response.statusCode}: Not found`);
	  } catch (e) {
		  console.log(`Invalid address, pleases type again.`)
	  }
  }
);
