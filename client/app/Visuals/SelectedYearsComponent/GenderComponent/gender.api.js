'use strict';
 
const app =  require('../../../app.global.js');
 
const getDistributionByGender = (data) => {
    return $.post('/api/genderData', data, function(a, b, c){});
};
 
module.exports = {
    getDistributionByGender,
}