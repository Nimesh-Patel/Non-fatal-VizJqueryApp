'use strict';

const app =  require('../../app.global.js');

const getStatsRibbonData = (data) => {
    return $.post(`${app.apiUrl}/api/callStatsData`, data, function(a, b, c){});
};

module.exports = {
    getStatsRibbonData,
    
}