'use strict';

const app =  require('../../../app.global.js');

const callDistributionByDisposition = (data) => {
    return $.post('/api/callDispositionData', data, function(a, b, c){});
};

module.exports = {
    callDistributionByDisposition,
}