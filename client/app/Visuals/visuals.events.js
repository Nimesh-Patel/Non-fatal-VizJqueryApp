'use strict';

const app = require('../app.global.js');
const api = require('./visuals.api.js');
const ui = require('./visuals.ui.js');
const filterData = require('./FilterData/filterData.events.js');
const selectedYearsEvents = require('./SelectedYearsComponent/selectedYears.events.js');
const genderComponent = require('./SelectedYearsComponent/GenderComponent/gender.events.js');
const ageComponent = require('./SelectedYearsComponent/AgeComponent/age.events.js');
const treemapComponent = require('./SelectedYearsComponent/TreemapComponent/treemap.events.js');
const dispositionComponent = require('./SelectedYearsComponent/DispositionComponent/disposition.events.js');
const raceComponent = require('./SelectedYearsComponent/RaceComponent/race.events.js');
const intentMechMatrix = require('../../services/intentMechMapping.js');
const resize = require('../../services/resize.js')
const toastr = require('toastr');
const downloads = require('../../services/downloads.js')
const trendsComponent = require('./TrendsComponent/trends.component.hbs');
const selectedYearsUI = require('./SelectedYearsComponent/selectedYears.ui.js');
const trendsEvents = require('./TrendsComponent/trends.events.js');
const breadcrumbs = require('./Breadcrumbs/breadcrumbs.events.js');
const stats = require('./StatsComponent/stats.events.js');

//Trends
const treemapTrendsComponent = require('./TrendsComponent/TreemapComponent/treemap.events.js');
const dispositionTrendsComponent = require('./TrendsComponent/DispositionComponent/disposition.events.js');
const genderTrendsComponent = require('./TrendsComponent/GenderComponent/gender.events.js');
const ageTrendsComponent = require('./TrendsComponent/AgeComponent/age.events.js');
const raceTrendsComponent = require('./TrendsComponent/RaceComponent/race.events.js');

let lastDownloadButtonSelected;
const loadHomeComponents = () => {
  // Promise Chain
  Promise.all([])
    .then((res) => {
      setTimeout(function () {
        app.services.hideLoading();
      }, 2000);
      // do something when all components are finished loading
    })
    .catch((err) => {
      console.error(err);
    });
}

const renderTemplate = () => {

  if (!app.globals.filters.groupby1 == '') {
    selectedYearsEvents.renderSelectedYearsTemplate();
    loadHomeComponents();
  }

  $('#trends-tab').off('click').on('click', function () {
    $('#selected-years-tab').removeClass('active-tab-nav-button');
    $(this).addClass('active-tab-nav-button');
    $('#visualsTemplate').html('').html(trendsComponent());
    trendsEvents.renderTrendsTemplate();
    filterData.renderDeathsFilterDataModal();

    if (app.globals.filters.groupby1 == 'AGEGP') {
      $("#genderDropdown option[value='ageadj']").prop('disabled', false);
      $("#raceDropdown option[value='ageadj']").prop('disabled', false);
      $("#dispositionDropdown option[value='ageadj']").prop('disabled', false);
    }
    else {
      $("#genderDropdown option[value='ageadj']").prop('disabled', true);
      $("#raceDropdown option[value='ageadj']").prop('disabled', true);
      $("#dispositionDropdown option[value='ageadj']").prop('disabled', true);
    }

    $('#nonFatalAdvancedStatRibbon').hide();
    resgisterAdvancedStatsBtn();

    stickStatsRibbon();

    filterData.checkIntentCheckboxes();
    filterData.checkMechCheckboxes();

    filterData.checkAgeGroupRadioBtn();
    filterData.checkCustomAgeRadioBtn();
    filterData.checkTransportationTrafficCheckboxes();
    filterData.checkDispositionCheckboxes();
    filterData.checkSexCheckboxes();

    applyFilterDataModalFilters();
    registerSelecYearsDropdowns();
    registerResetFilters();
    registerDownloadDataSubmit();
  })

  $('#selected-years-tab').off('click').on('click', function () {
    $(this).addClass('active-tab-nav-button')
    $('#trends-tab').removeClass('active-tab-nav-button')
    selectedYearsUI.renderSelectedYearsComponents();
    selectedYearsEvents.loadSelectedYearsComponents();
    filterData.renderDeathsFilterDataModal();

    if (app.globals.filters.groupby1 == 'AGEGP') {
      $("#genderDropdown option[value='ageadj']").prop('disabled', false);
      $("#raceDropdown option[value='ageadj']").prop('disabled', false);
      $("#dispositionDropdown option[value='ageadj']").prop('disabled', false);
    }
    else {
      $("#genderDropdown option[value='ageadj']").prop('disabled', true);
      $("#raceDropdown option[value='ageadj']").prop('disabled', true);
      $("#dispositionDropdown option[value='ageadj']").prop('disabled', true);
    }

    $('#nonFatalAdvancedStatRibbon').hide();
    resgisterAdvancedStatsBtn();

    stickStatsRibbon();

    filterData.checkIntentCheckboxes();
    filterData.checkMechCheckboxes();

    filterData.checkAgeGroupRadioBtn();
    filterData.checkCustomAgeRadioBtn();
    filterData.checkTransportationTrafficCheckboxes();
    filterData.checkDispositionCheckboxes();
    filterData.checkSexCheckboxes();

    applyFilterDataModalFilters();
    registerSelecYearsDropdowns();
    registerResetFilters();
    registerDownloadDataSubmit();
  })
};

