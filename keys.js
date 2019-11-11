console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

/*
//reequired to import the file and store it ina a var
var keys = require ("./keys.js");// maybe wont need
//how to access keys information
//For spotify-this-song 
var spotify = new Spotify(keys.sportify); //and so on
//For concert-this
module.exports.bandsintown = {
  id: process.env.BANDSINTOWN_ID
}
//For movie-this
module.exports.omdb = {
  id: process.env.OMDB_ID
}
//For do-what-it-says
*/