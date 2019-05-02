'use strict';

const app = require('../../app.global.js');
const api = require('./selectedYears.api.js');
const ui = require('./selectedYears.ui.js');
const genderComponent = require('./GenderComponent/gender.events.js');
const dispositionComponent = require('./DispositionComponent/disposition.events.js');
const ageComponent = require('./AgeComponent/age.events.js');
const treemapComponent = require('./TreemapComponent/treemap.events.js');
const raceComponent = require('./RaceComponent/race.events.js');
const breadcrumbs = require('../Breadcrumbs/breadcrumbs.events.js');
const stats = require('../StatsComponent/stats.events.js')

const loadSelectedYearsComponents = () => {
  app.showOverlay();

    Promise.all([
     stats.buildStatsRibbonComponent(),
     treemapComponent.loadTreemapComponent(),
     dispositionComponent.loadDispositionComponent(),
     genderComponent.loadGenderComponent(),
     ageComponent.loadAgeComponent(),
     raceComponent.loadRaceComponent(),
    ])
    .then((res) => {
      breadcrumbs.buildBreadcrumbs();
      app.hideOverlay();
    })
    .catch((err) => {
      console.error(err);
    });
}

const renderSelectedYearsTemplate = () => {
  ui.renderSelectedYearsTemplate();
  ui.renderSelectedYearsComponents();
  loadSelectedYearsComponents();
}

const registerSelectedYearsEvents = () => {};

module.exports = {
  registerSelectedYearsEvents,
  renderSelectedYearsTemplate,
  loadSelectedYearsComponents,
};
