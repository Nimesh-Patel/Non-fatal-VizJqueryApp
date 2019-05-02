'use strict';
const app = require('../../app.global.js');

const buildDownloadData = (data, metadata) => {
    let downloadData;
    downloadData = data;
    downloadData.forEach((record) => {
        let inj, cr, aar, cv, lower, upper, stderr, pop, records;

        if ($.number(record.injuries) < 21) {
            inj = $.number(record.injuries) + "**";
            cr = $.number(record.rate, 1) + "**";
            aar = $.number(record.ageadj, 1) + "**";
            cv = $.number(record.cv, 3) + "**";
            lower = record.lower + "**";
            upper = record.upper + "**";
            pop = $.number(record.pop, 0 + "**");
            stderr = $.number(record.stderr, 1 + "**");
            records = $.number(record.records, 0 + "**");
        } else {
            inj = $.number(record.injuries);
            cr = $.number(record.rate, 1);
            aar = $.number(record.ageadj, 1);
            cv = $.number(record.cv, 3);
            lower = record.lower;
            upper = record.upper;
            pop = $.number(record.pop, 0);
            stderr = $.number(record.stderr, 1);
            records = $.number(record.records, 0);
        }
        record.injuries = inj;
        record.rate = cr;
        record.ageadj = aar;
        record.cv = cv;
        record.lower = lower;
        record.upper = upper;
        record.stderr = stderr;
        record.pop = pop;
        record.records = records;
        //  delete record.secondarySuppressed;
        // delete record.suppressed;
    });
    return downloadData;
}

const buildDownloadDataStatsRibbon = (data, metadata) => {
    let downloadData;
    downloadData = data;
    downloadData.forEach((record) => {
        let inj, cr, aar, cv, lower, upper, stderr, pop, records;

        if ($.number(record.injuries) < 21) {
            inj = $.number(record.injuries) + "**";
            cr = $.number(record.rate, 1) + "**";

            if (app.globals.filters.groupby1 == 'AGEGP') {
                aar = $.number(record.ageadj, 1) + "**";
            }
            else{
                aar = "N/A";
            }

            cv = $.number(record.cv, 3) + "**";
            lower = $.number(record.lower, 0) + "**";
            upper = $.number(record.upper, 0) + "**";
            pop = $.number(record.pop, 0) + "**";
            stderr = $.number(record.stderr, 0) + "**";
            records = $.number(record.records, 0) + "**";
        } else {
            inj = $.number(record.injuries);
            cr = $.number(record.rate, 1);

            if (app.globals.filters.groupby1 == 'AGEGP') {
                aar = $.number(record.ageadj, 1);
            }
            else{
                aar = "N/A";
            }

            cv = $.number(record.cv, 3);
            lower = $.number(record.lower, 0);
            upper = $.number(record.upper, 0);
            pop = $.number(record.pop, 0);
            stderr = $.number(record.stderr, 0);
            records = $.number(record.records, 0);
        }
        record.injuries = inj;
        record.rate = cr;
        record.ageadj = aar;
        record.cv = cv;
        record.lower = lower;
        record.upper = upper;
        record.stderr = stderr;
        record.pop = pop;
        record.records = records;
        //  delete record.secondarySuppressed;
        // delete record.suppressed;
    });
    return downloadData;
}

module.exports = {
    buildDownloadData,
    buildDownloadDataStatsRibbon,
}