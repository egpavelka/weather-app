// GET GEOLOCATION
function getLocation() {
  if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
  // success callback
    function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    // create current conditions URL
    weatherURL = "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=831f9a0e76c47eb878b49f28785cd20b";
    // create forecast URL
    forecastURL = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&APPID=831f9a0e76c47eb878b49f28785cd20b";
  },
// error callback
alert("Your location cannot be detected.  Please enter a valid U.S. postal code to continue.")
);
  }
  else {
    // Prompt for zip
  }

}

// GET ZIPCODE
function getZip() {

}

// FETCH CURRENT CONDITIONS URL
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
// api.openweathermap.org/data/2.5/weather?zip=94040,us

// FETCH FORECAST URL
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}

// RETURN JSON
$.getJSON(weatherURL, function(data) {

});

$.getJSON(forecastURL, function(data) {

});

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
