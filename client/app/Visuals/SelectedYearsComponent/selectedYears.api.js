'use strict';

const app =  require('../../app.global.js');

const getSelectedYearsData = () => {
    return $.ajax({
        method: "POST",
        url: `${app.apiUrl}/api/getExampleData`,
    });
};

module.exports = {
    getSelectedYearsData,
}