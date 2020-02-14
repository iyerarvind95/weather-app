const request = require("request");

const geocode = (geocode, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(geocode) +
    ".json?access_token=pk.eyJ1IjoiaXllcmFydmluZCIsImEiOiJjazZkNHVrZnoxN2N0M21tZ2F5c2c3MmdkIn0.3XhVq0xS7TdPDShzfnEIjg&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
      console.log("Error");
    } else if (response.body.features.length === 0) {
      callback("Unable to find the location.Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