const registerFilterDataModal = () => {
  $('#non-fatal-filter-data-button').off('click').on('click', function () {
    $('#modal-nonFalaFilterDataModal').modal('show');
    filterData.checkIntentCheckboxes();
    filterData.checkMechCheckboxes();
    filterData.checkTransportationTrafficCheckboxes();
    filterData.checkSexCheckboxes();
    filterData.checkDispositionCheckboxes();

    if (app.globals.filters.groupby1 == "AGEGP") {
      $('input#ageGroupsRadioBtn').prop('checked', true);
      filterData.checkAgeGroupRadioBtn();
      $("#NonFatalAgeGroups").removeClass("displayHideAgeGrp");
      $("#NonFatalCustomAgeRange").addClass("displayHideAgeGrp");
    } else {
      $('input#cutomAgeRadioBtn').prop('checked', true);
      filterData.checkCustomAgeRadioBtn();
      $("#NonFatalCustomAgeRange").removeClass("displayHideAgeGrp");
      $("#NonFatalAgeGroups").addClass("displayHideAgeGrp");
    }
  });
}

const registerSelecYearsDropdowns = () => {
  $('#selectYearsSubmitBtn').off('click').on('click', function () {
    let selectedFromYr = $('#yr_select_first :selected').val();
    let selectedToYr = $('#yr_select_second :selected').val();

    if (selectedFromYr > selectedToYr) {
      app.globals.filters.start_year = selectedToYr;
      app.globals.filters.end_year = selectedFromYr;
    }
    else {
      app.globals.filters.start_year = selectedFromYr;
      app.globals.filters.end_year = selectedToYr;
    }

    $("#yr_select_first").val(app.globals.filters.start_year);
    $("#yr_select_second").val(app.globals.filters.end_year);

    let view = $('.active-tab-nav-button').data('tab-id');

    if (view == "SelectedYears") {
      getAllChartsDataSelectedYears();
    }
    else {
      getAllChartsDataTrends();
    }
  });
}

const registerResetFilters = () => {
  $('#resetFilters').off('click').on('click', function () {
    toastr.options = app.toastrOptions;
    toastr.success('You have reset the filters to All Filters.');

    let intent = $('.selectedIntentId[data-intent-id="0"]');
    let mech = $('.selectedmech-Id[data-mech-id="3000"]');

    $('#ageGroupsRadioBtn').trigger('click');
    $('#NonFatalAgeGroupMin option[value="0"]').prop('selected', true);
    $('#NonFatalAgeGroupMax option[value="199"]').prop('selected', true);

    let traffic = $('#traffic-0');
    let sex = $('#sex-0');
    let disp = $('#disp-0');

    if (!traffic.is(':checked')) {
      traffic.trigger('click');
    }

    if (!sex.is(':checked')) {
      sex.trigger('click');
    }

    if (!disp.is(':checked')) {
      disp.trigger('click');
    }

    intent.trigger('click');
    mech.trigger('click');

    $('#applyFilterDataFilters').trigger('click');
  });
}

