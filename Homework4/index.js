var express = require('express');
var app = express();

app.get('/:name', function (req, res) {
	var name = req.params.name;
  	res.send('Hello ' + name);
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
