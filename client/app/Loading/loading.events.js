'use strict';

const app = require('../app.global.js');
const ui = require('./loading.ui.js');


const renderLoadingTemplate = () => {
    ui.renderLoading();
};

const registerEvents = () => {

};

module.exports = {
    registerEvents,
    renderLoadingTemplate,
}