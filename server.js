'use strict';

var express = require('express');
var keys = require('./secrets.js');
var app = express();
var port = process.env.PORT || 3000;

var Twitter = require('node-twitter');



app.use(express.static('app'));

app.listen(port, function() {
  console.log('server available at http://localhost:' + port);
});

app.get('/', function(req, res) {
  res.sendFile('index.html');

});

var twitterStreamClient = new Twitter.StreamClient(
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
console.log(twitterStreamClient);

twitterStreamClient.on('tweet', function(tweet) {
  var thisTweet = tweet.text;
  console.log(thisTweet);
});


