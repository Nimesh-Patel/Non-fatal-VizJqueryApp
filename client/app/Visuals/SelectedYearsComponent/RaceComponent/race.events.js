'use strict';
const app = require('../../../app.global.js');
const api = require('./race.api.js');
const ui = require('./race.ui.js');
const downloads = require('../../../../services/downloads.js');
const services = require('../../services/services.js')

const loadRaceComponent = () => {
    Promise.all([callRaceChartNoSexData(),
    callRaceCharSexData(),
    ])
        .then((res) => {
            raceSubmitBtn();
            app.addProgress();
        })
        .catch((err) => {
            console.error(err);
        });
}
const raceSubmitBtn = () => {
    $("#raceSubmitBtn").off('click').on('click', function (e) {
        let raceBreakdownBySex = $('#chkRaceSex').is(':checked');

        if (raceBreakdownBySex) {
            app.globals.charts.bars.ethnBar.metadata.compare = 'Sexlbl';
            app.globals.charts.bars.ethnBar.metadata.colorset = app.globals.palettes.testing;
            app.globals.charts.bars.ethnBar.data = app.globals.charts.bars.ethnBar.sexData;
            app.globals.charts.bars.ethnBar.downloadData = app.globals.charts.bars.ethnBar.sexData;
        }
        else {
            app.globals.charts.bars.ethnBar.metadata.compare = 'Racelbl';
            app.globals.charts.bars.ethnBar.metadata.colorset = app.globals.palettes.trends;
            app.globals.charts.bars.ethnBar.data = app.globals.charts.bars.ethnBar.noSexData;
            app.globals.charts.bars.ethnBar.downloadData = app.globals.charts.bars.ethnBar.noSexData;
        }

        if ($("#raceViewOption").val() == 'graphic') {
            app.globals.charts.bars.ethnBar.metadata.count = $('#raceDropdown :selected').val();
            $("#raceTable").hide();
            $("#ethnBar").show();
            ui.buildRaceChart(app.globals.charts.bars.ethnBar.data);
        }
        else {
            if ($('#chartContainer_race').is(":visible")) {
                raceTableView();
            }
        }
    });
}

const checkRaceBreakdownBySex = () => {
    let buildData;
    let breakdownBySex = $('#chkRaceSex').is(':checked');

    if (breakdownBySex) {
        buildData = app.globals.charts.bars.ethnBar.sexData;
        app.globals.charts.bars.ethnBar.metadata.compare = 'Sexlbl';
        app.globals.charts.bars.ethnBar.metadata.colorset = app.globals.palettes.testing;
        app.globals.charts.bars.ethnBar.downloadData = app.globals.charts.bars.ethnBar.sexData;
        app.globals.charts.bars.ethnBar.data = app.globals.charts.bars.ethnBar.sexData;
    } else {
        buildData = app.globals.charts.bars.ethnBar.noSexData;
        app.globals.charts.bars.ethnBar.metadata.compare = 'Racelbl';
        app.globals.charts.bars.ethnBar.metadata.colorset = app.globals.palettes.trends;
        app.globals.charts.bars.ethnBar.downloadData = app.globals.charts.bars.ethnBar.noSexData;
        app.globals.charts.bars.ethnBar.data = app.globals.charts.bars.ethnBar.noSexData;
    }
    app.globals.charts.bars.ethnBar.downloadData = buildData;
    if ($("#raceViewOption").val() == 'graphic') {
        $("#raceTable").hide();
        $("#ethnBar").show();
        ui.buildRaceChart(app.globals.charts.bars.ethnBar.data);
    }
    else {
        if ($('#chartContainer_race').is(":visible")) {
            raceTableView();
        }
    }
};

const raceTableView = () => {
    $("#raceTable").show();
    $("#ethnBar").hide();
    let view;

    if ($('.active-tab-nav-button').data('tab-id') == 'SelectedYears') {
        view = 'SelectedYears';
    }
    else {
        view = 'Trends';
    }

    let metaData = downloads.getDownloadDataChartMetadata('ethnBar', view);
    let data = [];
    app.globals.charts.bars.ethnBar.downloadData.forEach((row) => {
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
        chart: 'ethnBar',
        rows: data,
        keys: metaData.keys,
        headers: metaData.headers,
    }
    ui.drawRaceTableView(downloadObj);
    app.registerTableArrowNav('#raceTable');
}

const callRaceChartNoSexData = () => {
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
        api.callDistributionByRaceNoSex(raceFilterSet)
            .then((res) => {

                let responseData = res.responseCode[1].responseData;
                responseData.map(item => {
                    item.injuries = Math.round(item.injuries);
                    item.rate = Math.round(item.rate, 2);// $.number(item.rate, 2);
                    item.ageadj = Math.round(item.ageadj, 2); //$.number(item.ageadj, 2)
                    item.cv = $.number(item.cv, 3);
                    item.upper = item.upper;
                    item.lower = item.lower;
                    return item;

                });
                // app.globals.charts.bars.ethnBar = {};
                // app.globals.charts.bars.ethnBar.metadata = {};
                app.globals.charts.bars.ethnBar.metadata.id = '#ethnBar';;
                app.globals.charts.bars.ethnBar.metadata.compare = 'Racelbl';
                app.globals.charts.bars.ethnBar.metadata.group = 'Racelbl';
                app.globals.charts.bars.ethnBar.metadata.count = $('#raceDropdown :selected').val();
                app.globals.charts.bars.ethnBar.metadata.colorset = app.globals.palettes.trends;
                app.globals.charts.bars.ethnBar.metadata.width = $('#chartContainer_race').width();


                app.globals.charts.bars.ethnBar.noSexData = responseData;
                checkRaceBreakdownBySex();
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const callRaceCharSexData = () => {

    let ageSexFilterSet = {
        parameters: {
            intent: String(app.globals.filters.intentId),
            mech: String(app.globals.filters.mechId),
            sex: String(app.globals.filters.sex),
            disp: String(app.globals.filters.disp),
            year1: "2015",
            year2: "2015",
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
        api.callDistributionByRaceSex(ageSexFilterSet)
            .then((res) => {
                let responseData = res.responseCode[1].responseData;
                responseData.map(item => {
                    item.injuries = item.injuries;
                    item.rate = Math.round(item.rate, 2);// $.number(item.rate, 2);
                    item.ageadj = Math.round(item.ageadj, 2); //$.number(item.ageadj, 2)
                    item.cv = $.number(item.cv, 3);
                    item.upper = item.upper;
                    item.lower = item.lower;
                    return item;
                });
                app.globals.charts.bars.ethnBar.sexData = responseData;
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });

}

const registerRaceEvents = () => {
    //loadGenderComponent();
};
module.exports = {
    registerRaceEvents,
    loadRaceComponent,
};