const applyFilterDataModalFilters = () => {
  $('#applyFilterDataFilters').off('click').on('click', function () {
    ;
    resetTableToViz();
    filterData.setDispositionValues();
    filterData.setFilterDataSexValues();
    filterData.setFilterIntentAndMechValues();
    filterData.setTrafficValue();
    if ($('#ageGroupsRadioBtn').is(':checked')) {
      $("#genderDropdown option[value='ageadj']").prop('disabled', false);
      $("#raceDropdown option[value='ageadj']").prop('disabled', false);
      $("#dispositionDropdown option[value='ageadj']").prop('disabled', false);
      filterData.setAgeGroupValues();
    }
    else {
      $("#genderDropdown option[value='ageadj']").prop('disabled', true);
      $("#raceDropdown option[value='ageadj']").prop('disabled', true);
      $("#dispositionDropdown option[value='ageadj']").prop('disabled', true);

      filterData.setCustomAgeGroupValues();
    }
    breadcrumbs.buildBreadcrumbs();

    let filterDataObj = {
      parameters: {
        racethn: "0",
        intent: String(app.globals.filters.intentId),
        mech: String(app.globals.filters.mechId),
        sex: String(app.globals.filters.sex),
        disp: String(app.globals.filters.disp),
        year1: app.globals.filters.start_year,
        year2: app.globals.filters.end_year,
        traffic: app.globals.filters.traffic,
        agebuttn: app.globals.filters.agebuttn,
        fiveyr1: app.globals.filters.fiveyr1,
        fiveyr2: app.globals.filters.fiveyr2,
        c_age1: app.globals.filters.c_age1,
        c_age2: app.globals.filters.c_age2,
        groupby1: app.globals.filters.groupby1,
      }
    };

    if ($('.selectedDisp-Id:checked').length >= 1 && $('.selectedSex-Id:checked').length >= 1) {
      api.validateFilterset(filterDataObj)
        .then((res) => {
          if (res.responseCode[0] == "0") {
            console.log("------Invalid filter set-------")
            app.hideCheckingComboOverlay();
            toastr.options = app.toastrOptions;
            setTimeout(() => {
              toastr['error']("The filters you chose did not return any results. Please try a different search.");
            }, 1000);
            $('#modal-nonFalaFilterDataModal').modal('show');
            $('#closeFilterDataModal').hide();
            $('#cancelFilterDataModal').hide();
          }
          else {
            app.hideCheckingComboOverlay();
            $('#closeFilterDataModal').show();
            $('#cancelFilterDataModal').show();
            $('#modal-nonFalaFilterDataModal').modal('hide');
            $('#transpRelatedOption').val(app.globals.filters.traffic)

            if ($('.active-tab-nav-button').data('tab-id') == 'SelectedYears') {
              getAllChartsDataSelectedYears();
            }
            else {
              getAllChartsDataTrends();
            }
          }

        })
        .catch((err) => {
          console.error(err);
          $('#closeFilterDataModal').hide();
          $('#cancelFilterDataModal').hide();
          $('#modal-nonFalaFilterDataModal').modal('show');
          toastr.options = app.toastrOptions;
          toastr['error']("The filters you chose did not return any results. Please try a different search.");
        })
    }
    else {
      $('#cancelFilterDataModal').hide();
      $('#closeFilterDataModal').hide();
      $('#modal-nonFalaFilterDataModal').modal('show');
      toastr.options = app.toastrOptions;
      toastr['error']("Please choose a selection for each filter item.");
    }
  })
}


function getTabType() {
  ;
  if ($('#trends-tab').hasClass('active-tab-nav-button')) {
    return 'trends';
  }
  if ($('#selected-years-tab').hasClass('active-tab-nav-button')) {
    return 'bars';
  }
}

