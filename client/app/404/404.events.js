'use strict';

const app = require('../app.global.js');
const ui = require('./404.ui.js');

const renderNotFoundTemplate = () => {
    ui.renderNotFound();
};

const registerEvents = () => {

};

module.exports = {
    registerEvents,
    renderNotFoundTemplate,
}