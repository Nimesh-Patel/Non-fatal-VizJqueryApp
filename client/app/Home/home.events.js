'use strict';

const app = require('../app.global.js');
const ui = require('./home.ui.js');
const main = require('../../services/main.js');

const loadHomeComponents = () => {
    // Promise Chain
    Promise.all([
      // ExampleComponent.loadExampleComponent(), 
    ])
    .then(() => {

        exploreSubmit();
        setTimeout(function() {
            app.services.hideLoading();
        }, 2000);
        // do something when all components are finished loading
    })
    .catch((err) => {
        console.error(err);
    });
}

const exploreSubmit = () => {
    $("#non-fatal-explore").off('click').on('click', function(e) {
        let selectedFromYr = $("#year_select_first_landing").val();
        let selectedToYr = $("#year_select_second_landing").val();

        if(selectedFromYr > selectedToYr){
            app.globals.filters.start_year = selectedToYr;
            app.globals.filters.end_year = selectedFromYr;
        }
        else{
            app.globals.filters.start_year = selectedFromYr;
            app.globals.filters.end_year = selectedToYr;
        }

       $('#yr_select_first').val(app.globals.filters.start_year);
       $('#yr_select_second').val(app.globals.filters.end_year);
    })
}

const renderTemplate = () => {
    ui.renderHomeTemplate();
    loadHomeComponents();
};

const registerEvents = () => {
    main.setGlobalFilters();
    app.hideFilterDataNav();
};

module.exports = {
    registerEvents,
    renderTemplate,
};