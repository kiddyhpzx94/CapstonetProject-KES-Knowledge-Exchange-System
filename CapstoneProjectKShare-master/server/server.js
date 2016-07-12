'use strict';

//if ('production' === process.env.NODE_ENV)
//    require('newrelic');

const PORT = process.env.PORT || 3333;

const os = require('os');
const express = require('express');

const app = express();
const https = require('https');

const fs = require('fs');
const RoutesConfig = require('./config/routes.conf');
const PoliciesConfig = require('./config/policies.conf');
const DBConfig = require('./config/db.conf');
const Routes = require('./routes/index');
const socket = require('socket.io');

RoutesConfig.init(app);
PoliciesConfig.init();
DBConfig.init();
Routes.init(app, express.Router());

const opts = {
  key: fs.readFileSync(__dirname + '/cert/server.key'),
  cert: fs.readFileSync(__dirname + '/cert/server.crt')
}


const server = https.createServer(opts,app)
     .listen(PORT, () => {
       console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
       console.log(`enviroment: ${process.env.NODE_ENV}`);
     });


const io = socket(server);
// Set socket.io listeners.
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
