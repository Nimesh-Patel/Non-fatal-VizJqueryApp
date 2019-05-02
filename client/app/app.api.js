'use strict';

const app = require('./app.global.js');

const exampleApi = function(data) {
  return $.ajax({
    method: "POST",
    url: app.apiUrl + '/examples',
    data,
  });
};

module.exports = {
  exampleApi,
};