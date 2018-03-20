const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const http = require('http');
const enableDestroy = require('server-destroy');

var server;

function start(callback) {
  const app = express();
  const api = require('../lib/api');
  console.log(`Starting server on env ${process.env.NODE_ENV}`);

  app.use(bodyParser.json());
  
  api(app);

  callback = callback || function (err) {
    if (err) {
      console.error(err);
      return process.exit(1);
    }
    console.log(`listening http://localhost:${config.get('port')}`);
  };

  server = http.createServer(app).listen(config.get('port'), callback);

  enableDestroy(server);
}

function stop(callback) {
  server.destroy(callback);
}

module.exports = {
  start: start,
  stop: stop
};

if (require.main === module) {
  start();
}
