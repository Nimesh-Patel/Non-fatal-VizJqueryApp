'use strict';

const app = require('../../../app.global.js');
const api = require('./age.api.js');
const ui = require('./age.ui.js');
const downloads = require('../../../../services/downloads.js');
const services = require('../../services/services.js');

const loadAgeTrendComponent = () => {
    Promise.all([callAgeTrendsData(),
    ])
        .then((res) => {
            ageSubmitBtn();
            app.addProgress();
        })
        .catch((err) => {
            console.error(err);
        });
}

const ageGroupTableView = () => {
    $("#ageTrend").hide();
    $("#ageTrendTable").show();
    let view;
    if ($('.active-tab-nav-button').data('tab-id') == 'SelectedYears') {
        view = 'SelectedYears';
    }
    else {
        view = 'Trends';
    }
    let metaData = downloads.getDownloadDataChartMetadata('ageTrend', view);
    let data = [];
    app.globals.charts.trends.ageTrend.downloadData.forEach((row) => {
        let obj = {};
        metaData.keys.forEach((key) => {
            obj[key] = row[key];
        });
        data.push(obj);
    });
    data.map(item => {
        item.rate = $.number(item.rate, 1);
        item.injuries = $.number(item.injuries, 0);
        item.lower = $.number(item.lower, 0);
        item.upper = $.number(item.upper, 0);
    })
    let downloadObj = {
        chart: 'ageTrend',
        rows: data,
        keys: metaData.keys,
        headers: metaData.headers,
    }
    ui.drawAgeGroupsTable(downloadObj);
    app.registerTableArrowNav('#ageTrendTable');
}

const ageSubmitBtn = () => {
    $("#trendsAgeSubmitBtn").off('click').on('click', function (e) {
        app.globals.charts.trends.ageTrend.metadata.compare = 'agegp';
        app.globals.charts.trends.ageTrend.metadata.colorset = app.globals.palettes.trends;
        app.globals.charts.trends.ageTrend.metadata.count = $('#ageDropdown :selected').val();
        app.globals.charts.trends.ageTrend.downloadData = app.globals.charts.trends.ageTrend.data;

        if ($("#ageTrendsViewOption").val() == 'graphic') {
            $("#ageTrendTable").hide();
            $("#ageTrend").show();
            ui.buildAgeTrendsChart(app.globals.charts.trends.ageTrend.data);
        }
        else {
            ageGroupTableView();
        }
    });
}

const callAgeTrendsData = () => {

    let ageFilterSet = {
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
            c_age2: app.globals.filters.c_age2,
            groupby1: app.globals.filters.groupby1
        }
    }

    return new Promise((resolve, reject) => {
        api.callAgeTrendsData(ageFilterSet)
            .then((res) => {
                let responseData = res.responseCode[1].responseData;
                responseData.map(item => {
                    item.injuries = Math.round(item.injuries);
                    item.rate = item.rate;
                    //  item.ageadj = $.number(item.ageadj, 2);
                    item.cv = $.number(item.cv, 3);
                    item.upper = item.upper;
                    item.lower = item.lower;
                    return item;

                });
                app.globals.charts.trends.ageTrend = {};
                app.globals.charts.trends.ageTrend.metadata = {};
                app.globals.charts.trends.ageTrend.metadata.id = '#ageTrend';
                app.globals.charts.trends.ageTrend.metadata.compare = 'agegp';
                app.globals.charts.trends.ageTrend.metadata.group = 'agegp';
                app.globals.charts.trends.ageTrend.metadata.count = $('#ageDropdown :selected').val();
                app.globals.charts.trends.ageTrend.metadata.colorset = app.globals.palettes.trends;
                app.globals.charts.trends.ageTrend.metadata.width = $('#chartContainer_age').width();
                app.globals.charts.trends.ageTrend.metadata.height = $('#chartContainer_age').height();

                app.globals.charts.trends.ageTrend.data = responseData;
                app.globals.charts.trends.ageTrend.downloadData = responseData;

                ui.buildAgeTrendsChart(responseData);


                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });

}


const registerAgeEvents = () => {
    //loadageComponent();

};

module.exports = {
    registerAgeEvents,
    loadAgeTrendComponent,
};