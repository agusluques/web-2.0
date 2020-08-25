var net = require("net");

clients = {}

var server = net.createServer(connection => { 
   	console.log('client connected');
   	clients[connection] = {
					'items': 0
				}

   	connection.setEncoding('utf8');

   	connection.on('end', function() {
      console.log('client disconnected\n');
   	});
   
   	connection.on('data', buffer => {
		switch (buffer.replace(/\n/g, '')) {
			case "add":
				clients[connection].items ++;
				console.log(clients)
				connection.write('added\n' );
				break;

			case "process":
				clients[connection].items = 0;
				console.log(clients)
				connection.write('processed\n' ); 
				break;

			default:
				connection.write('unknown command\n' );
		}
	});
});

server.listen(8080, function() { 
   console.log('server is listening');
});