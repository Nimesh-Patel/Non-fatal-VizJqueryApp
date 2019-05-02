'use strict';

const app = require('./app.global.js');
const Loading = require('./Loading/loading.events.js');
const notFound = require('./404/404.events.js');
const events = require('./app.events.js');
const Navigo = require('navigo');
const ROUTES = require('./routes.js');
const root = app.hostUrl;
const useHash = true;
const hash = '#!';
let router;

const getCurrentUrl = () => {
  return window.location.pathname;
};

const getInitialRoute = (route) => {
  //router.navigate(route);
  $('.loading-overlay').hide();
  $('.loading-checking-overlay').hide();
  app.router.navigate('/landing');

};

// let routeViewBuildout = (template) => {
const routeViewBuildout = (route) => {
  Loading.renderLoadingTemplate();
  events.generateView(route);
};

const generateRoutes = (router) => {
  let routeObj = {};
  ROUTES.forEach((route) => {
    routeObj[`${route.path}`] = function() { routeViewBuildout(route);};
  });
  router.on(routeObj).resolve();
};

const Routing = function() {
  router = new Navigo(root, useHash, hash);
  app.router = router;
  generateRoutes(router);
  router.notFound(function () {notFound.renderNotFoundTemplate();});
  getInitialRoute(getCurrentUrl());
};

module.exports = {
  Routing,
};