'use strict';

const app = require('../../app.global.js');
const api = require('./stats.api.js');
const ui = require('./stats.ui.js');
const toastr = require('toastr');
const services = require('../services/services.js');

const getStatRibbonData = () => {
    let statsFilterSet = {
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
        api.getStatsRibbonData(statsFilterSet)
            .then((res) => {
                let responseData = res.responseCode[1].responseData;
                //  res = checkSuppression(res);
                var data = [];
                responseData.forEach(function (record) {
                    var item = {
                        injuries: record.injuries,
                        rate: record.rate,
                        ageadj: record.ageadj,
                        cv: record.cv,
                        lower: record.lower,
                        upper: record.upper,
                        pop: record.pop,
                        stderr: record.stderr,
                        records: record.records,
                    };
                    data.push(item);
                });
                data = services.buildDownloadDataStatsRibbon(data);
                ui.renderStatsRibbon(data);
                ui.renderAdvancedStats(data);

                resolve(res);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

const buildStatsRibbonComponent = () => {
    return Promise.all([getStatRibbonData(),])
        .then(() => {
            app.addProgress();
        })
        .catch((err) => {
            console.error(err);
            toastr.options = app.toastrOptions;
            toastr.error('Something went wrong. Unable to get Stats Ribbon data.');
        });
}

const registerRibbonComponentEvents = () => {
    // events for Stats Ribbon
}

module.exports = {
    registerRibbonComponentEvents,
    buildStatsRibbonComponent,
}