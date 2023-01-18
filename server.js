'use strict';

console.log('my server');

// **** REQUIRES ****

const express = require('express');
require('dotenv').config();
const cors = require('cors');
let data = require('./data/weather.json')

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

app.get('/hello', (request, response) => {
  console.log(request.query);

  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server`);
});

app.get('/weather', (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.searchQuery;

    let dataToGroom = data.find(city => city.searchQuery === searchQuery);
    let newArray = [];
    for (let i = 0; i < dataToGroom.data.length; i++) {
      newArray.push(new Forecast(dataToGroom.data[i]));
    }
    console.log(newArray);
    response.status(200).send(newArray);
  } catch (error) {
    next(error);
  }
});

// **** CLASS TO GROOM BULKY DATA ****

class Forecast {
  constructor(weatherObj){
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
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
