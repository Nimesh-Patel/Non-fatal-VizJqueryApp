'use strict';

const ageChart = require('./age.chart.js');
let app = require('../../../app.global.js');
const tableView = require('../../../app.vizTableComponent.hbs');

const buildAgeTrendsChart = (data) => {
    ageChart.buildAgeTrends(data, app.globals.charts.trends.ageTrend.metadata);
}

const drawAgeGroupsTable = (data) => {
    $('#ageTrendTable').html('').html(tableView({downloadData:data}));
};

module.exports = {
    buildAgeTrendsChart,
    drawAgeGroupsTable,
};