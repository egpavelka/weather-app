
(function() {
  'use strict';

// APP
var app = angular.module('weatherApp', []);

app.controller('weatherController', [ '$http', '$scope', function($http, $scope) {

  $scope.current = [];
  $scope.hourly = [];
  $scope.daily = [];
    //current
  $http.get('http://api.openweathermap.org/data/2.5/weather?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
  .success(function(response) {
    $scope.current = response;
  })
  // hourly
  .then(
  $http.get('http://api.openweathermap.org/data/2.5/forecast?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
  .success(function(response) {
    $scope.hourly = response;

  }))
  // daily
  .then(
  $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=4580543&APPID=831f9a0e76c47eb878b49f28785cd20b')
  .success(function(response) {
    $scope.daily = response;
  }));
// Change the appearance of "Fahrenheit" and "Celsius" buttons when one is triggered so that the active scale is highlighted.
  $scope.switchToC = function () {
    document.getElementById("temp-far").className = "scale-type inactive";
    document.getElementById("temp-cel").className = "scale-type active";
  };
  $scope.switchToF = function () {
    document.getElementById("temp-cel").className = "scale-type inactive";
    document.getElementById("temp-far").className = "scale-type active";
  };

  ///////////////////////////////////////////////
  ////////////// TEST ZONE /////////////////////

function setGeolocation() {
  geolocationService.getGeolocation().then(
    // If geolocation data returned
    function(position) {
      $scope.$apply(function()) {
        $scope.lat = position.coords.latitude;
        $scope.lon = position.coords.longitude;
      }
    }, function(err) {

    }
  );
}

  ///////////////////////////////////////////////
  ///////////////////////////////////////////////

}]);

///////////////////////////////////////////////
////////////// TEST ZONE /////////////////////
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
                });
            });
        }
    };
});

//////////// ABOVE OK //////////////////////////
app.factory('geolocationService', ['$q', '$window', function($q, $window) {
  function getGeolocation() {
    var deferred = $q.defer();

    if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }

    return {
        getCurrentPosition: getCurrentPosition
    };
}]);

///////////////////////////////////////////////
///////////////////////////////////////////////

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
