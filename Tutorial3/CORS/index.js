const http = require('http');

http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/get/') {
        res.statusCode = 200;
        res.setHeader('access-control-allow-origin', '*');
        res.end('ok');
    }else if (req.method === 'PUT' && req.url === '/put/') {
        res.setHeader('access-control-allow-origin', '*');
        req.pipe(res);
    }else if (req.method === 'POST' && req.url === '/post/') {
        res.setHeader('access-control-allow-origin', '*');
        req.pipe(res);
    }else if (req.method === 'DELETE' && req.url === '/delete/') {
        res.statusCode = 200;
        res.setHeader('access-control-allow-origin', '*');
        res.end('ok');
    }else if (req.method === 'OPTIONS'){
        request_method = req.headers['access-control-request-method'];
        switch (req.url){
            case '/get/':
                res.setHeader('access-control-allow-methods', 'GET');
                res.setHeader('access-control-allow-origin', '*');
                res.statusCode = 200;
                res.end('ok');
                break;
            case '/put/':
                res.setHeader('access-control-allow-methods', 'PUT');
                res.setHeader('access-control-allow-headers', 'Content-Type');
                res.setHeader('access-control-allow-origin', '*');
                res.statusCode = 200;
                res.end('ok');
                break;
            case '/post/':
                res.setHeader('access-control-allow-methods', 'POST');
                res.setHeader('access-control-allow-headers', 'Content-Type');
                res.setHeader('access-control-allow-origin', '*');
                res.statusCode = 200;
                res.end('ok');
                break;
            case '/delete/':
                res.setHeader('access-control-allow-methods', 'DELETE');
                res.setHeader('access-control-allow-origin', '*');
                res.statusCode = 200;
                res.end('ok');
                break;
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
}).listen(8888);
console.log("Server running on localhost:8888")