'use strict';

const app =  require('../../app.global.js');

const getExampleData = () => {
    return $.ajax({
        method: "POST",
        url: `${app.apiUrl}/api/getExampleData`,
    });
};

module.exports = {
    getExampleData,
}