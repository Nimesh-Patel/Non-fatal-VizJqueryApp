'use strict';

const examplePartial = require('./examplePartials/exampleDataPartial.hbs');

const renderExamplePartial = (res) => {
    $('#example').html('').html(examplePartial({data: res}));
}

module.exports = {  
    renderExamplePartial,
};