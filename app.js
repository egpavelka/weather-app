// CREATE MODULE
var app = angular.module('weatherApp', []);

// FETCH LOCATION, CREATE URLS
app.factory('locationService', ['$window', '$q', function($window, $q) {
  return function() {
    var deferred = $q.defer();
    if (!$window.navigator) {
      deferred.reject(new Error('Geolocation is not supported by this browser.'));
      // TODO prompt user for zipcode
      // TODO validate zipcode
      zipcode = 0; // TEMP until prompt created
      // create current conditions URL
      conditionsURL = 'api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us' + '&APPID=831f9a0e76c47eb878b49f28785cd20b';
      // create forecast URL
      forecastURL = 'api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us' + '&APPID=831f9a0e76c47eb878b49f28785cd20b';
    } else {
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        deferred.resolve({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      }, deferred.reject);
      // create current conditions URL
      conditionsURL = "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + '&APPID=831f9a0e76c47eb878b49f28785cd20b';
      // create forecast URL
      forecastURL = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + '&APPID=831f9a0e76c47eb878b49f28785cd20b';
    }
  };
}]);

// FETCH WEATHER DATA
app.factory('weatherService', ['$http', '$q', function($http, $q) {
  function getConditions(conditionsURL) {

  }
  function getForecast(forecastURL) {

  }
}]);
