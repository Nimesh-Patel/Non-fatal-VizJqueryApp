'use strict';

const app = require('../../../app.global.js');
const api = require('./disposition.api.js');
const ui = require('./disposition.ui.js');
const downloads = require('../../../../services/downloads.js');

const loadDispositionComponent = () => {
    Promise.all([callDispositionChartData()
    ])
        .then((res) => {
            app.addProgress();
        })
        .catch((err) => {
            console.error(err);
        });
}

const callDispositionChartData = () => {

    let dispositionFilterSet = {
        parameters: {
            intent: String(app.globals.filters.intentId),
            mech: String(app.globals.filters.mechId),
            sex: String(app.globals.filters.sex),
            disp: String(app.globals.filters.disp),
            year1: app.globals.filters.start_year,
            year2: app.globals.filters.end_year,
            traffic: app.globals.filters.traffic,
            racethn: "0",
            agebuttn: "all",
            fiveyr1: app.globals.filters.fiveyr1,
            fiveyr2: app.globals.filters.fiveyr2,
            c_age1: app.globals.filters.c_age1,
            c_age2: app.globals.filters.c_age2,
        }
    }

    return new Promise((resolve, reject) => {
        api.callDistributionByDisposition(dispositionFilterSet)
            .then((res) => {
                let responseData = res.responseCode[1].responseData;
                responseData.map(item => {
                    item.injuries = Math.round(item.injuries);
                    item.ageadj = item.ageadj.toFixed(1);
                    item.cv = item.cv.toFixed(3);
                    item.upper = item.upper;
                    item.lower = item.lower;

                    return item;

                });
                app.globals.charts.disposition.metadata.colorset = app.globals.palettes.disposition;
                app.globals.charts.disposition.metadata.group = 'DISPlbl'
                app.globals.charts.disposition.metadata.count = $('#dispositionDropdown :selected').val();
                app.globals.charts.disposition.metadata.id = '#dispositionChart';
                app.globals.charts.disposition.data = responseData;

                var downloadData = [];
                responseData.forEach(function (record) {
                    if (record.rate == null) {
                        record.rate = 0;
                    }
                    var item = {
                        DISPlbl: record.DISPlbl,
                        injuries: record.injuries,
                        rate: record.rate,
                        ageadj: record.ageadj,
                        cv: record.cv,
                        lower: record.lower,
                        upper: record.upper
                    };
                    downloadData.push(item);
                });
                app.globals.charts.disposition.downloadData = responseData;

                ui.drawDispositionChart(responseData);
                submitDispositionChart(responseData);
                resolve(res);
            })


            .catch((err) => {
                reject(err);
            });
    });
}

const submitDispositionChart = (res) => {
    $("#dispositionSubmitBtn").off('click').on('click', function (e) {
        e.preventDefault();
        app.globals.charts.disposition.metadata.count = $('#dispositionDropdown :selected').val();
        if ($("#dispositionViewOption").val() == 'graphic') {
            $("#dispositionTable").hide();
            $("#dispositionChart").show();
            ui.drawDispositionChart(res);
        }
        else {
            dispositionTableView();
        }
    });
}

const dispositionTableView = () => {
    $("#dispositionTable").show();
    $("#dispositionChart").hide();
    let view;

    if ($('.active-tab-nav-button').data('tab-id') == 'SelectedYears') {
        view = 'SelectedYears';
    }
    else {
        view = 'Trends';
    }

    let metaData = downloads.getDownloadDataChartMetadata('disposition', view);
    let data = [];
    app.globals.charts.disposition.downloadData.forEach((row) => {
        let obj = {};
        metaData.keys.forEach((key) => {
            obj[key] = row[key];
        });
        data.push(obj);
    });
    data.map(item => {
        item.injuries = $.number(item.injuries, 0);
        item.rate = $.number(item.rate, 1);
        item.ageadj = $.number(item.ageadj, 1);
        item.lower = $.number(item.lower, 0);
        item.upper = $.number(item.upper, 0);
    })
    let downloadObj = {
        chart: 'disposition',
        rows: data,
        keys: metaData.keys,
        headers: metaData.headers,
    }
    ui.drawDispositionTable(downloadObj);
    app.registerTableArrowNav('#dispositionTable');
}

module.exports = {
    loadDispositionComponent,
};