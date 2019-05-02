'use strict';

const appTemplate = require('./app.component.hbs');

const renderApplicationTemplate = () => {
  $('main').html('');
  $('main').html(appTemplate({ virtualPath: window.VIRTUAL_PATH }));
};

module.exports = {
  renderApplicationTemplate
};
