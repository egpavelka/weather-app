View live: https://egpavelka.com/weather
_____________________________________________________________

# DESCRIPTION OF PROJECT FROM FCC

## Show the Local Weather

### Objective: Build a CodePen.io app that is functionally similar to this: http://codepen.io/FreeCodeCamp/full/bELRjV.

- Rule #1: Don't look at the example project's code. Figure it out for yourself.

- Rule #2: Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

- User Story 1: I can see the weather in my current location.

- User Story 2: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.

- User Story 3: I can push a button to toggle between Fahrenheit and Celsius.


_____________________________________________________________

# CHANGELOG
## [Release 1.2] 2016.11.25
### COMPLETED
- Removed border radius on select and input elements due to goofiness on mobile; increased size and font size of those elements for better touch use.
- Fixed issue with hourly carousel where resizing the window would change number of items per slide but not return the view to the initial slide/hour.  (Added rn-carousel-deep-watch option to outer li, changed $watch in directive to return carouselIndex to 0 on collection change).
### IN PROGRESS
- Find a better API to look up city names from coordinates.

## [Release 1.1] 2016.11.23
### COMPLETED
- Overhauled to use Weather Underground instead of Open Weather Map API.  This should allow searches by geolocation in browsers (like newer Chrome) that require SSL for location services.
- Changed some of the background images and added a low opacity background to container to make sure everything stays visible.
- When search field is clicked, all text in the box is highlighted by default.
- Select for temp scale is disabled unless weather data is currently in the view.

### IN PROGRESS
- Change the color of input field's placeholder to dkgrey/black.

## [Release 1.0] 2016.11.23
### COMPLETED
- All FCC User Stories are complete.
- App will load weather by geolocation or search.
- App is completely responsive and will scale to four standard device sizes.

### IN PROGRESS
- Verify that all background images work with white text, change as needed.
- Change default background color.

## [Unreleased] 2016.11.17
### COMPLETED
- Functioning weather app, at last. All FCC User Stories are fulfilled.
- User can allow their browser to provide location information or search for anywhere in the world.  (Uses Place Autocomplete services from the Google Places API.)
- Current weather and hourly forecasts display temperature, condition description, and condition icon.  Daily forecasts display condition icons and high/low temperatures.

### IN PROGRESS
- Get rid of the duplicate divs and use directive templates to switch between temperature scales.
- Detect country in location lookup and automatically switch to the scale preferred in that location. (Currently, Fahrenheit )
- Double-check that all icon and background codes have corresponding images and that the background images are suitable for white text.
- Fix scrolling issues for various devices.  All information should be available in one screen; daily and hourly divs should have their own scroll, but bars must be invisible.  
- Style the search field.
- Maybe move the city name into the current display and make it larger.
- Add a search icon/designation to the field.

## [Unreleased] 2016.10.19
### COMPLETED
- Switch between Fahrenheit and Celsius.

## [Unreleased] 2016.10.19
### COMPLETED
- Added Google API for location autocompleting and sample file.
- Created filter for temperature conversion.  Takes 'f' or 'c' as argument--"easiest" idea is to create two identical elements for each temperature value and have the inactive scale set to display: none.  Could also change the JSON URL and reload all three data sets.  Neither seems efficient--find better.

## [Unreleased] 2016.10.18
### COMPLETED
- All data is fetched and displayed using static URLs.
- View is complete pending minor tweaks.

### IN PROGRESS
- Next step is to create temperature scale switch.
- Geolocation and URL building.
- Get rid of scrollbars or use media queries to control overflow.
- Make sure background images aren't too distracting/busy.

## [Unreleased] 2016.10.18
- New branch to escape planning clutter.

### NOTES
- Using static JSON URLs, create controller to fetch weather with one $http call.
- Chain two more $http calls.
- Create zipcode lookup--possibly using an autocompleting framework, like when searching Google Maps?
- Build JSON URL with zipcode or lat & long, API key, units--make switchable

## [Unreleased] 2016.09.30
### NOTES
- Instead of using separate controllers for each of the three API calls, should I combine them into one? (Important because some info from one data set will need to appear in a div that's hooked to a different controller.)
- Probably need to build a filter for temperature conversion--need to go from K to F/C and be able to change scale.
