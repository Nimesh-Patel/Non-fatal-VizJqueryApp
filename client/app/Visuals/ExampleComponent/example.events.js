'use strict';

const ui = require('./example.ui.js');
const api = require('./example.api.js');

const registerExampleComponentEvents = () => {
};

const loadExampleComponent = () => {
    api.getExampleData()
    .then((res) => {
        // pass data from call to an element for rendering in ui.js
        ui.renderExamplePartial(res);
        registerExampleComponentEvents();
    })
    .catch((err) => {
        console.error(err);
    });
};

module.exports = { 
    loadExampleComponent,
    registerExampleComponentEvents,
};
