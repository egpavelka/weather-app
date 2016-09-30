function() {
// APP
var app = angular.module('weatherApp', []);

app.controller('CurrentController', function($scope, $http) {
  this.data = currentData;
});

app.controller('HourlyController', function($scope, $http) {
  this.data = currentData;
});

app.controller('DailyController', function($scope, $http) {
  this.data = currentData;
});

}
