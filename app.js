
// APP
var app = angular.module('weatherApp', []);

app.controller('weatherController', function($scope, $http) {
  // temporarily use static URLs in order to set up HTTP calls
  // and finish styling in view


    //current
    $http.get('http://api.openweathermap.org/data/2.5/weather?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
    .then(function(response) {
      $scope.current = response.data;
      console.log(current);
    })
    // hourly
    .then()
    ($http.get('http://api.openweathermap.org/data/2.5/forecast?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
    .then(function(response) {
      $scope.hourly = response.data;
    }))
    // daily
    .then(
    $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b').then(function(response) {
      $scope.daily = response.data;
    }));

});

app.factory('locationService', ['a', 'b', function(a,b){
  this.buildURL = function(source){

  };
}])

/* IF I NEED $q
$q.all([
  //current
  $http.get('http://api.openweathermap.org/data/2.5/weather?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
  .then(function(response) {
    $scope.current = response;
  }),
  // hourly
  $http.get('http://api.openweathermap.org/data/2.5/forecast?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
  .then(function(response) {
    $scope.hourly = response;
  }),
  // daily
  $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b').then(function(response) {
    $scope.daily = response;
  })
])
//all
.then(function(){
  console.log()
})
*/
