'use strict';

const treemap = require('./treemap.chart.js');
let app = require('../../../app.global.js');
const tableView = require('../../../app.vizTableComponent.hbs');

const drawSelectedYearsTreemap = (data) => {
    treemap.drawTreemap(data, app.globals.charts.treemap.metadata);
}

const drawTreemapTable = (data) => {
    $('#treemapTable').html('').html(tableView({downloadData:data}));
};

module.exports = {
    drawSelectedYearsTreemap,
    drawTreemapTable,
};