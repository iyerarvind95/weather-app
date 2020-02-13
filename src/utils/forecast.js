const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/100f6d8e1389fa02b44592fe74aa1bcd/${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chances of rain`
      );
    }
  });
};

module.exports = forecast;
