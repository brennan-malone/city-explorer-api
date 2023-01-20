'use strict';
const axios = require('axios');

async function getMovie(request, response, next) {
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
}

class Movies {
  constructor(movieObj){
    this.title = movieObj.title;
    this.release = movieObj.release_date;
    this.poster = movieObj.poster_path;
  }
}

module.exports = getMovie;
