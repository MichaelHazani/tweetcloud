'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var Twitter = require('node-twitter');

var twitterStreamClient = new Twitter.StreamClient(
  'wrNczJOfwAVb5g7UdOENTEgK0',
  'XwKCnpTfZKASNaGUWUT3wtCcTcTtLiHNpXN1F0YcfgT',
  '3124478422-6puXKn7aPN69LJQzYXfsexHt9NBi9rsNAZyOM61',
  'pE9blQ7F6NMkbAY6bFAnUW7ExN2rKVrhszu44OHnk8nRo'
  );

// twitterStreamClient.start(['baseball', 'basketball', 'football', 'hockey']);


app.use(express.static('app'));

app.listen(port, function() {
  console.log('server available at http://localhost:' + port);
});

app.get('/', function(req, res) {
  res.sendFile('index.html');

});



