'use strict';

let app = require('../app/app.global.js');
let treemapComponent = require('../app/Visuals/SelectedYearsComponent/TreemapComponent/treemap.ui.js');

let genderComponent = require('../app/Visuals/SelectedYearsComponent/GenderComponent/gender.ui.js');
let raceComponent = require('../app/Visuals/SelectedYearsComponent/RaceComponent/race.ui.js');
let dispositionComponent = require('../app/Visuals/SelectedYearsComponent/DispositionComponent/disposition.ui.js');
let ageComponent = require('../app/Visuals/SelectedYearsComponent/AgeComponent/age.ui.js');


// const setSticky = () => {
//     if ($.browser.msie) {
//         let templateWidth = $('.template-wrapper').outerWidth();
//             let ribbon;
//             let subNav = $('.active-sub-template-nav-button').data('sub-tab-id');
//             if (subNav) {
//                 ribbon = '#statsRibbon';
//             }
//             else if (app.globals.currentComparisonView == 'States') {
//                 ribbon = '#statesStatRibbon';
//             } else if (app.globals.currentComparisonView == 'Deaths') {
//                 ribbon = '#deathsStatRibbon';


//             }
//             let mainNav = {
//                 height:  $('.main-nav').height(),
//                 width:  $('.main-nav').outerWidth(),
//             }
//             let filterBar = {
//                 height: $('.filter-data-nav-container').height(),
//                 width: $('.filter-data-nav-container').outerWidth(),
//             }
//             let ribbonBar = {
//                 top: $(ribbon).offset().top - filterBar.height - 10,
//                 width: $(ribbon).outerWidth(),
//             }
//         $(window).on('scroll', function() {
//             let posTop = $(window).scrollTop();
//             if (posTop >= mainNav.height) {
//                 $('.filter-data-nav-container').css('width', mainNav.width).css('position', 'fixed').css('top', '0px').css('z-index', '1000');
//                 $('.main-nav').css('margin-bottom', filterBar.height + 10);
//             } else {
//                 $('.filter-data-nav-container').css('width', mainNav.width).css('position', 'relative').css('top', '0px').css('z-index', '1');
//                 $('.main-nav').css('margin-bottom', '0');
//             }
//             if (posTop >= ribbonBar.top) {
//                 $(ribbon).css('width', templateWidth).css('position', 'fixed').css('top', filterBar.height + 5).css('z-index', '1000');
//             } else {
//                 $(ribbon).css('width', templateWidth).css('position', 'relative').css('top', '0').css('z-index', '1');
//             }
//         });
//     }
// }

const resizeCharts = (subView) => {
    $(window).off('resize').on('resize', function() {
        setTimeout(function() {
                if (subView == 'SelectedYears') {
                    dispositionComponent.drawDispositionChart(app.globals.charts.disposition.data)
                    genderComponent.drawSelectedYearsGenderChart(app.globals.charts.bars.genderBar.data, app.globals.charts.bars.genderBar.metadata)
                    ageComponent.buildAgeChart(app.globals.charts.bars.ageBar.buildData, app.globals.charts.bars.ageBar.metadata)
                    raceComponent.buildRaceChart(app.globals.charts.bars.ethnBar.data, app.globals.charts.bars.ethnBar.metadata)
                    if ($('#treemapDropdown').val() == 'intent') {
                        treemapComponent.drawSelectedYearsTreemap(app.globals.charts.treemap.dataIntent, app.globals.charts.treemap.metadata)
                    } else{
                        treemapComponent.drawSelectedYearsTreemap(app.globals.charts.treemap.dataMech, app.globals.charts.treemap.metadata)
                    }
                   // raceComponent.drawRaceChart(app.globals.charts.bars.ethnBar.data, app.globals.charts.bars.ethnBar.metadata)
                } else if (subView == 'Trends') {
                    // statemapComponent.drawStatemap(app.globals.charts.statemap.data, app.globals.charts.statemap.metadata)
                    // genderComponent.drawGenderTrends(app.globals.charts.trends.genderTrend.data, app.globals.charts.trends.genderTrend.metadata)
                    // ageComponent.drawIndividualTrendsByAgeGrp(app.globals.charts.trends.ageTrend.data, app.globals.charts.trends.ageTrend.metadata)
                    // raceComponent.drawRaceTrend(app.globals.charts.trends.ethnTrend.data, app.globals.charts.trends.ethnTrend.metadata)
                } 
     
        }, 250);
     //   setSticky();
    })
};

module.exports = {
    resizeCharts,
 //   setSticky,
};