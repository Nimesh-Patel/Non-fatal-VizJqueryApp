'use strict';

const notFoundTemplate = require('./404.component.hbs');

const renderNotFound = () => {
    $('#appTemplate').html('');
    $('#appTemplate').html(notFoundTemplate());
}

module.exports = {
    renderNotFound,
}