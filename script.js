// GET GEOLOCATION
function getLocation() {
//   if ("geolocation" in navigator) {
//   navigator.geolocation.getCurrentPosition(
//   // success callback
//     function(position) {
//     lat = position.coords.latitude;
//     long = position.coords.longitude;
//     // create current conditions URL
//     weatherURL = "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=831f9a0e76c47eb878b49f28785cd20b";
//     // create forecast URL
//     forecastURL = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&APPID=831f9a0e76c47eb878b49f28785cd20b";
//   },
// // error callback
// alert("Your location cannot be detected.  Please enter a valid U.S. postal code to continue.")
// );
//   }
//   else {
//     // Prompt for zip
//   }
// temp
weatherURL = "http://api.openweathermap.org/data/2.5/weather?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b";
hourlyURL = "http://api.openweathermap.org/data/2.5/forecast?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b";
  // Send URLs to getJSON
  getWeather(weatherURL, forecastURL);
}

// GET ZIPCODE
function getZip() {

}

// FETCH CURRENT CONDITIONS URL
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
// api.openweathermap.org/data/2.5/weather?zip=94040,us

// FETCH HOURLY FORECAST URL
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}

/*
### Day/Night:
- Current time
- Local sunrise/sunset

### Current weather conditions:
- Temp
weatherData.main.temp
- Conditions
weatherData.weather.id (code)
weatherData.weather.main (e.g. clouds)
weatherData.weather.description (e.g. overcast clouds)
weatherData.weather.icon (icon)

- Current day

- Today's high/low


### Hourly forecast:
- Current time
- Forecast times
- Forecast temps
- Forecast conditions

### Day forecast:
- Current day
- Forecast days
- Forecast highs
- Forecast lows
- Forecast conditions
*/

// RETURN JSON
function getWeather(weatherURL /*, forecastURL*/) {
  // Current conditions
$.getJSON(weatherURL, function(weatherData) {
  console.log(weatherData.main.temp);
});

// $.getJSON(hourlyURL, function(hourlyData) {
//
// });
}
/*
CONDITIONS:
clear sky
few clouds
scattered clouds
broken clouds
shower rain
rain
thunderstorm
snow
mist*
fog*
*/
// RUN IT
getLocation();
