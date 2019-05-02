'use strict';

const app = require('../../../app.global.js');
const api = require('./age.api.js');
const ui = require('./age.ui.js');
const downloads = require('../../../../services/downloads.js');
const services = require('../../services/services.js')

const loadAgeComponent = () => {
    Promise.all([callAgeChartDataNoSex(),
    callAgeChartDataSex(),
    ])
        .then((res) => {
            ageSubmitBtn();
            app.addProgress();
        })
        .catch((err) => {
            console.error(err);
        });
}

const checkSexBreakdown = () => {
    let buildData;
    let breakdownBySex = $('#chkAgeSex').is(':checked');

    if (breakdownBySex) {
        buildData = app.globals.charts.bars.ageBar.sexData;
        app.globals.charts.bars.ageBar.metadata.compare = 'Sexlbl';
        app.globals.charts.bars.ageBar.metadata.colorset = app.globals.palettes.testing;
        app.globals.charts.bars.ageBar.downloadData = app.globals.charts.bars.ageBar.sexData;
        app.globals.charts.bars.ageBar.data = app.globals.charts.bars.ageBar.sexData;


    } else {
        buildData = app.globals.charts.bars.ageBar.noSexData;
        app.globals.charts.bars.ageBar.metadata.compare = 'agegp';
        app.globals.charts.bars.ageBar.metadata.colorset = app.globals.palettes.trends;
        app.globals.charts.bars.ageBar.downloadData = app.globals.charts.bars.ageBar.noSexData;
        app.globals.charts.bars.ageBar.data = app.globals.charts.bars.ageBar.noSexData;
    }
    app.globals.charts.bars.ageBar.downloadData = buildData;
    if ($("#ageViewOption").val() == 'graphic') {
        $("#ageTable").hide();
        $("#ageBar").show();
        ui.buildAgeChart(app.globals.charts.bars.ageBar.data);
    }
    else {
        if ($('#chartContainer_age').is(":visible")) {
            ageGroupTableView();
        }
    }
};

const ageGroupTableView = () => {
    $("#ageTable").show();
    $("#ageBar").hide();
    let view;

    if ($('.active-tab-nav-button').data('tab-id') == 'SelectedYears') {
        view = 'SelectedYears';
    }
    else {
        view = 'Trends';
    }

    let metaData = downloads.getDownloadDataChartMetadata('ageBar', view);
    let data = [];
    app.globals.charts.bars.ageBar.downloadData.forEach((row) => {
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
        chart: 'ageBar',
        rows: data,
        keys: metaData.keys,
        headers: metaData.headers,
    }
    ui.drawAgeGroupsTable(downloadObj);
    app.registerTableArrowNav('#ageTable');
}

const ageSubmitBtn = () => {
    $("#ageSubmitBtn").off('click').on('click', function (e) {

        let ageBreakdownBySex = $('#chkAgeSex').is(':checked');

        if (ageBreakdownBySex) {
            app.globals.charts.bars.ageBar.metadata.compare = 'Sexlbl';
            app.globals.charts.bars.ageBar.metadata.colorset = app.globals.palettes.testing;
            app.globals.charts.bars.ageBar.data = app.globals.charts.bars.ageBar.sexData;
            app.globals.charts.bars.ageBar.downloadData = app.globals.charts.bars.ageBar.sexData;
        }
        else {
            app.globals.charts.bars.ageBar.metadata.compare = 'agegp';
            app.globals.charts.bars.ageBar.metadata.colorset = app.globals.palettes.trends;
            app.globals.charts.bars.ageBar.data = app.globals.charts.bars.ageBar.noSexData;
            app.globals.charts.bars.ageBar.downloadData = app.globals.charts.bars.ageBar.noSexData;
        }

        if ($("#ageViewOption").val() == 'graphic') {

            app.globals.charts.bars.ageBar.metadata.count = $('#ageDropdown :selected').val();
            $("#ageTable").hide();
            $("#ageBar").show();
            ui.buildAgeChart(app.globals.charts.bars.ageBar.data);
        }
        else {

            if ($('#chartContainer_age').is(":visible")) {
                ageGroupTableView();
            }
        }
    });
}

const callAgeChartDataNoSex = () => {

    let ageNoSexFilterSet = {
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
    };

    return new Promise((resolve, reject) => {
        api.callDistributionByAgeNoSex(ageNoSexFilterSet)
            .then((res) => {
                let responseData = res.responseCode[1].responseData;
                responseData.map(item => {
                    item.injuries = Math.round(item.injuries);
                    item.rate = item.rate;
                    item.cv = $.number(item.cv, 3);
                    item.upper = item.upper;
                    item.lower = item.lower;
                    return item;

                });
                // app.globals.charts.bars.ageBar = {};
                // app.globals.charts.bars.ageBar.metadata = {};
                app.globals.charts.bars.ageBar.metadata.id = '#ageBar';
                app.globals.charts.bars.ageBar.metadata.compare = 'agegp';
                app.globals.charts.bars.ageBar.metadata.group = 'agegp';
                app.globals.charts.bars.ageBar.metadata.count = $('#ageDropdown :selected').val();
                app.globals.charts.bars.ageBar.metadata.colorset = app.globals.palettes.trends;
                app.globals.charts.bars.ageBar.metadata.width = $('#chartContainer_age').width();
                app.globals.charts.bars.ageBar.metadata.height = $('#chartContainer_age').height();

                app.globals.charts.bars.ageBar.noSexData = responseData;
                checkSexBreakdown();

                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });

}

const callAgeChartDataSex = () => {

    let ageSexFilterSet = {
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
    };

    return new Promise((resolve, reject) => {
        api.callDistributionByAgeSex(ageSexFilterSet)
            .then((res) => {
                let responseData = res.responseCode[1].responseData;
                responseData.map(item => {
                    item.injuries = Math.round(item.injuries);
                    item.rate = item.rate
                    item.cv = $.number(item.cv, 3);
                    item.upper = item.upper;
                    item.lower = item.lower;
                    return item;
                });
                //  app.globals.charts.bars.ageBar.metadata.colorset = app.globals.palettes.trends;
                app.globals.charts.bars.ageBar.sexData = responseData;

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
    loadAgeComponent,
};