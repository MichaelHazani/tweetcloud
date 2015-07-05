'use strict';

var express = require('express');
var twitter = require('node-twitter');
var keys = require('./secrets.js');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var tweets = [];
var port = process.env.PORT || 3000;
var tweeting = false;

var bodyparser = require('body-parser');
var tweetList;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


app.use(express.static('app'));

// app.listen(port, function() {
//   console.log('server available at http://localhost:' + port);
// });

server.listen(process.env.PORT || 8081);

var twitterStreamClient =  new twitter.StreamClient(
  keys.consumerKey, keys.consumerSecret, keys.token, keys.tokenSecret
  );
twitterStreamClient.on('close', function() {
    console.log('Connection closed.');
});
twitterStreamClient.on('end', function() {
    console.log('End of Line.');
});
twitterStreamClient.on('error', function(error) {
    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
});
twitterStreamClient.on('deleteLocation', function(data) {
    console.log(data);
});

twitterStreamClient.start(['music']);
// console.log(twitterStreamClient);

twitterStreamClient.on('tweet', function(tweet) {
  tweeting = true;
  // var thisTweet = tweet.text;
  // var thisTime = tweet.time;
  tweets.push("tweet: " + tweet.text);
  console.log(tweets);
  //socket.boradcast.emit("twitter-stream", extTweet);
  //send out to web sockets channel
});

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

io.sockets.on('connection', function (socket) {

  socket.on("start tweets", function() {

  socket.emit('twitter-stream', tweets);
  });
socket.emit("connected");
});


// app.get('/tweeting', function(req, res) {
//   console.log(tweetList);
//   res.json(tweetList);
// });





