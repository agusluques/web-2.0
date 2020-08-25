var net = require("net");


var server = net.createServer(connection => { 
   	console.log('client connected');

   	connection.setEncoding('utf8');

   	connection.on('end', function() {
      console.log('client disconnected\n');
   	});
   
   	connection.on('data', buffer => {
   		buffer = JSON.parse(buffer);
		switch (buffer.command.replace(/\n/g, '')) {
			case "add":
				buffer.items++;
				buffer.result = "added"
				connection.write(JSON.stringify(buffer) + '\n');
				break;

			case "process":
				buffer.items = 0;
				buffer.result = "processed"
				connection.write(JSON.stringify(buffer) + '\n'); 
				break;

			default:
				connection.write('unknown command\n' );
		}
	});
});

server.listen(8080, function() { 
   console.log('server is listening');
});