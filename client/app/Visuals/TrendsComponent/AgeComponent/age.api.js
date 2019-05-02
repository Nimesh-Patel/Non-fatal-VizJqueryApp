'use strict';

const app =  require('../../../app.global.js');

const callAgeTrendsData = (data) => {
    return $.post('/api/callAgeTrendsData', data, function(a, b, c){});
};

module.exports = {
    callAgeTrendsData,
}