function resetTableToViz() {
  var tabType = getTabType();
  if (tabType == 'bars') {
    // treemap
    // $('#inlineRadio1').trigger('click');
    // $('#viz').removeClass('back-fixed').removeClass('displayNone');
    // $('#treeTable').addClass('displayNone');
    $('#treemapViewOption').val('graphic');

    // $('#textMsg').addClass('displayNone');
    //disposition 
    // $('#map').show();
    // $('#mapTable').addClass('displayNone');
    // $('#state-legend').show();
    $('#dispositionViewOption').val('graphic');
    // ;
    $('#dispositionSubmitBtn').trigger('click');

    // genderbar

    // $('#genderBar').show();
    // $('#genderTable').addClass('displayNone');
    // $('#gender-legend').show();
    $('#genderViewOption').val('graphic');
    $('#genderSubmitBtn').trigger('click');

    //$('#trendchart1').removeClass('displayNone');
    // agebar
    // $('#gBar').show();
    // $('#ageTable').addClass('displayNone');
    // $('#age-legend').show();
    $('#ageViewOption').val('graphic');
    $('#chkAgeSex').prop('checked', false);
    $('#ageSubmitBtn').trigger('click');
    //$('#trendchart2').removeClass('displayNone');
    // racebar
    // $('#gBar2').show();
    // $('#ethnTable').addClass('displayNone');
    // $('#ethn-legend').show();
    $('#raceViewOption').val('graphic');
    $('#chkRaceSex').prop('checked', false);
    $('#raceSubmitBtn').trigger('click');
    //$('#trendchart3').removeClass('displayNone');
  } else {
    // $('#inlineRadio1').trigger('click');
    // $('#viz').removeClass('back-fixed').removeClass('displayNone');
    // $('#treeTable').addClass('displayNone');
    $('#treemapViewOption').val('graphic');
    // $('#textMsg').addClass('displayNone');
    //disposition 
    // $('#map').show();
    // $('#mapTable').addClass('displayNone');
    // $('#state-legend').show();
    $('#dispositionViewOption').val('graphic');
    // ;
    $('#dispositionSubmitBtn').trigger('click');

    // genderbar

    // $('#genderBar').show();
    // $('#genderTable').addClass('displayNone');
    // $('#gender-legend').show();
    $('#genderTrendsViewOption').val('graphic');
    $('#genderTrendsSubmitBtn').trigger('click');

    //$('#trendchart1').removeClass('displayNone');
    // agebar
    // $('#gBar').show();
    // $('#ageTable').addClass('displayNone');
    // $('#age-legend').show();
    $('#ageTrendsViewOption').val('graphic');
    // $('#chkAgeSex').prop('checked', false);
    $('#trendsAgeSubmitBtn').trigger('click');
    //$('#trendchart2').removeClass('displayNone');
    // racebar
    // $('#gBar2').show();
    // $('#ethnTable').addClass('displayNone');
    // $('#ethn-legend').show();
    $('#raceTrendsViewOption').val('graphic');
    //  $('#chkRaceSex').prop('checked', false);
    $('#trendsRaceSubmitBtn').trigger('click');
    //$('#trendchart3').removeClass('displayNone');
  }
}






const getAllChartsDataSelectedYears = () => {
  app.showOverlay();
  let promiseChain;

  breadcrumbs.buildBreadcrumbs();

  promiseChain = Promise.all([
    stats.buildStatsRibbonComponent(),
    treemapComponent.loadTreemapComponent(),
    dispositionComponent.loadDispositionComponent(),
    genderComponent.loadGenderComponent(),
    ageComponent.loadAgeComponent(),
    raceComponent.loadRaceComponent(),
  ])
  promiseChain
    .then(() => {
      resize.resizeCharts('SelectedYears');
      app.hideOverlay();
    })
    .catch((err) => {
      console.error(err);
    });
}

const getAllChartsDataTrends = () => {
  app.showOverlay();
  let promiseChain;

  breadcrumbs.buildBreadcrumbs();

  promiseChain = Promise.all([
    stats.buildStatsRibbonComponent(),
    treemapTrendsComponent.loadTreemapComponent(),
    dispositionTrendsComponent.loadDispositionComponent(),
    genderTrendsComponent.loadGenderTrendComponent(),
    ageTrendsComponent.loadAgeTrendComponent(),
    raceTrendsComponent.loadRaceTrendComponent(),
  ])
  promiseChain
    .then(() => {
      resize.resizeCharts('SelectedYears');
      app.hideOverlay();
    })
    .catch((err) => {
      console.error(err);
    });
}

