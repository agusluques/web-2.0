const http = require('http');
const fs = require('fs');

var messages = []

fs.readFile('./index.html', function (err, html) {
 if (err) {
    throw err; 
 } 
 var getUrlParameter = function getUrlParameter(url, sParam) {
    return url.split('=')[1]
};
 const server = http.createServer(function(request, response) {
 	if (request.method === 'GET' && request.url.startsWith('/messages')) {
        response.writeHeader(200, {"Content-Type": "application/json"});
        token = getUrlParameter(request.url, 'token');
        var aux = []
        for (var i = 0; i < messages.length; i++) {
        	if (messages[i].sender !== token && !messages[i].sent.find(e => e === token)){
        		aux.push(messages[i].message)
        		messages[i].sent.push(token)
        	}
        }
    	response.write(JSON.stringify(aux)); 
    	response.end();
    } else if (request.method === 'POST' && request.url === '/messages'){
    	let body = [];
	    request.on('data', (chunk) => {
	      body.push(chunk);
	    }).on('end', () => {
	      body = Buffer.concat(body).toString();
          body = JSON.parse(body)
	      messages.push({'message': body.message, 'sender': body.token, 'sent': []})
	      response.statusCode = 200;
	      response.end();
	    });
    } else{
        response.writeHeader(200, {"Content-Type": "text/html"}); 
    	response.write(html); 
    	response.end();
    }
     
 }).listen(8080, () => {
      console.log('Server running at http://localhost:8080/');
    });
});