# DESCRIPTION OF PROJECT FROM FCC

## Show the Local Weather

### Objective: Build a CodePen.io app that is functionally similar to this: http://codepen.io/FreeCodeCamp/full/bELRjV.

- Rule #1: Don't look at the example project's code. Figure it out for yourself.

- Rule #2: Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

- User Story: I can see the weather in my current location.

- User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.

- User Story: I can push a button to toggle between Fahrenheit and Celsius.


_____________________________________________________________

# GAMEPLAN/OUTLINE

## DATA POINTS FROM APIs:
### Day/Night:
- Current time
- Local sunrise/sunset

### Current weather conditions:
- Temp
- Conditions
- Current day
- Today's high/low

### Hourly forecast:
- Current time
- Forecast times
- Forecast temps
- Forecast conditions

### Day forecast:
- Current day
- Forecast days
- Forecast highs
- Forecast lows
- Forecast conditions

## CONVERSION OF JSON DATA:
- Temp from Kelvin
- Sunrise/sunset times

## CHANGE BY INPUT/SELECTION:
- Location by lookup
- Temperature scale by button

## CONDITIONAL VISUALS:
### Page background:
- Current conditions
- Current time of day

### Condition indicators:
- Large icon for current conditions
- Small icons for hourly and daily forecasts

### Location indicator on navigator bar:
- Visible if geolocation is active

## DATA SOURCES:
- openweather API - weather
- openweather API - forecast
- UNDETERMINED: zipcode lookup/validator
