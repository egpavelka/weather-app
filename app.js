
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
  $http.get('http://api.openweathermap.org/data/2.5/weather?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
  .success(function(response) {
    weather.current = response;
  })
  // hourly
  .then(
  $http.get('http://api.openweathermap.org/data/2.5/forecast?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
  .success(function(response) {
    weather.hourly = response;
    console.log(response);

  }))
  // daily
  .then(
  $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
  .success(function(response) {
    weather.daily = response;
      console.log(response);
  }));
}]);

app.filter('convertTemp', [function() {
  return function(temp, scale) {
    var convertedTemp;
    if (scale === 'c') {
    var c = temp - 273.15;
    convertedTemp = Math.round(c);
  }
  if (scale === 'f') {
  var f = (temp * 9)/5 - 459.67;
  convertedTemp = Math.round(f);
}
    return convertedTemp;
  };
}]);

/*
app.contoller('scaleController', ['$scope', function($scope) {
  $scope.filter = 'fahrenheit',
  $scope.changeScaleTo = function(scale) {
    switch ($scope.filter) {
      case 'celsius':
        return
    }
  }
}]);

app.directive('locator', [function() {
  return {
    restrict: 'AEC',
    template: '<input type="text" ng-model="zipcode" autocomplete="postal-code" pattern="[0-9]{5}" placeholder="Find a new location" required/>'
  }
}]);
*/
/*
app.controller('zipcodeController', ['$scope', function($scope) {
  $scope.zipcode = '5-digit U.S. zipcode';
}]);

app.controller('urlBuilder', [function() {
  var url = {
    base: 'http://api.openweathermap.org/data/2.5/forecast/',
    type: '',
    location: '',
    key: '&APPID=831f9a0e76c47eb878b49f28785cd20b'
  };
}]);
*/

})();
