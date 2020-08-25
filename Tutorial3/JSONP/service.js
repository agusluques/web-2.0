var express = require('express');
 
var app = express();

// JSONP
app.get('/JSONP', function(req, res){
	if (req.query.callback) {
		res.send(req.query.callback + '({"people": [{"name": "Patterson Hendrix"},{"name": "Weeks Becker"},'+
      '{"name": "Prince Ward"},{"name": "Minerva Cantrell"},{"name": "Mayra Hickman"},'+
      '{"name": "Amalia Gallegos"},{"name": "Beulah Blake"},{"name": "Marcia Puckett"},'+
      '{"name": "Wooten Blackburn"},{"name": "Debbie Gordon"},{"name": "Janell Duffy"},'+
      '{"name": "Richmond Wise"},{"name": "Kerr Workman"},{"name": "Lucas Michael"},'+
      '{"name": "Delia Moreno"},{"name": "Spencer Bush"},{"name": "Alvarez Todd"},'+
      '{"name": "Ayers Whitfield"},{"name": "Holly Watson"},{"name": "Ana Mcpherson"}]})') 
	}else{
		res.status(300).send("error")
	}
  });

app.listen(3000);

console.log("Service listen on localhost:3000")