'use strict';

const template = require('./visuals.component.hbs');
const selectedYrsTemplate = require('./SelectedYearsComponent/selectedYears.template.hbs');
const selectedYrsComponentsTemplate = require('./SelectedYearsComponent/selectedYears.component.hbs');
const downloadDataModalTemplate = require('./DownloadModal/DownloadModal.hbs')

const renderHomeTemplate = () => {
    $('#appTemplate').html('');
    $('#appTemplate').html(template());
};

const populateDownloadDataModal = (data) => {
    $('#modal-nonFatalDownloadDataModal').html('').html(downloadDataModalTemplate({downloadData: data}));
}
// const renderSelectedYearsTemplate = () => {
//     $('#appTemplate').html('').html(selectedYrsTemplate());
// }

// const renderSelectedYearsComponents = () => {
//     $('#visualsTemplate').html('').html(selectedYrsComponentsTemplate());
// }

module.exports = {
    renderHomeTemplate,
    populateDownloadDataModal,
    // renderSelectedYearsTemplate,
    // renderSelectedYearsComponents,
};