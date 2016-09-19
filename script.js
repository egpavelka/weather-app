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
dailyURL = "http://api.openweathermap.org/data/2.5/forecast/daily?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b";
  // Send URLs to getJSON
  getWeather(weatherURL, hourlyURL, dailyURL);
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

var now = new Date();

var currentDay = moment(now).format('dddd'), // Monday
    currentDate = moment(now).format('MMMM DD'), // September 19
    currentTime = moment(now).format('LT'); // 2:52 AM

- Local sunrise/sunset
var currentSunrise = weatherData.sys.sunrise,
    currentSunset = weatherData.sys.sunrise;

if (currentDate > currentSurise && currentDate < currentSunset) {
// display day background
}
else {
// display night background
}

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
dailyData.list[0].temp.max
dailyData.list[0].temp.min

### Hourly forecast:
- Forecast times
hourlyData.list[i].sys.dt_txt
moment( hourlyData.list[i].sys.dt_txt ).format('LT')

- Forecast temps
hourlyData.list[i].main.temp
- Forecast conditions
hourlyData.list[i].weather[0].id .... (see above for conditions keys)

### Day forecast:
- Forecast days
dailyData.list[i].dt (UTC)
- Forecast highs
dailyData.list[i].temp.max
- Forecast lows
dailyData.list[i].temp.min
- Forecast conditions
dailyData.list[i].weather[0].id .... (see above for conditions keys)

function getC(temp) {
  return Math.round(temp - 273.15);
}

function getF(temp) {
  return Math.round(((9 * getC(temp)) / 5) + 32);
}
*/

// RETURN JSON
function getWeather(weatherURL, hourlyURL, dailyURL) {
  // Current conditions
$.getJSON(weatherURL, function(weatherData) {
  console.log(weatherData.sys.sunrise);
});

$.getJSON(hourlyURL, function(hourlyData) {

});

$.getJSON(dailyURL, function(dailyData) {

});

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
