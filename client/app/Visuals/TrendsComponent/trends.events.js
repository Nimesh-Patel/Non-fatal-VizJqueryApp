'use strict';

const app = require('../../app.global.js');
const ui = require('./trends.ui.js');
const treemapComponent = require('./TreemapComponent/treemap.events.js');
const dispositionComponent = require('./DispositionComponent/disposition.events.js');
const raceComponent = require('./RaceComponent/race.events.js');
const ageComponent = require('./AgeComponent/age.events.js');
const genderComponent = require('./GenderComponent/gender.events.js');
const stats = require('../StatsComponent/stats.events.js');
const breadcrumbs = require('../Breadcrumbs/breadcrumbs.events.js');
    
const loadTrendsComponents = () => {
  app.showOverlay()
  breadcrumbs.buildBreadcrumbs();

  Promise.all([
      stats.buildStatsRibbonComponent(),
      treemapComponent.loadTreemapComponent(),
      dispositionComponent.loadDispositionComponent(),
      genderComponent.loadGenderTrendComponent(),
      ageComponent.loadAgeTrendComponent(),
      raceComponent.loadRaceTrendComponent(),
    ])
    .then((res) => {
     // breadcrumbs.buildBreadcrumbs();
     app.hideOverlay();
    })
    .catch((err) => {
      console.error(err);
    });
}

const renderTrendsTemplate = () => {
  loadTrendsComponents();
}

const registerTrendsEvents = () => {};

module.exports = {
  registerTrendsEvents,
  renderTrendsTemplate,
  loadTrendsComponents,
};
