'use strict';

const app = require('../app.global.js');

const homeComponentApi = function(data) {
  return $.ajax({
    method: "POST",
    url: app.apiUrl + '/api/home',
    data,
  });
};

module.exports = {
  homeComponentApi,
};