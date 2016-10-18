
function() {
  // APP
var app = angular.module('weatherApp', []);

app.controller('weatherController', [ '$http', '$scope', function($scope, $http) {
    //current
    $http.get('http://api.openweathermap.org/data/2.5/weather?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
    .success(function(response){
      $scope.current = response.data;
      console.log(current);
    });


}]);

}
