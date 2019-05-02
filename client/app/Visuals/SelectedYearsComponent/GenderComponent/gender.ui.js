'use strict';

const genderChart = require('./gender.chart.js');
let app = require('../../../app.global.js');
const tableView = require('../../../app.vizTableComponent.hbs');

const drawSelectedYearsGenderChart = (data) => {
    genderChart.drawGenderChart(data, app.globals.charts.bars.genderBar.metadata);
}

const drawGenderTable = (data) => {
    $('#genderTable').html('').html(tableView({downloadData:data}));
};

module.exports = {
    drawSelectedYearsGenderChart,
    drawGenderTable,
};