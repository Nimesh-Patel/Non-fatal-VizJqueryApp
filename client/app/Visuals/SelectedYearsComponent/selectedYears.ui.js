'use strict';

const selectedYrsTemplate = require('./selectedYears.template.hbs');
const selectedYrsComponentsTemplate = require('./selectedYears.component.hbs');

const renderSelectedYearsTemplate = () => {
    $('#appTemplate').html('').html(selectedYrsTemplate());
}

const renderSelectedYearsComponents = () => {
    $('#visualsTemplate').html('').html(selectedYrsComponentsTemplate());
}

module.exports = {
    renderSelectedYearsTemplate,
    renderSelectedYearsComponents,
};