'use strict';
const filterDataTemplate = require('./filterData.template.hbs');


const renderNonFatalFilterData= () => {
    $('#modal-nonFalaFilterDataModal').html('').html(filterDataTemplate());
};

module.exports = {
    renderNonFatalFilterData,
};