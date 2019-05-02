'use strict';

const app =  require('../../../app.global.js');

const callDistributionByRaceNoSex = (data) => {
    return $.post('/api/callRaceNoSexData', data, function(a, b, c){});
};

const callDistributionByRaceSex = (data) => {
    return $.post('/api/callRaceSexData', data, function(a, b, c){});
};

module.exports = {
    callDistributionByRaceNoSex,
    callDistributionByRaceSex,
}
