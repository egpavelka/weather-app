
(function() {
  'use strict';

// APP
var app = angular.module('weatherApp', []);

app.controller('weatherController', [ '$http', function($http) {
  var weather = this;
  weather.current = [];
  weather.hourly = [];
  weather.daily = [];

  //current
$http.get('http://api.openweathermap.org/data/2.5/weather?id=4580543&units=imperial&APPID=831f9a0e76c47eb878b49f28785cd20b')
.success(function(response) {
  weather.current = response;
})
// hourly
.then(
$http.get('http://api.openweathermap.org/data/2.5/forecast?id=4580543&units=imperial&APPID=831f9a0e76c47eb878b49f28785cd20b')
.success(function(response) {
  weather.hourly = response;
  console.log(response);

}))
// daily
.then(
$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=4580543&units=imperial&APPID=831f9a0e76c47eb878b49f28785cd20b')
.success(function(response) {
  weather.daily = response;
    console.log(response);
}));



}]);

})();
