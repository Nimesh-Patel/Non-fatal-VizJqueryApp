'use strict';

// Require's Bootstra[]
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js');
require('../../node_modules/d3-textwrap/build/d3-textwrap.min.js');
require('moment');
require('d3');
require('../services/jqueryNumber.min.js');

//require('d3');
const _ = require('lodash');
const router = require('./app.router.js');
const events = require('./app.events.js');
const app = require('./app.ui.js');
const global = require('./app.global');

// Document Ready function
$(() => {
  // Render Application Component
  app.renderApplicationTemplate();
  // Initiate Router
  router.Routing();
  // Application Event Handlers
  events.registerEventHandlers();

  global.apiUrl = global.apiUrl + window.VIRTUAL_PATH;
});
