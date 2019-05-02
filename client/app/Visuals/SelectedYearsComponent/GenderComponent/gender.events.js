'use strict';

let app = require('../../../app.global.js');
const api = require('./gender.api.js');
const ui = require('./gender.ui.js');
const downloads = require('../../../../services/downloads.js');
const services = require('../../services/services.js')

const loadGenderComponent = () => {
    Promise.all([getGenderChartData()
    ])
        .then((res) => {
            genderSubmitBtn();
            app.addProgress();
        })
        .catch((err) => {
            console.error(err);
        });
}

const genderSubmitBtn = () => {
    $("#genderSubmitBtn").off('click').on('click', function (e) {

        if ($("#genderViewOption").val() == 'graphic') {
            $("#genderTable").hide();
            $("#genderBar").show();
            app.globals.charts.bars.genderBar.metadata.count = $('#genderDropdown :selected').val();
            ui.drawSelectedYearsGenderChart(app.globals.charts.bars.genderBar.data);

        }
        else {
            genderTableView();
        }

    });
}

const genderTableView = () => {
    $("#genderTable").show();
    $("#genderBar").hide();
    let view;
    if ($('.active-tab-nav-button').data('tab-id') == 'SelectedYears') {
        view = 'SelectedYears';
    }
    else {
        view = 'Trends';
    }

    let metaData = downloads.getDownloadDataChartMetadata('genderBar', view);
    let data = [];
    app.globals.charts.bars.genderBar.downloadData.forEach((row) => {
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
        chart: 'genderBar',
        rows: data,
        keys: metaData.keys,
        headers: metaData.headers,
    }
    ui.drawGenderTable(downloadObj);
    app.registerTableArrowNav('#genderTable');
}


const getGenderChartData = () => {

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
        api.getDistributionByGender(genderFilterSet)
            .then((res) => {
                let responseData = res.responseCode[1].responseData;
                responseData.forEach(item => {
                    item.injuries = Math.round(item.injuries);
                    item.ageadj = item.ageadj;
                    item.rate = item.rate;
                    item.cv = $.number(item.cv, 3);
                    item.upper = item.upper;
                    item.lower = item.lower;
                });

                app.globals.charts.bars.genderBar = {};
                app.globals.charts.bars.genderBar.metadata = {};
                app.globals.charts.bars.genderBar.metadata.id = '#genderBar';
                app.globals.charts.bars.genderBar.metadata.group = 'Sexlbl';
                app.globals.charts.bars.genderBar.metadata.count = $('#genderDropdown :selected').val();
                app.globals.charts.bars.genderBar.metadata.colorset = app.globals.palettes.genderReverse; // reverse because bars are sorted
                app.globals.charts.bars.genderBar.metadata.width = $('#chartContainer_gender').width();
                app.globals.charts.bars.genderBar.data = responseData;

                var downloadData = [];
                responseData.forEach(function (record) {
                    var item = {
                        Sexlbl: record.Sexlbl,
                        injuries: record.injuries,
                        rate: record.rate,
                        ageadj: record.ageadj,
                        cv: record.cv,
                        lower: record.lower,
                        upper: record.upper
                    };
                    downloadData.push(item);
                });
                app.globals.charts.bars.genderBar.downloadData = services.buildDownloadData(downloadData);
                app.globals.charts.bars.genderBar.downloadData = downloadData;

                ui.drawSelectedYearsGenderChart(responseData);
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const registerGenderEvents = () => {
    //loadGenderComponent();

};

module.exports = {
    registerGenderEvents,
    loadGenderComponent,
};