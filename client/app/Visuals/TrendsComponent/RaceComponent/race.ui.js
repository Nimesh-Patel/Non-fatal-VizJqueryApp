'use strict';

const raceChart = require('./race.chart.js');
let app = require('../../../app.global.js');
const tableView = require('../../../app.vizTableComponent.hbs');

const buildRaceTrendsChart = (data) => {
    raceChart.buildRaceTrends(data, app.globals.charts.trends.ethnTrend.metadata);
}

const drawRaceTableView = (data) => {
    $('#raceTable').html('').html(tableView({downloadData:data}));
};

module.exports = {
    drawRaceTableView,
    buildRaceTrendsChart,
};