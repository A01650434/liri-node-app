console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

//reequired to import the file and store it ina a var
var keys = require ("./keys.js");

var spotify = new spotify(keys.sportify); //and so on

