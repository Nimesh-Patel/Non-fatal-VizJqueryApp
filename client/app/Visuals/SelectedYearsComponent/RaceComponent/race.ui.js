'use strict';
const raceChart = require('./race.chart.js');
let app = require('../../../app.global.js');
const tableView = require('../../../app.vizTableComponent.hbs');

const buildRaceChart = (data) => {
    raceChart.drawRaceChart(data, app.globals.charts.bars.ethnBar.metadata);
}

const drawRaceTableView = (data) => {
    $('#raceTable').html('').html(tableView({downloadData:data}));
};

module.exports = {
    buildRaceChart,
    drawRaceTableView,
};