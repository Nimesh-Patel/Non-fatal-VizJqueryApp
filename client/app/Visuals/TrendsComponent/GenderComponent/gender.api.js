'use strict';

const app =  require('../../../app.global.js');

const callGenderTrendsData = (data) => {
    return $.post('/api/callSexTrendsData', data, function(a, b, c){});
};

module.exports = {
    callGenderTrendsData,
}
