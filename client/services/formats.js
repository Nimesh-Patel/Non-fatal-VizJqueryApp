'use strict';

/*=================================================
=            Format helpers for charts            =
=================================================*/

let app = require('../app/app.global.js');
const comma = d3.format(',');
const commaFormat = comma;
const decimal = d3.format(',.1f');
const decimalFormat = decimal;
const parseYear = d3.time.format("%Y").parse;
const yearFormat = d3.time.format("%Y");

const formatDataName = function (name) {
    switch (name) {
        // compares

        case 'injury':
            return 'injury';
        // groups
        case 'Sexlbl':
            return 'Sex';
        case 'agegp':
            return 'Age Group';
        case 'Racelbl':
            return 'Ethnicity';
        case 'DISPlbl':
            return 'Disposition';
        //  counts
        case 'injuries':
            return 'Injuries';
        case 'rate':
            return 'Crude Rate';
        case 'ageadj':
            return 'Age-Adjusted Rate';
        default:
            console.warn('chart formats: No format for this parameter - ', name);
            return name;
    }
}

const formatSex = function (group) {
    if (group === "M") {
        return "Males";
    } else {
        return "Females";
    }
};

const formatCount = function (count, chartType) {
    console.log(chartType)
    if (app.globals.dropdowns[chartType] === 'rate' || app.globals.dropdowns[chartType] === 'ageadj') {
        let countFormat = $.number(count, 1)
        return countFormat;
    } else {
        let countFormat = $.number(count, 0)
        return countFormat;
    }
};

// Wrap axis labels for chart
const wrap = function (text, width) {
    text.each(function () {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

module.exports = {
    commaFormat,
    decimalFormat,
    parseYear,
    yearFormat,
    formatDataName,
    formatSex,
    formatCount,
    wrap
}