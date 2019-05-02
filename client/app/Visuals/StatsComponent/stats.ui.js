'use strict';

const app =  require('../../app.global.js');
const statsRibbonTemplate = require('../statsRibbon.component.hbs');
const advancedStatsTemplate = require('../advancedStats.component.hbs');

const renderStatsRibbon = (data) => {
    $('#nonFatalStatRibbon').html('').html(statsRibbonTemplate({stat: data[0]}));
}

const renderAdvancedStats = (data) => {
    $('#nonFatalAdvancedStatRibbon').html('').html(advancedStatsTemplate({stat: data[0]}));
}

module.exports = {
    renderStatsRibbon,
    renderAdvancedStats
}