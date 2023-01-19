'use strict';
const axios = require('axios');

async function getWeather(request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    // console.log(url);
    let weatherDataFromWeatherbit = await axios.get(url);

    // console.log(weatherDataFromWeatherbit);

    let parsedWeatherData = weatherDataFromWeatherbit.data;

    // console.log(parsedWeatherData);

    let weatherData = parsedWeatherData.data.map(dayObj => new Forecast(dayObj));

    // console.log(weatherData);

    response.status(200).send(weatherData);
  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(dayObj){
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
}

module.exports = getWeather;
