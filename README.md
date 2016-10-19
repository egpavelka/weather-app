# DESCRIPTION OF PROJECT FROM FCC

## Show the Local Weather

### Objective: Build a CodePen.io app that is functionally similar to this: http://codepen.io/FreeCodeCamp/full/bELRjV.

- Rule #1: Don't look at the example project's code. Figure it out for yourself.

- Rule #2: Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

- User Story: I can see the weather in my current location.

- User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.

- User Story: I can push a button to toggle between Fahrenheit and Celsius.


_____________________________________________________________

# CHANGELOG

## [Unreleased] 2016.10.18
### COMPLETED
- All data is fetched and displayed using static URLs.
- View is complete pending minor tweaks.

### IN PROGRESS
- Next step is to create tempererature scale switch.
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
