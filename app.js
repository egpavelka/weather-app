
(function() {
  'use strict';

// APP
var app = angular.module('weatherApp', []);

app.controller('weatherController', ['$scope', '$window', 'geolocationService', 'weatherService', function($scope, $window, geolocationService, weatherService) {

// INITIALIZE RESULTS OF API QUERIES
  $scope.current = {};
  $scope.hourly = {};
  $scope.daily = {};

// CHECK FOR GEOLOCATION IN BROWSER, INVOKE ON WINDOW LOAD
$scope.geolocation = function(){
        geolocationService.detectGeolocation()
        .then(function(results){
          weatherService.setCoords(results.lat, results.lon);
        });
}();

// TEST: make sure directive properly updates coords
$scope.$watch(function(){
   return weatherService.setCoords();
}, function(newValue, oldValue){
    console.log(newValue + ' ' + oldValue);
    console.log(weatherService.setCoords());
});

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

// LOCATION, LOCATION, LOCATION
//// Check for geolocation
app.factory('geolocationService', ['$q', '$window', function($q, $window) {
  return {
    detectGeolocation : function () {
      var deferred = $q.defer();
      var coords = {};
      // CHECK FOR GEOLOCATION
      if ($window.navigator && $window.navigator.geolocation) { $window.navigator.geolocation.getCurrentPosition( function (position) {
            coords.lat = position.coords.latitude;
            coords.lon = position.coords.longitude;
            deferred.resolve(coords);
        });
      }
      else { //TODO obviously make this direct to appropriate page
        deferred.reject({msg: "We can't find you."});
      }

      return deferred.promise;
    }
  };
}]);

//// Enable Google location search with autocomplete
app.directive('googleplace', ['weatherService', function(weatherService) {
    return {
        require: 'ngModel',
        controller: 'weatherController',
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
                    // Send coordinates to factory
                    weatherService.setCoords(
                      scope.details.geometry.location.lat(), scope.details.geometry.location.lng());
                  });
            });
        }
    };
}]);

// CHECK THE WEATHER
app.factory('weatherService', ['$http', '$q', function($http,$q) {

  // TEST: make sure coords are updating with directive
  var testCoords = function(test) {
      console.log(test);
  };
  var testUrls = function() {
      console.log(buildUrls());
  };

  var coords = '';

  var urlsList = {
    current : '',
    hourly: '',
    daily: ''
  };

  var buildUrls = function() {
    // Components for URLS
    var baseUrl = 'api.openweathermap.org/data/2.5/',
        appId = '&APPID=831f9a0e76c47eb878b49f28785cd20b',
        parameters = ['weather', 'forecast', 'forecast/daily'],
        listKeys = Object.keys(urlsList);
    // Create for each forecast type parameter and store accordingly in urlsList
    for (var i = 0; i < 3; i++) {
      urlsList[listKeys[i]] = baseUrl + parameters[i] + coords + appId;
    }
    return urlsList;
  };

return {

setCoords : function (lat, lon) {
      coords = '?lat=' + lat + '&lon=' + lon;
      testCoords(coords);
      testUrls();
      // buildUrls();
      return coords;
  },

fetchWeather : function () {
  return {
    loadDataFromUrls: function () {
      return $q.all(urlsList.map(function(single) {
        return $http({
          method: 'GET',
          url: single
        });
      }))
      .then(function(data) {
        var weatherList = {};
        data.forEach(function(val, i) {
          weatherList[urlsList[i]] = val.data;
        });
        return weatherList;
      });
    }
  };
}

};

}]);

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
