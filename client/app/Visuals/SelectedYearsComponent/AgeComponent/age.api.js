'use strict';

const app =  require('../../../app.global.js');

const callDistributionByAgeNoSex = (data) => {
    return $.post('/api/callAgeNoSexData', data, function(a, b, c){});

};

const callDistributionByAgeSex = (data) => {
    return $.post('/api/callAgeSexData', data, function(a, b, c){});

};

module.exports = {
    callDistributionByAgeNoSex,
    callDistributionByAgeSex,
}
