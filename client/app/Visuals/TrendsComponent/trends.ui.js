'use strict';

const trendsTemplate = require('./trends.template.hbs');
const trendsComponentsTemplate = require('./trends.component.hbs');

const renderTrendsTemplate = () => {
    $('#appTemplate').html('').html(trendsTemplate());
}

const renderTrendsComponents = () => {
    $('#visualsTemplate').html('').html(trendsComponentsTemplate());
}

module.exports = {
    renderTrendsTemplate,
    renderTrendsComponents,
};