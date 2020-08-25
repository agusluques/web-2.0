var express = require('express');
var app = express();
var path = require('path');

var server = require('http').createServer();
const WebSocket = require('ws');
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ server: server });

app.use(express.static(path.join(__dirname, '/public')));

wss.on('connection', ((ws) => {
	ws.on('message', function incoming(data) {
	    // Broadcast to everyone else.
	    wss.clients.forEach(function each(client) {
	      if (client !== ws && client.readyState === WebSocket.OPEN) {
	        client.send(data);
	      }
	    });
	  });

	ws.on('end', () => {
		console.log('Connection ended...');
	});

}));


server.on('request', app);
server.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});