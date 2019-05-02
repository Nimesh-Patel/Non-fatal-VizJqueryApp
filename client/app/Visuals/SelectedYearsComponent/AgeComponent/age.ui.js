'use strict';

const ageChart = require('./age.chart.js');
let app = require('../../../app.global.js');
const tableView = require('../../../app.vizTableComponent.hbs');

const buildAgeChart = (data) => {
    ageChart.drawAgeChart(data, app.globals.charts.bars.ageBar.metadata);
}

const drawAgeGroupsTable = (data) => {
    $('#ageTable').html('').html(tableView({downloadData:data}));
};

module.exports = {
    buildAgeChart,
    drawAgeGroupsTable,
};