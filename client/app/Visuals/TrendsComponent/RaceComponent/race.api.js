'use strict';

const app =  require('../../../app.global.js');

const callRaceTrendsData = (data) => {
    return $.post('/api/callRaceTrendsData', data, function(a, b, c){});
};

module.exports = {
    callRaceTrendsData,
}
