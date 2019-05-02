'use strict';

let app = require('../../../app.global.js');
const chart = require('./disposition.chart.js');
const tableView = require('../../../app.vizTableComponent.hbs');

const drawDispositionChart = (data) => {
    chart.buildBubbleChart(data);
};

const drawDispositionTable = (data) => {
    $('#dispositionTable').html('').html(tableView({downloadData:data}));
};

module.exports = {
    drawDispositionChart,
    drawDispositionTable,
}