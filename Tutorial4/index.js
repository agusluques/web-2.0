const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
let config = require('./config');
let middleware = require('./middleware');

class HandlerGenerator {
  login (req, res) {
    console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'admin';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let header = {
          typ: 'JWT',
          alg: 'HS256'
        };

        header = Buffer.from(JSON.stringify(header)).toString('base64');

        let payload = {
          username: username
        };

        payload = Buffer.from(JSON.stringify(payload)).toString('base64');

        let key = header + '.' + payload;
        let signature = crypto.createHmac('sha256', config.secret);
        signature.update(key);
        key = signature.digest('base64');


        let token = header + '.' +payload + '.' + key;

        // return the JWT token for the future API calls
        console.log("ok")
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        console.log("usr or pass incorrect")
        res.status(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      console.log("no body")
      res.status(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  index (req, res) {
    res.json({
      success: true,
      data: 'All data'
    });
  }
}

function main () {
  let app = express();
  let handlers = new HandlerGenerator();

  // app.use(bodyParser.urlencoded({ // Middleware
  //   extended: true
  // }));
  app.use(bodyParser.json());

  // Routes & Handlers
  app.post('/login', handlers.login);
  app.get('/data', middleware.checkToken, handlers.index);
  app.get('/hmac', middleware.getHmac);
  app.listen(8080, () => console.log('Server is listening on port: 8080'));
}

main();
