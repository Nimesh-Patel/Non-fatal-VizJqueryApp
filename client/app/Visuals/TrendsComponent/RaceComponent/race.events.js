'use strict';

const app = require('../../../app.global.js');
const api = require('./race.api.js');
const ui = require('./race.ui.js');
const downloads = require('../../../../services/downloads.js');
const services = require('../../services/services.js')

const loadRaceTrendComponent = () => {
    Promise.all([callRaceTrendsData(),
    ])
        .then((res) => {
            raceSubmitBtn();
            app.addProgress();
        })
        .catch((err) => {
            console.error(err);
        });
}

const drawRaceTableView = () => {

    $("#raceTable").show();
    $("#ethnTrend").hide();
    let metaData = downloads.getDownloadDataChartMetadata('ethnTrend');
    let data = [];
    app.globals.charts.trends.ethnTrend.downloadData.forEach((row) => {
        let obj = {};
        metaData.keys.forEach((key) => {
            obj[key] = row[key];
        });
        data.push(obj);
    });
    data.map(item => {
        item.injuries = $.number(item.injuries, 0);
        item.lower = $.number(item.lower, 0);
        item.upper = $.number(item.upper, 0);
    })
    let downloadObj = {
        chart: 'ethnTrend',
        rows: data,
        keys: metaData.keys,
        headers: metaData.headers,
    }
    ui.drawRaceTableView(downloadObj);
    app.registerTableArrowNav('#raceTable');
}


const raceSubmitBtn = () => {
    $("#trendsRaceSubmitBtn").off('click').on('click', function (e) {
        app.globals.charts.trends.ethnTrend.metadata.compare = 'Racelbl';
        app.globals.charts.trends.ethnTrend.metadata.colorset = app.globals.palettes.trends;
        app.globals.charts.trends.ethnTrend.downloadData = app.globals.charts.trends.ethnTrend.data;

        if ($("#raceTrendsViewOption").val() == 'graphic') {
            $("#raceTable").hide();
            $("#ethnTrend").show();
            app.globals.charts.trends.ethnTrend.metadata.count = $('#raceDropdown :selected').val(); //'injuries';
            ui.buildRaceTrendsChart(app.globals.charts.trends.ethnTrend.data);
        }
        else {
            drawRaceTableView();
        }
    });
}

const callRaceTrendsData = () => {
    let raceFilterSet = {
        parameters: {
            intent: String(app.globals.filters.intentId),
            mech: String(app.globals.filters.mechId),
            sex: String(app.globals.filters.sex),
            disp: String(app.globals.filters.disp),
            year1: app.globals.filters.start_year,
            year2: app.globals.filters.end_year,
            traffic: app.globals.filters.traffic,
            racethn: "0",
            agebuttn: app.globals.filters.agebuttn,
            fiveyr1: app.globals.filters.fiveyr1,
            fiveyr2: app.globals.filters.fiveyr2,
            c_age1: app.globals.filters.c_age1,
            c_age2: app.globals.filters.c_age2
        }
    }

    return new Promise((resolve, reject) => {
        api.callRaceTrendsData(raceFilterSet)
            .then((res) => {
                let responseData = res.responseCode[1].responseData;
                responseData.map(item => {
                    item.injuries = Math.round(item.injuries);
                    item.rate = $.number(item.rate, 2);
                    item.ageadj = $.number(item.ageadj, 2);
                    item.cv = $.number(item.cv, 3);
                    item.upper = item.upper;
                    item.lower = item.lower;
                    return item;

                });
                app.globals.charts.trends.ethnTrend = {};
                app.globals.charts.trends.ethnTrend.metadata = {};
                app.globals.charts.trends.ethnTrend.metadata.id = '#ethnTrend';
                app.globals.charts.trends.ethnTrend.metadata.compare = 'Racelbl';
                app.globals.charts.trends.ethnTrend.metadata.group = 'Racelbl';
                app.globals.charts.trends.ethnTrend.metadata.count = $('#raceDropdown :selected').val();
                app.globals.charts.trends.ethnTrend.metadata.colorset = app.globals.palettes.trends;
                app.globals.charts.trends.ethnTrend.metadata.width = $('#chartContainer_raceGroup').width();
                app.globals.charts.trends.ethnTrend.metadata.height = $('#chartContainer_raceGroup').height();

                app.globals.charts.trends.ethnTrend.data = responseData;
                app.globals.charts.trends.ethnTrend.downloadData = responseData;
                ui.buildRaceTrendsChart(app.globals.charts.trends.ethnTrend.data);
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });

}

const registerRaceEvents = () => {
};

module.exports = {
    registerRaceEvents,
    loadRaceTrendComponent,
};