'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const knexConfig = require('./config/knex.js').selectedConfig;
const helmet = require('helmet');
var cluster = require('cluster');
var cfg = require('./config/config');
var expressHbs = require('express-handlebars');

var virtualPath = cfg.virtual_path;

if (cluster.isMaster) {
  var numWorkers = require('os').cpus().length;

  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  cluster.on('online', function(worker) {
    console.log(worker.process.pid + ' is online');
  });
  cluster.on('exit', function(worker, code, signal) {
    console.log(
      worker.process.pid +
        ' died with code: ' +
        code +
        ' , and signal: ' +
        signal
    );
    console.log('Starting new worker');
    cluster.fork();
  });
} else {
  /*
   * Config for Production and Development
   */
  //adding for Strict-Transport-Security
  app.use(
    helmet.hsts({
      maxAge: 7776000000,
      includeSubdomains: true
    })
  );
  //disable powered by header
  app.disable('x-powered-by');
  /*
   * Config for Production and Development
   */
  app.use(cors());
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  // // Locate the assets
  //   app.use(express.static(path.join(__dirname, '../')));

  app.engine(
    '.hbs',
    expressHbs({
      // Default Layout and locate layouts and partials
      extname: '.hbs',
      defaultLayout: 'index',
      layoutsDir: './client/app/',
      partialsDir: './client/app/'
    })
  );
  // Locate the views
  app.set('views', './client/app');

  app.set('view engine', '.hbs');

  app.use(
    virtualPath + '/client',
    express.static(path.join(__dirname, '../client'))
  );
  app.use(
    virtualPath + '/public',
    express.static(path.join(__dirname, '../public'))
  );

  app.use(router);

  require('./router/routes.js')(router, virtualPath);

  //Set API port
  app.set('port', knexConfig.port);

  //Listen on the port
  app.listen(app.get('port'), function() {
    console.log(`Node App Started on Port ${knexConfig.port}`);
  });
}
