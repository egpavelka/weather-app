
(function() {
  'use strict';

// APP
var app = angular.module('weatherApp', []);

app.controller('weatherController', ['$scope', '$window', function($scope, $window, weatherService) {
// INITIALIZE RESULTS
  $scope.current = [];
  $scope.hourly = [];
  $scope.daily = [];

// CHECK FOR GEOLOCATION
if ($window.navigator && $window.navigator.geolocation) {
    $window.navigator.geolocation.getCurrentPosition(function(position) {
      function() { // TODO
      weatherService.setCoords(position.coords.latitude, position.coords.longitude);
    }
    }, function(error) {
console.log('problem');
      // document.getElementById('error') = "Geoocation may not be enabled on this device.  Please use the search bar above to find your location."
  });
}

// Create call to factory for each OpenWeather API and assign results.
function fetchData(lat, lon) {
$scope.current = function(){ weatherService.fetchWeather(lat, lon, 'weather');
};
$scope.hourly = function(){ weatherService.fetchWeather(lat, lon, 'forecast');
};
$scope.daily = function(){ weatherService.fetchWeather(lat, lon, 'forecast');
};
console.log($scope.current);
}

// Change the appearance of "Fahrenheit" and "Celsius" buttons when one is triggered so that the active scale is highlighted.
  $scope.switchToC = function () {
    document.getElementById("temp-far").className = "scale-type inactive";
    document.getElementById("temp-cel").className = "scale-type active";
  };
  $scope.switchToF = function () {
    document.getElementById("temp-cel").className = "scale-type inactive";
    document.getElementById("temp-far").className = "scale-type active";
  };

}]);

app.factory('weatherService', ['$http', '$q', function($http,$q) {
  var weatherData = {};
      // URL INGREDIENTS
  var baseUrl = 'http://api.openweathermap.org/data/2.5/',
      coords = '',
      appId = '&APPID=831f9a0e76c47eb878b49f28785cd20b',
      // API URLS
      currentUrl = '',
      hourlyUrl = '',
      dailyUrl = '';

  weatherData.setUrls = function() {
    currentUrl = baseUrl + 'weather' + coords + appId;
    hourlyUrl = baseUrl + 'forecast' + coords + appId;
    dailyUrl = baseUrl + 'forecast/daily' + coords + appId;
  };

  weatherData.setCoords = function(lat, lon){
    coords = '?lat=' + lat + '&lon=' + lon;
    console.log(coords);
  };

  weatherData.fetchWeather = function () {
    setUrls();
    return {
      loadDataFromUrls: function () {
        var urlList = [currentUrl, hourlyUrl, dailyUrl];
        return $q.all(urlList.map(function(single) {
          return $http({
            method: 'GET',
            url: single
          });
        }))
        .then(function(data) {
          var weatherList = {};
          data.forEach(function(val, i) {
            weatherList[urlList[i]] = val.data;
          });
          //return weatherList;
          console.log(weatherList);
        });
      }
    };
  };

  return weatherData;

}]);

app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.searchLocation = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.searchLocation, 'place_changed', function() {
                scope.$apply(function() {
                    scope.details = scope.searchLocation.getPlace();
                    model.$setViewValue(element.val());
                    scope.lat = scope.details.geometry.location.lat();
                    scope.lon = scope.details.geometry.location.lng();             });
            });
        }
    };
});

// Filter to convert given temperatures from Kelvin to Fahrenheit or Celsius; used with ng-show to switch between the two.
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
    return convertedTemp + '\u00B0';
  };
}]);

})();
