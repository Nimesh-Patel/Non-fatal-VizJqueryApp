'use strict';

let loadingTemplate = require('./loading.component.hbs');

let renderLoading = () => {
    $('#appTemplate').html('');
    $('#appTemplate').html(loadingTemplate());
}

module.exports = {
    renderLoading,
}