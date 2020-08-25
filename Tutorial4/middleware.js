const config = require('./config.js');
const crypto = require('crypto');

let checkToken = (req, res, next) => {
  let token = req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    var header, payload, secret;
    [header, payload, secret] = token.split('.');

    let key = header + '.' + payload;
    let signature = crypto.createHmac('sha256', config.secret);
    signature.update(key);
    key = signature.digest('base64');

    var decode_header = Buffer.from(header, 'base64').toString('ascii');
    var decode_payload = Buffer.from(payload, 'base64').toString('ascii');

    if (secret === key) {
      next()
    }else{
      return res.json({
          success: false,
          message: 'Token is not valid'
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

let getHmac = (req, res, next) => {
  
  let signature = crypto.createHmac('md5', config.secret);
  signature.update(req.url);
  signature.update(req.method);
  signature.update(Date.now().toString());
  key = signature.digest('base64');

  return res.json({
      success: true,
      message: key
  });

};

module.exports = {
  checkToken: checkToken,
  getHmac: getHmac
};
