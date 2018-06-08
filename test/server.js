// const express = require('express');
// const routes = require('../src/routes');
const http = require('http');
const app = require('../app');

module.exports = (port, cb) => {
  const normalPort = port || 3030;
  // const app = express();
  app.set('port', normalPort);
  // app.use(routes);
  const server = http.createServer(app);
  server.listen(port);
  process.env.NODE_ENV = 'test';
  app.on('online', function() {
    cb(server);
  });
};
