(function() {
    'use strict';

    // APP
    var app = angular.module('weatherApp', ['angular-carousel']);

    app.controller('weatherController', ['$scope', '$window', 'geolocationService', 'urlService', 'weatherService', function($scope, $window, geolocationService, urlService, weatherService) {

        // INITIALIZE RESULTS OF API QUERIES
        $scope.current = {};
        $scope.hourly = {};
        $scope.daily = {};
        // INITIALIZE HOURLY DATA CAROUSEL
        $scope.hourlySlides = [];

        // CHECK FOR GEOLOCATION IN BROWSER, INVOKE ON WINDOW LOAD
        $scope.geolocation = function() {
            geolocationService.detectGeolocation()
                .then(function(results) {
                    $scope.fetchWeather(results.lat, results.lon);
                });
        };
        //

        // GET WEATHER: send coordinates to build URLs, then make HTTP calls
        $scope.fetchWeather = function(lat, lon) {
            urlService.setLocation(lat, lon)
                .then(function(results) {
                    $scope.updateWeather(results);
                });
        };

        // UPDATE VIEW: nested promise to update scopes with bindings
        $scope.updateWeather = function(results) {
            weatherService.fetchWeather(results)
                .then(function(data) {
                    $scope.current = data.current.data;
                    $scope.hourly = data.hourly.data.list;
                    $scope.daily = data.daily.data.list;
                    // Set temperature scale
                    $scope.detectScale();
                });
        };

// HOURLY CAROUSEL
var view = angular.element($window);
view.bind('resize', function() {
  console.log('start');
    var width = view.width();
    if ($scope.hourly !== {}) {
      if(width > 900) {
         // desktop
         rebuildSlide(6);
      } else if(width <= 900 && width > 480) {
         // tablet
         rebuildSlide(4);
      } else {
         // phone
         rebuildSlide(3);
      }
    }
      // don't forget manually trigger $digest()
       $scope.$digest();
});
function rebuildSlide(n) {
    var hourlySlides = [],
        slide = [];
    for(var i = 0; i < 12; i++) {
        if(slide.length === n) {
            hourlySlides.push(slide);
            slide = [];
        }
        slide.push($scope.hourly[i]);
    }
    hourlySlides.push(slide);
    $scope.hourlySlides = hourlySlides;
}

// TEMPERATURE SCALE FUNCTIONS
// Default to Fahrenheit
$scope.scaleOptions = [{
  name: 'Fahrenheit',
  val: 'f'
},
{
  name: 'Celsius',
  val: 'c'
}];
$scope.scale = $scope.scaleOptions[0].val;
// Autoset the scale to the one preferred by the selected location's country.
  $scope.detectScale = function(scale){
      var fahrCountries = ['BS', 'BZ', 'KY', 'PW', 'US', 'PR', 'GU', 'VI'];
          //['The Bahamas', 'Belize', 'Cayman Islands', 'Palau', 'United States', 'Puerto Rico', 'Guam', 'U.S. Virgin Islands']
      var country = $scope.current.sys.country;
      if (fahrCountries.indexOf(country) === -1) {
        $scope.scale = $scope.scaleOptions[1].val;
        console.log($scope.scaleOptions[1].val, $scope.scaleOptions[1].name);
      }
      else {
        $scope.scale = $scope.scaleOptions[0].val;
  }

};

  // Change the filter that converts temperatures from Kelvin and the appearance of "Fahrenheit" and "Celsius" buttons so that the active scale is highlighted.
  $scope.switchToC = function() {
      // document.getElementById("temp-far").className = "scale-type inactive";
      // document.getElementById("temp-cel").className = "scale-type active";
      console.log("change");
      $scope.scale = 'c';
  };
  $scope.switchToF = function() {
      // document.getElementById("temp-cel").className = "scale-type inactive";
      // document.getElementById("temp-far").className = "scale-type active";
      $scope.scale = 'f';
  };

}]);

    // LOCATION, LOCATION, LOCATION
    //// Check for geolocation
    app.factory('geolocationService', ['$q', '$window', function($q, $window) {
        return {
            detectGeolocation: function() {
                var deferred = $q.defer();
                var coords = {};
                // CHECK FOR GEOLOCATION
                if ($window.navigator && $window.navigator.geolocation) {
                    $window.navigator.geolocation.getCurrentPosition(function(position) {
                        coords.lat = position.coords.latitude;
                        coords.lon = position.coords.longitude;
                        deferred.resolve(coords);
                    });
                } else { //TODO obviously make this direct to appropriate page
                    deferred.reject({
                        msg: "We can't find you."
                    });
                }

                return deferred.promise;
            }
        };
    }]);

    //// Enable Google location search with autocomplete
    app.directive('googleplace', ['urlService', function(urlService) {
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
                        scope.$parent.fetchWeather(
                            scope.details.geometry.location.lat(), scope.details.geometry.location.lng());

                            //TODO add factory link getCountryName(scope.details.address_components);

                    });
                });
            }
        };
    }]);

    // CHECK THE WEATHER
    app.factory('urlService', ['$q', function($q) {
        var coords = '';
        var urlList = [];
        return {
            setLocation: function(lat, lon) {
                // SET COORDINATES
                coords = '?lat=' + lat + '&lon=' + lon;

                // BUILD URLS
                // Components for URLS
                var baseUrl = 'http://api.openweathermap.org/data/2.5/',
                    appId = '&APPID=831f9a0e76c47eb878b49f28785cd20b',
                    parameters = ['weather', 'forecast', 'forecast/daily'];

                // Create for each forecast type parameter and store accordingly in urlList
                var deferred = $q.defer();
                for (var i = 0; i < 3; i++) {
                    urlList[i] = baseUrl + parameters[i] + coords + appId;
                }
                deferred.resolve(urlList);
                return deferred.promise;

            }

        };

    }]);

    app.factory('weatherService', ['urlService', '$http', '$q', function(urlService, $http, $q) {

        return {
            fetchWeather: function(list) {
                return $q.all(list.map(function(apiCall) {
                        return $http.get(apiCall, {
                            timeout: 3000
                        });
                    }))
                    .then(function(results) {
                        // Set up results object and its keys
                        var weatherList = {
                            current: '',
                            hourly: '',
                            daily: ''
                        };
                        var dataKeys = Object.keys(weatherList);
                        // Send data to results object
                        for (var i = 0; i < 3; i++) {
                            weatherList[dataKeys[i]] = results[i];
                        }
                        return weatherList;
                    }, function(err) {
                        console.log(err);
                    });
            }
        };


    }]);

  // Filter to convert given temperatures from Kelvin to Fahrenheit or Celsius; used with ng-show to switch between the two.
    app.filter('convertTemp', [function() {

        return function(temp,scale) {
            var convertedTemp;

            if (scale === 'c') {
                var c = temp - 273.15;
                convertedTemp = Math.round(c);
            }

            if (scale === 'f') {
                var f = (temp * 9) / 5 - 459.67;
                convertedTemp = Math.round(f);
            }
            return convertedTemp + '\u00B0';
        };
    }]);

})();
