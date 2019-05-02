'use strict';

const app =  require('../../app.global.js');
const causeOfInjuryTemplate = require('./causeOfInjury.hbs');
const dispositionTemplate = require('./disposition.hbs');
const genderTemplate = require('./gender.hbs');
const agesTemplate = require('./age.hbs');
const yearsTemplate = require('./years.hbs');
const trafficTemplate = require('./traffic.hbs');

const renderCauseOfInjury = (data) => {
    $('#breadcrumbsResults').append(causeOfInjuryTemplate({causesOfInjury: data}));
}

const renderDispositions = (data) => {
    $('#breadcrumbsResults').append(dispositionTemplate({dispositions: data}));
}

const renderGenders = (data) => {
    $('#breadcrumbsResults').append(genderTemplate({genders: data}));
}

const renderAges = (data) => {
    $('#breadcrumbsResults').append(agesTemplate({ages: data}));
}

const renderYears = (data) => {
    $('#breadcrumbsResults').append(yearsTemplate({years: data}));
}

const renderTraffic = (data) => {
    $('#breadcrumbsResults').append(trafficTemplate({traffic: data}));
}

module.exports = {
    renderCauseOfInjury,
    renderDispositions,
    renderGenders,
    renderAges,
    renderYears,
    renderTraffic,
}