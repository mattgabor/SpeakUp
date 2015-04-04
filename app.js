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
  app.set('view engine', 'jade');

// Speech to Text Credentials
var stcredentials = extend({
  version:'v1',
	username: '<username>',
	password: '<password>'
}, bluemix.getServiceCreds('speech_to_text')); // VCAP_SERVICES

// Personality Insight Credentials
var picredentials = extend({
  version:'v1',
	username: '<username>',
	password: '<password>'
}, bluemix.getServiceCreds('personality_insights')); // VCAP_SERVICES


app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

// render index page
app.get('/', function(req, res){
	res.render('index');
});

// Create the service wrapper
var speechToText = watson.speech_to_text(stcredentials);
var personality_insights = watson.speech_to_text(picredentials);


console.log(transcript);

var transcript = $('.well').text();


// Configure express
require('./config/express')(app, speechToText);
require('./config/express')(app, personality_insights);

// Configure sockets
require('./config/socket')(io, speechToText);

var port = process.env.VCAP_APP_PORT || 3000;
server.listen(port);
console.log('listening at:', port);
