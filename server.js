'use strict';

console.log('my server');

// **** REQUIRES ****

const express = require('express');
require('dotenv').config();
const cors = require('cors');

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
