const http = require('http');
const fs = require('fs');

fs.readFile('./public/index.html', function (err, html) {
 if (err) {
    throw err; 
 } 
 const server = http.createServer(function(request, response) { 
    response.writeHeader(200, {"Content-Type": "text/html"}); 
    response.write(html); 
    response.end(); 
 }).listen(8080, () => {
      console.log('Server running at http://localhost:8080/');
    });
});