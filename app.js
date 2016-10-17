/*jshint node:true*/

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).

'use strict';
const app = require('express')(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  bluemix = require('./config/bluemix'),
  watson = require('watson-developer-cloud'),
  bodyParser = require('body-parser'),
  extend = require('util')._extend;
  app.set('view engine', 'jade');

  //Here we are configuring express to use body-parser as middle-ware.
  app.use(bodyParser.urlencoded({ extended: false }));
// Speech to Text Credentials
const stcredentials = extend({
  version:'v1',
	username: '<username>',
	password: '<password>'
}, bluemix.getServiceCreds('speech_to_text')); // VCAP_SERVICES

// V1 Personality Insight Credentials
// var picredentials = extend({
//   version:'v1',
// 	username: '<username>',
// 	password: '<password>'
// }, bluemix.getServiceCreds('personality_insights')); // VCAP_SERVICES

// V2 Personality Insight Credentials
const picredentials = extend({
    version: 'v2',
    url: '<url>',
    username: '<username>',
    password: '<password>'
}, bluemix.getServiceCreds('personality_insights')); // VCAP_SERVICES

app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

// Create the service wrapper
const speechToText = watson.speech_to_text(stcredentials);
const personalityInsights = new watson.personality_insights(picredentials);

// Configure express
require('./config/express')(app, speechToText);
require('./config/express')(app, personalityInsights);

// Configure sockets
require('./config/socket')(io, speechToText);


// render index page
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/results', (req, res) => {
  console.log(app.locals.te);
  res.render('results', {results : app.locals.te});
  });

app.post('/results', (req, res) => {
  const te = req.body.results;
  app.locals.te = te;
  res.redirect('/results');
});

app.post('/', (req, res) => {
  personalityInsights.profile(req.body, (err, profile) => {
    if (err) {
      if (err.message){
        err = { error: err.message };
      }
      return res.status(err.code || 500).json(err || 'Error processing the request');
    }
    else {
        return res.json(profile);
    }
  });
});

const port = process.env.VCAP_APP_PORT || 3000;
server.listen(port);
console.log('listening at:', port);


