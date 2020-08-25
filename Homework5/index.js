var redis = require('redis');

var client = redis.createClient(6379, 'redis');

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

var express = require('express');
var app = express();

app.get('/person/:name/address', function (req, res) {
	client.get(req.params.name, function (error, result) {
	    if (error) {
	        console.log(error);
	        throw error;
	    }
	    res.send(result);
	});
  
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});