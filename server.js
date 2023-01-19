'use strict';

console.log('my server');

// **** REQUIRES ****

const express = require('express');
require('dotenv').config();
const cors = require('cors');
// let data = require('./data/weather.json');
const axios = require('axios');

// **** USE EXPRESS ****
// **** app === server ****

const app = express();

// **** MIDDLEWARE ****

app.use(cors());

// **** DEFINE SERVER PORT ****

const PORT = process.env.PORT || 3002;

// **** ENDPOINTS ****

// **** BASE ENDPOINT ****

// **** CALLBACK FUNCTION
app.get('/', (rquest, response) => {
  response.status(200).send('Welcome to my server');
});

app.get('/movies', async (request, response, next) => {
  try {
    let cityName = request.query.searchQuery;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${cityName}&page=1&include_adult=false`;

    let movieDataFromWeatherbit = await axios.get(url);
    let parsedMovieData = movieDataFromWeatherbit.data;
    let resultsArray = parsedMovieData.results.map(movieObj => new Movies(movieObj));

    response.status(200).send(resultsArray);
  } catch (error) {
    next(error);
  }
});

app.get('/weather', async (request, response, next) => {
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
});

// **** CLASS TO GROOM BULKY DATA ****

class Forecast {
  constructor(dayObj){
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
}

class Movies {
  constructor(movieObj){
    this.title = movieObj.title;
    this.release = movieObj.release_date;
  }
}
// **** CATCH ALL ENDPOINT

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

// **** ERROR HANDLING ****

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// **** SEVER START ****

app.listen(PORT, () => console.log(`running on port ${PORT}`));