const registerCloseModal = () => {
  $('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable], div.breadcrumb-item').attr('tabindex', '-1');
  $('#closeDownloadModal, #modal-nonFatalDownloadDataModal th, #modal-nonFatalDownloadDataModal td, input[data-chart-type]').attr('tabindex', '0');
  $('#closeDownloadModal').focus();
  $('#closeDownloadModal').off('click').on('click', function () {
    $('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable], div.breadcrumb-item').attr('tabindex', '0');
    $('#closeDownloadModal, #modal-nonFatalDownloadDataModal th, #modal-nonFatalDownloadDataModal td, input[data-chart-type]').attr('tabindex', '-1');
    $(`.downloadData-button[data-chart="${lastDownloadButtonSelected}"`).focus();
  });
}

const registerDownloadAssetsButtons = () => {
  $('.download-asset-button').off('click').on('click', function () {
    let asset = $(this).data('asset-type');
    let chart = $(this).data('chart-type');
    let view = $('.active-tab-nav-button').data('tab-id');

    if ($('.active-tab-nav-button').data('tab-id') == 'SelectedYears') {
      view = 'SelectedYears';
    } else {
      view = 'Trends';
    }

    downloads.downloadAsset(asset, chart, view);
  });
}

const registerDownloadDataSubmit = () => {
  $('.downloadData-button').off('click').on('click', function (e) {
    e.preventDefault();
    let view;

    if ($('.active-tab-nav-button').data('tab-id') == 'SelectedYears') {
      view = 'SelectedYears';
    }
    else {
      view = 'Trends';
    }

    let chart = $(this).data('chart');
    lastDownloadButtonSelected = chart;
    let downloadData;
    // if (chart.toLowerCase().includes('bar')) {
    if (_.includes(chart.toLowerCase(), 'bar')) {
      downloadData = app.globals.charts.bars[chart].downloadData;
      // } else if (chart.toLowerCase().includes('trend')) {
    }
    else if (_.includes(chart.toLowerCase(), 'trend')) {
      // app.globals.charts.trends.ageTrend.downloadData
      downloadData = app.globals.charts.trends[chart].data;
      // } else if (chart == 'death') {
    }
    else {
      downloadData = app.globals.charts[chart].downloadData;
    }

    let metaData = downloads.getDownloadDataChartMetadata(chart, view);
    let data = [];
    downloadData.forEach((row) => {
      let obj = {};
      metaData.keys.forEach((key, index) => {
        obj[key] = row[key];
      });
      data.push(obj);
    });
    data.map(item => {
      item.rate = $.number(item.rate, 1);
      item.injuries = $.number(item.injuries, 0);
      item.ageadj = $.number(item.ageadj, 1);
      item.lower = $.number(item.lower, 0);
      item.upper = $.number(item.upper, 0);
    })
    let downloadObj = {
      chart: chart,
      rows: data,
      keys: metaData.keys,
      headers: metaData.headers,
    }
    ui.populateDownloadDataModal(downloadObj);
    $('#modal-nonFatalDownloadDataModal').modal('show');
    registerCloseModal();
    registerDownloadAssetsButtons();
    if (downloadObj.chart == 'heatmap') {
      $('.download-JPG, .download-SVG').parent().hide();
      $('.subtitle').hide();
    } else {
      $('.download-CSV, .download-JPG, .download-SVG').parent().show();
      $('.subtitle').show();
    }
    if ($.browser.msie) {
      $('.download-JPG').hide();
      $('.ie-jpg-warning').removeClass('displayNone');
    }

    chart = chartMapping(chart)
    //  app.tableNav('#panel-getMapTable');
    if ($(`#${chart}`).css('display') == 'none') {
      $('.download-asset-button[data-asset-type="JPG"]').attr('disabled', true).css('cursor', 'not-allowed');
      $('.download-asset-button[data-asset-type="SVG"]').attr('disabled', true).css('cursor', 'not-allowed');
    } else {
      $('.download-asset-button[data-asset-type="JPG"]').attr('disabled', false).css('cursor', 'pointer');
      $('.download-asset-button[data-asset-type="SVG"]').attr('disabled', false).css('cursor', 'pointer');
    }
  });
}

