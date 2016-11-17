
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
          $scope.coords.lat = results.lat;
          $scope.coords.lon = results.lon;
        });
}();

// STORE COORDINATES
$scope.coords = {
  lat : '',
  lon: ''
};
// TEST: make sure directive properly updates coords
$scope.$watch(function(){
   return $scope.coords;
}, function(newValue, oldValue){
    console.log(newValue + ' ' + oldValue);
    console.log($scope.coords);
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
      else {
        deferred.reject({msg: "We can't find you."});
      }

      return deferred.promise;
    }
  };
}]);

app.factory('weatherService', ['$http', '$q', function($http,$q) {
return {

urlParts : {
  // PARTS
  baseUrl : 'http://api.openweathermap.org/data/2.5/',
  coords : '',
  appId : '&APPID=831f9a0e76c47eb878b49f28785cd20b',
  // BUILD FUNCTIONS
  currentUrl : function() {
    return baseUrl + 'weather' + coords + appId;
  },
  hourlyUrl : function() {
    return baseUrl + 'forecast' + coords + appId;
  },
  dailyUrl : function() {
    return baseUrl + 'forecast/daily' + coords + appId;
  }
},

setCoords : function (lat, lon) {
      coords = '?lat=' + lat + '&lon=' + lon;
      setUrls();
  },

fetchWeather : function () {
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
        return weatherList;
      });
    }
  };
}

};

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
