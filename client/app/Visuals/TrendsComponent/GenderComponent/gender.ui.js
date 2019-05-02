'use strict';

const sexChart = require('./gender.chart.js');
let app = require('../../../app.global.js');
const tableView = require('../../../app.vizTableComponent.hbs');

const buildGenderTrendsChart = (data) => {
    sexChart.buildGenderTrends(data, app.globals.charts.trends.genderTrend.metadata);
}

const drawGenderTrendsTableView = (data) => {
    $('#genderTable').html('').html(tableView({downloadData:data}));
};

module.exports = {
    buildGenderTrendsChart,
    drawGenderTrendsTableView,
};