/*jshint node:true*/

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).

'use strict';
var app = require('express')(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  bluemix = require('./config/bluemix'),
  watson = require('watson-developer-cloud'),
  extend = require('util')._extend;
// if bluemix credentials exists, then override local
var credentials = extend({
  version:'v1',
	username: '<username>',
	password: '<password>'
}, bluemix.getServiceCreds('speech_to_text')); // VCAP_SERVICES
// Create the service wrapper
var speechToText = watson.speech_to_text(credentials);
// Configure express
require('./config/express')(app, speechToText);
// Configure sockets
require('./config/socket')(io, speechToText);
var port = process.env.VCAP_APP_PORT || 3000;
server.listen(port);
console.log('listening at:', port);
