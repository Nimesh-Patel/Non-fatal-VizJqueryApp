'use strict';

const template = require('./home.component.hbs');

const renderHomeTemplate = () => {
  $('#appTemplate').html('');
  $('#appTemplate').html(template({ virtualPath: window.VIRTUAL_PATH }));
};

module.exports = {
  renderHomeTemplate
};