const chartMapping = (chart) => {
  switch (chart) {
    case 'treemap':
      return 'treemap';
    case 'disposition':
      return 'disposition';
    case 'genderBar':
      return 'genderBar';
    case 'ageBar':
      return 'ageBar';
    case 'ethnBar':
      return 'ethnBar';
    case 'death':
      return 'deathTrends';
    case 'genderTrend':
      return 'genderTrend';
    case 'ageTrend':
      return 'ageTrend';
    case 'ethnTrend':
      return 'raceTrend';
  }
}

const exploreNonFatalDataBtn = () => {
  var selectedFromYr = $('#year_select_first_landing').find("option:selected").val()
  var selectedToYr = $('#year_select_second_landing :selected').val();

  if (selectedFromYr > selectedToYr) {
    app.globals.filters.start_year = selectedToYr;
    app.globals.filters.end_year = selectedFromYr;
  }
  else {
    app.globals.filters.start_year = selectedFromYr;
    app.globals.filters.end_year = selectedToYr;
  }
}

const resgisterAdvancedStatsBtn = () => {
  $('#advancedStatsBtn').off('click').on('click', function (e) {
    var x = document.getElementById("nonFatalAdvancedStatRibbon");
    if (x.style.display === "none") {

//      var statsRibbonPosition = $('#nonFatalStatRibbon').offset().top;
      x.style.display = "block";

     $(window).on('scroll', function() {
        if( $(window).scrollTop() > 80) {
          $('#nonFatalAdvancedStatRibbon').addClass('advancedStatsFixed');
        } 
        else { //($(window).scrollTop() ==  0) {
          $('#nonFatalAdvancedStatRibbon').removeClass('advancedStatsFixed');
        }
    });

        // if($(window).scrollTop() ==  0) {
        //   $('#nonFatalAdvancedStatRibbon').removeClass('advancedStatsFixed');
        // }

        // if( statsRibbonPosition > 115) {
        //   $('#nonFatalAdvancedStatRibbon').addClass('advancedStatsFixed');
        // }

      $("#advancedStatsBtn").text("HIDE ADVANCED STATISTICS");
    } else {
      x.style.display = "none";
      $("#advancedStatsBtn").text("SHOW ADVANCED STATISTICS");
    }
  });
}

const stickStatsRibbon = () => {
  window.addEventListener('scroll', function(e) {
   // var stickyStatsRibbon = $('#nonFatalStatRibbon').offset().top;
    
    if ($(window).width() > 1024) {
        $(window).on('scroll', function() {
            if (($(window).scrollTop() > 80) ){
              $('#nonFatalStatRibbon').addClass('statsFixed');
              $('#advancedStatsBtn').addClass('advancedStatsButtonFixed');
              $('#compare-deaths-home-btn').addClass('homeButtonFixed');
              $('.filter-data-nav-container').addClass('sticky');

            }
             else {
             //if($(window).scrollTop() ==  0) {
              $('#nonFatalStatRibbon').removeClass('statsFixed');
              $('#advancedStatsBtn').removeClass('advancedStatsButtonFixed');
              $('#nonFatalAdvancedStatRibbon').removeClass('advancedStatsFixed');
              $('#compare-deaths-home-btn').removeClass('homeButtonFixed');
              $('.filter-data-nav-container').removeClass('sticky');
            }
          });
    }
  });
}




const registerEvents = () => {
  filterData.renderDeathsFilterDataModal();
  app.showFilterDataNav();
  app.router.updatePageLinks();

  $('#nonFatalAdvancedStatRibbon').hide();
  resgisterAdvancedStatsBtn();

  stickStatsRibbon();

  registerFilterDataModal();
  registerSelecYearsDropdowns();
  registerResetFilters();
  registerDownloadDataSubmit();
  filterData.checkTransportationMech();
  filterData.checkTransportationTrafficCheckboxes();
  filterData.checkIntentCheckboxes();
  filterData.checkMechCheckboxes();
  filterData.checkDispositionCheckboxes();
  filterData.checkSexCheckboxes();
  filterData.checkAgeGroupRadioBtn();
  filterData.checkCustomAgeRadioBtn();
  applyFilterDataModalFilters();
  resize.resizeCharts('SelectedYears');
};

module.exports = {
  registerEvents,
  renderTemplate,
  applyFilterDataModalFilters,
};
