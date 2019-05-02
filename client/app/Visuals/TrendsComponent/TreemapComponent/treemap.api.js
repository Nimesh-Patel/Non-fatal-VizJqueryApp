'use strict';

const app =  require('../../../app.global.js');

const callTreemapIntentData = (data) => {
    return $.post('/api/callTreemapIntentData', data, function(a, b, c){});
};
const callTreemapMechData = (data) => {
    return $.post('/api/callTreemapMechData', data, function(a, b, c){});
};

module.exports = {
    callTreemapIntentData,
    callTreemapMechData,
}