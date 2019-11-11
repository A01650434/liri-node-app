require ("dotenv").config();

//variables 
var axios = require("axios"); 
var fs = require ("fs");
var moment = r4equire ("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify)
var keys = require("./keys.js"); //ns
var action = procces.argv[2];
var value = process.argv.slice(3).join(" ");

//Act or ERR
switch(act){
    case "concert-this":
        console.log("Concert this: ");
        consertThis(value);
        break;
    
    case "spotify-this-song":
        console.log("Spotify this song: ");
        spotifyThisSong(value);
        break; 

    case "movie-this":
        console.log("Movie this: ");
        movieThis(value);
        break;

    case "do-what-it-says":
        console.log("Doing: ");
        doWhatItSays(value);
        break;   
    default:
        console.log("Error: invalid");
        console.log("error in action:" + action);

}

//FUNCTIONS 

// Spotify Fct

function spotifyThisSong(value){
    logthis()
    if (!value) {
        console.log("Song undifined");

    spotify
  .request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
  .then(function(data) {
    //results
    var artist = data.artist[0].name;
    var songName = data.name;
    var link = data.external_urls.spotify;
    var album = data.album.name;

    console.log(`Artist: ${artist}`);
    console.log(`Song Name: ${songName}`);
    console.log(`Song Link: ${link}`);
    console.log(`Album: ${album}`);

  })
  //For errors
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
    errorCheck(err) //unsure
  });
    
    }else{
        // delimitate results 
        spotify
        .search({ type: 'track', query: value, limit: 1})
        .then(function(data) {
            var artist = data.tracks.items[0].artist[0].name;
            var songName = data.tracks.items[0].name;
            var link = data.tracks.items[0].external_urls.spotify;
            var album = data.tracks.items[0].album.name;
        
            console.log(`Artist: ${artist}`);
            console.log(`Song Name: ${songName}`);
            console.log(`Song Link: ${link}`);
            console.log(`Album: ${album}`);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
}

// OMDb Fct
function movieThis(value){
    logthis()
    if (!value) { movie = "Mr. Nobody";}
    else { movie = value; }
    var movie; 
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
           console.log("Title: " + response.data.Title);
           console.log("Year: " + response.data.Year);
           console.log("IMDB Rating: " + response.data.Ratings[0].Value);
           console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
           console.log("Country: " + response.data.Country);
           console.log("Language: " + response.data.Language);
           console.log("Plot: " + response.data.Plot);
           console.log("Actors: " + response.data.Actors);
        })
    //For errors
    .catch(function(error){
        errorCheck(error)
    });
}

//Bands in town

function concertThis(value){
    logthis()
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function (response) {
       var venueName = response.data[0].venue.name
       var location = response.data[0].venue.city+", " + response.data[0].venue.region;
       var date = moment(response.data[0].datetime).format("MM/DD/YYYY");

       console.log("Venue Name: "+venueName);
       console.log("Location: "+location);
       console.log("Next Event: "+date);
    })
    // For errors
    .catch(function (error) {
       errorCheck(error)
    });
}
//Liri commands
function doWhatItSays(value){
    logthis()
    fs.readdFile("random.txt", "utf8", function(error,data){
        //for errors
        if (error){
            return console.log(error);
        } else {
        var dataArr = data.split(" ,");
        //Array actions
        var action = dataArr[0];
        var value = dataArr[1];

        switch(act){
            case "concert-this":
                console.log("Concert this: ");
                consertThis(value);
                break;
            
            case "spotify-this-song":
                console.log("Spotify this song: ");
                spotifyThisSong(value);
                break; 
        
            case "movie-this":
                console.log("Movie this: ");
                movieThis(value);
                break;
        
            case "do-what-it-says":
                console.log("Doing: ");
                doWhatItSays(value);
                break;   
        }
    }
    });
}

//Errors 
function errorCheck(error) {
    if (error.response) {
       console.log("--Data--");
       console.log(error.response.data);
       console.log("--Status--");
       console.log(error.response.status);
       console.log("--Header--");
       console.log(error.response.headers);
    } else if (error.request) {
       console.log(error.request);
    } else {
       console.log("Error", error.message);
    }
    console.log(error.config);
 }
 
 function logthis() {
    var trueLog = console.log;
    console.log = function (msg) {
       fs.appendFile("log.txt", JSON.stringify(msg) + "\n", function (err) {
          if (err) {
             return trueLog(err);
          }
       });
       trueLog(msg);
    }
    console.log("*-*-*-*-*");
 }

