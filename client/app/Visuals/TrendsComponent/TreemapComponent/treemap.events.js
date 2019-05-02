'use strict';

const app = require('../../../app.global.js');
const api = require('./treemap.api.js');
const ui = require('./treemap.ui.js');
const visuals = require('../../visuals.events.js');
const downloads = require('../../../../services/downloads.js');

const loadTreemapComponent = () => {
  Promise.all([callTreemap()])
    .then(res => {
      checkTransportationMechForTreemap();
      treemapSubmitBtn();
      app.addProgress();
    })
    .catch(err => {
      console.error(err);
    });
};

const treemapSubmitBtn = () => {
  $('#treemapSubmitBtn')
    .off('click')
    .on('click', function () {
      $('.selectedTransTraffic-Id').prop('checked', false);
      let traffic = $('#transpRelatedOption').val();
      $('.selectedTransTraffic-Id[data-traffic-id=' + traffic + ']').prop(
        'checked',
        true
      );
      app.globals.filters.traffic = traffic;
      // callTreemap();
      checkTreemapOptions();
    });
};
const checkTreemapOptions = () => {
  let data = app.globals.charts.treemap.dataIntent;
  if ($('#treemapDropdown').val() == 'intent') {
    app.globals.charts.treemap.metadata.group = 'intentName';
    app.globals.charts.treemap.metadata.parent = 'Intentlbl';
    app.globals.charts.treemap.metadata.child = 'mechName';
    app.globals.charts.treemap.metadata.filterKey = 'mechId';
    app.globals.charts.treemap.metadata.onClickKey = 'mechId';
    app.globals.charts.treemap.metadata.breadcrumbKey = 'mechName';
    data = app.globals.charts.treemap.dataIntent;
    app.globals.charts.treemap.downloadData =
      app.globals.charts.treemap.dataIntent;
  } else {
    app.globals.charts.treemap.metadata.group = 'mechName';
    app.globals.charts.treemap.metadata.parent = 'Mechlbl';
    app.globals.charts.treemap.metadata.child = 'intentName';
    app.globals.charts.treemap.metadata.filterKey = 'intentId';
    app.globals.charts.treemap.metadata.onClickKey = 'intentId';
    app.globals.charts.treemap.metadata.breadcrumbKey = 'intentName';
    data = app.globals.charts.treemap.dataMech;
    app.globals.charts.treemap.downloadData =
      app.globals.charts.treemap.dataMech;
  }
  if ($('#treemapViewOption').val() == 'graphic') {
    $('#chartContainer_treemap').show();
    $('#treemapTable').hide();
    ui.drawSelectedYearsTreemap(data);
    app.globals.charts.treemap.downloadData = data;
  } else {
    $('#treemapTable').show();
    $('#chartContainer_treemap').hide();

    let view;
    if ($('.active-tab-nav-button').data('tab-id') == 'SelectedYears') {
      view = 'SelectedYears';
    } else {
      view = 'Trends';
    }

    let metaData = downloads.getDownloadDataChartMetadata('treemap', view);
    let data = [];
    app.globals.charts.treemap.downloadData.forEach(row => {
      let obj = {};
      metaData.keys.forEach(key => {
        obj[key] = row[key];
      });
      data.push(obj);
    });
    data.map(item => {
      item.injuries = $.number(item.injuries, 0);
      item.rate = $.number(item.rate, 1);
      item.ageadj = $.number(item.ageadj, 1);
      item.lower = $.number(item.lower, 0);
      item.upper = $.number(item.upper, 0);
    })
    let downloadObj = {
      chart: 'treemap',
      rows: data,
      keys: metaData.keys,
      headers: metaData.headers
    };
    ui.drawTreemapTable(downloadObj);
    app.registerTableArrowNav('#treemapTable');
  }
};

const checkTransportationMechForTreemap = () => {
  let transportationSelected = $('.transportation-Id:checked').length;
  if (transportationSelected > 0) {
    $('#transpRelatedOption').css('pointer-events', 'auto');
    $('#transpRelatedOption').css('opacity', 1);
    $('#treemapTransportationCard').css('opacity', 1);
  } else {
    $('#transpRelatedOption').css('pointer-events', 'none');
    $('#transpRelatedOption').css('opacity', 0.3);
    $('#treemapTransportationCard').css('opacity', 0.3);
  }
};

const callTreemap = () => {
  let treemapFilterSet = {
    parameters: {
      intent: String(app.globals.filters.intentId),
      mech: String(app.globals.filters.mechId),
      sex: String(app.globals.filters.sex),
      disp: String(app.globals.filters.disp),
      year1: app.globals.filters.start_year,
      year2: app.globals.filters.end_year,
      traffic: app.globals.filters.traffic,
      racethn: '0',
      agebuttn: app.globals.filters.agebuttn,
      fiveyr1: app.globals.filters.fiveyr1,
      fiveyr2: app.globals.filters.fiveyr2,
      c_age1: app.globals.filters.c_age1,
      c_age2: app.globals.filters.c_age2
    }
  };
  return new Promise((resolve, reject) => {
    api.callTreemapIntentData(treemapFilterSet).then(res => {
      let responseData = res.responseCode[1].responseData;
      responseData.map(item => {
        item.injuries = Math.round(item.injuries);
        item.ageadj = $.number(item.ageadj, 2);
        item.rate = $.number(item.rate, 2);
        item.cv = $.number(item.cv, 3);
        item.upper = item.upper;
        item.lower = item.lower;
        return item;
      });

      app.globals.charts.treemap = {};
      app.globals.charts.treemap.metadata = {};
      app.globals.charts.treemap.dataIntent = responseData;
      app.globals.charts.treemap.metadata.id = '#chartContainer_treemap';
      app.globals.charts.treemap.metadata.colorset =
        app.globals.palettes.treemap;
      app.globals.charts.treemap.metadata.width = $(
        'chartContainer_treemap'
      ).width();

      api.callTreemapMechData(treemapFilterSet)
        .then(res => {
          let responseData = res.responseCode[1].responseData;
          responseData.map(item => {
            item.injuries = Math.round(item.injuries);
            item.ageadj = $.number(item.ageadj, 2);
            item.rate = $.number(item.rate, 2);
            item.cv = $.number(item.cv, 3);
            item.upper = item.upper;
            item.lower = item.lower;
            return item;
          });
          app.globals.charts.treemap.dataMech = responseData;
          checkTreemapOptions();
          resolve(res);
        })
    });


  });
};

const registerTreemapEvents = () => { };

module.exports = {
  registerTreemapEvents,
  loadTreemapComponent
};
