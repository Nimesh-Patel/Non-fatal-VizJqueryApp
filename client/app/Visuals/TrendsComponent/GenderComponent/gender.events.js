'use strict';

const app = require('../../../app.global.js');
const api = require('./gender.api.js');
const ui = require('./gender.ui.js');
const downloads = require('../../../../services/downloads.js');
const services = require('../../services/services.js')

const loadGenderTrendComponent = () => {
    Promise.all([callGenderTrendsData(),
    ])
        .then((res) => {
            genderSubmitBtn();
            app.addProgress();
        })
        .catch((err) => {
            console.error(err);
        });
}

const drawGenderTableView = () => {

    $("#genderTable").show();
    $("#genderTrend").hide();
    let metaData = downloads.getDownloadDataChartMetadata('genderTrend');
    let data = [];
    app.globals.charts.trends.genderTrend.downloadData.forEach((row) => {
        let obj = {};
        metaData.keys.forEach((key) => {
            obj[key] = row[key];
        });
        data.push(obj);
    });

    data.map(item => {
        item.rate = $.number(item.rate, 1);
        item.injuries = $.number(item.injuries, 0);
        item.ageadj = $.number(item.ageadj, 1);
        item.lower = $.number(item.lower, 0);
        item.upper = $.number(item.upper, 0);
    })
    let downloadObj = {
        chart: 'genderTrend',
        rows: data,
        keys: metaData.keys,
        headers: metaData.headers,
    }
    ui.drawGenderTrendsTableView(downloadObj);
    app.registerTableArrowNav('#genderTable');
}

const genderSubmitBtn = () => {
    $("#genderTrendsSubmitBtn").off('click').on('click', function (e) {
        app.globals.charts.trends.genderTrend.metadata.compare = 'Sexlbl';
        app.globals.charts.trends.genderTrend.metadata.colorset = app.globals.palettes.gender;
        app.globals.charts.trends.genderTrend.downloadData = app.globals.charts.trends.genderTrend.data;

        if ($("#genderTrendsViewOption").val() == 'graphic') {
            $("#genderTable").hide();
            $("#genderTrend").show();
            app.globals.charts.trends.genderTrend.metadata.count = $('#genderDropdown :selected').val(); //'injuries';
            ui.buildGenderTrendsChart(app.globals.charts.trends.genderTrend.data);
        }
        else {
            drawGenderTableView();
        }
    });
}

const callGenderTrendsData = () => {
    let genderFilterSet = {
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
        api.callGenderTrendsData(genderFilterSet)
            .then((res) => {
                let responseData = res.responseCode[1].responseData;
                responseData.map(item => {
                    item.injuries = Math.round(item.injuries);
                    item.rate = item.rate;
                    item.ageadj = item.ageadj;
                    item.cv = $.number(item.cv, 3);
                    item.upper = item.upper;
                    item.lower = item.lower;
                    return item;
                });

                app.globals.charts.trends.genderTrend = {};
                app.globals.charts.trends.genderTrend.metadata = {};
                app.globals.charts.trends.genderTrend.metadata.id = '#genderTrend';
                app.globals.charts.trends.genderTrend.metadata.compare = 'Sexlbl';
                app.globals.charts.trends.genderTrend.metadata.group = 'Sexlbl';
                app.globals.charts.trends.genderTrend.metadata.count = $('#genderDropdown :selected').val();
                app.globals.charts.trends.genderTrend.metadata.colorset = app.globals.palettes.gender;
                app.globals.charts.trends.genderTrend.metadata.width = $('#chartContainer_gender').width();
                app.globals.charts.trends.genderTrend.metadata.height = $('#chartContainer_gender').height();

                app.globals.charts.trends.genderTrend.data = responseData;
                app.globals.charts.trends.genderTrend.downloadData = responseData;
                ui.buildGenderTrendsChart(app.globals.charts.trends.genderTrend.data);
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const registerGenderEvents = () => {
    //loadageComponent();
};

module.exports = {
    registerGenderEvents,
    loadGenderTrendComponent,
};