(function() {
    'use strict';

    // APP
    var app = angular.module('weatherApp', ['angular-carousel', 'angularReverseGeocode']);

    app.controller('weatherController', ['$scope', '$window', '$timeout', 'geolocationService', 'weatherService', function($scope, $window, $timeout, geolocationService, weatherService) {

        // INITIALIZE RESULTS OF API QUERIES
        $scope.current = {};
        $scope.hourly = {};
        $scope.daily = {};
        // INITIALIZE HOURLY DATA CAROUSEL
        $scope.hourlySlides = [];
        // INITIALIZE CONTAINER WIDTH, # OF ITEMS PER SLIDE
        $scope.containerWidth = '';
        $scope.slideCount = '';
        // INITIALIZE STATUS FOR VIEW SWITCH
        $scope.currentStatus = 'loadingLocation';
        // INITIALIZE TEMP MENU AS DISABLED
        $scope.scaleOn = false;
        // CHECK FOR GEOLOCATION IN BROWSER, INVOKE ON WINDOW LOAD
        $scope.geolocation = function() {
            geolocationService.detectGeolocation()
                .then(function(results) {
                  $scope.coords = results;
                    $scope.fetchWeather(results.lat, results.lon);
                }, function(err) {
                    console.log(err);
                    $scope.currentStatus = 'geolocationError';
                });
        };
        //

        // GET WEATHER: send coordinates to build URLs, then make HTTP calls

        // UPDATE VIEW: nested promise to update scopes with bindings
        $scope.fetchWeather = function(lat, lon) {
            weatherService.fetchWeather(lat, lon)
                .then(function(data) {
                    $scope.current = data.current_observation;
                    $scope.hourly = data.hourly_forecast;
                    $scope.daily = data.forecast.simpleforecast.forecastday;
                    // Set up hourly slides for current window
                    $scope.buildSlides($scope.slideCount);
                    // Set temperature scale
                    console.log($scope.hourly);
                    $scope.detectScale();
                    $scope.currentStatus = "weatherReady";

                }, function(err) {
                    console.log(err);
                    $scope.currentStatus = 'weatherError';
                });
        };

        // TEMPERATURE SCALE FUNCTIONS: change scope variable for 'if' statement in scale filter
        // Default to Fahrenheit
        $scope.scaleOptions = [{
              name: 'Celsius',
              val: 'c'
          },
          {
            name: 'Fahrenheit',
            val: 'f'
        }];
        $scope.scale = $scope.scaleOptions[0].val;

        // Autoset the scale to the one preferred by the selected location's country.
        $scope.detectScale = function(scale) {
            var fahrCountries = ['BS', 'BZ', 'KY', 'PW', 'US', 'PR', 'GU', 'VI'];
            //['The Bahamas', 'Belize', 'Cayman Islands', 'Palau', 'United States', 'Puerto Rico', 'Guam', 'U.S. Virgin Islands']
            var country = $scope.current.observation_location.country;
            if (fahrCountries.indexOf(country) === -1) {
                $scope.scale = $scope.scaleOptions[0].val;
            } else {
                $scope.scale = $scope.scaleOptions[1].val;
            }
        };

        // WATCH WINDOW SIZE: change number of hourly forecasts that appear on each slide and change the width of the weather info container to fit.
        $scope.buildSlides = function(n) {
            var hourlySlides = [],
                slide = [];
            for (var i = 0; i < 12; i++) {
                if (slide.length === n) {
                    hourlySlides.push(slide);
                    slide = [];
                }
                slide.push($scope.hourly[i]);
            }
            hourlySlides.push(slide);
            $scope.hourlySlides = hourlySlides;
        };

        $scope.setSizeScopes = function(w) {
            $scope.miniscreen = false;
            if (w >= 900) {
                // desktop
                $scope.containerWidth = '870px';
                $scope.slideCount = 6;
            } else if (w < 900 && w >= 610) {
                // tablet
                $scope.containerWidth = '590px';
                $scope.slideCount = 4;
            } else if (w < 610 && w >= 480) {
                // large phone
                $scope.containerWidth = '450px';
                $scope.slideCount = 3;
            } else {
                // small phone
                $scope.containerWidth = '310px';
                $scope.slideCount = 2;
                if (w < 340) {
                    $scope.miniscreen = true;
                }
            }
        };
        // Initialize on window load
        $scope.view = angular.element($window);
        $scope.setSizeScopes($scope.view.width());
        // Change on window resize
        $scope.view.bind('resize', function() {
            $scope.setSizeScopes($scope.view.width());
            $scope.buildSlides($scope.slideCount);
        });

    }]);

    // LOCATION, LOCATION, LOCATION
    // Check for geolocation
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
                    }, function(err) {
                        deferred.reject(err);
                    });
                } else {
                    deferred.reject(err);
                }
                return deferred.promise;
            }
        };
    }]);
    // Enable Google location search with autocomplete
    app.directive('googleplace', ['weatherService', '$window', function(weatherService, $window) {
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

                // Select all on click
                element.on('click', function() {
                    if (!$window.getSelection().toString()) {
                        // Required for mobile Safari
                        this.setSelectionRange(0, this.value.length);
                    }
                });

                scope.searchLocation = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.searchLocation, 'place_changed', function() {
                    scope.$apply(function() {
                        scope.details = scope.searchLocation.getPlace();
                        model.$setViewValue(element.val());
                        // Send coordinates to factory
                        scope.$parent.coords = {
                          lat: scope.details.geometry.location.lat(),
                          lon: scope.details.geometry.location.lng()
                        };
                        scope.$parent.fetchWeather(
                            scope.$parent.coords.lat, scope.$parent.coords.lon);

                        //TODO add factory link getCountryName(scope.details.address_components);

                    });
                });
            }
        };
    }]);

    // CHECK THE WEATHER
    // Make $http calls with the new URLs
    app.factory('weatherService', ['$http', function($http) {

        return {
            fetchWeather: function(lat, lon) {
                var apiUrl = '//api.wunderground.com/api/2f6c61c87edae1a8/conditions/hourly/forecast10day/q/' + lat + ',' + lon + '.json';

                return $http.get(apiUrl)
                    .then(function(results) {
                            return results.data;
                        }

                    );
            }
        };


    }]);

    // Filter to convert given temperatures from Kelvin to Fahrenheit or Celsius; used with ng-show to switch between the two.
    app.filter('convertTemp', [function() {

        return function(temp, scale) {
            var convertedTemp;

            if (scale === 'c') {
                convertedTemp = Math.round(temp);
            }

            if (scale === 'f') {
                var f = (temp * 9) / 5 + 32;
                convertedTemp = Math.round(f);
            }
            return convertedTemp + '\u00B0';
        };
    }]);

    // CHANGE VIEW
    app.directive('weatherReady', function() {
        return {
            restrict: 'AE',
            templateUrl: 'weather.html'
        };
    });

    app.directive('loadingLocation', function() {
        return {
            restrict: 'AE',
            templateUrl: 'message.html',
            link: function($scope, element, attrs) {
                $scope.header = "Locating current position...";
                $scope.details = "Get the weather for your current location by allowing location services for this page.";
            }
        };
    });

    app.directive('geolocationError', function() {
        return {
            restrict: 'AE',
            templateUrl: 'message.html',
            link: function($scope, element, attrs) {
                $scope.header = "Geolocation is not enabled in this browser.";
                $scope.details = "Try using the search box to look up the weather for another location.  If you'd prefer to use your exact location, please enable your browser's location service and refresh the page, or try clicking on the location detection button above.";
            }
        };
    });

    app.directive('weatherError', function() {
        return {
            restrict: 'AE',
            templateUrl: 'message.html',
            link: function($scope, element, attrs) {
                $scope.header = "Something went wrong.";
                $scope.details = "Weather is not available for this location.  Please search for another location or contact the administrator.";
            }
        };
    });

})();
