'use strict';

const app =  require('../../app.global.js');
const ui = require('./breadcrumbs.ui.js');
const toastr = require('toastr');
const filterData = require('../FilterData/filterData.events.js');

const buildGenderBreadcrumbs = () => {
    let genders = [];
    let obj;

    if (app.globals.filters.sex.length == 3) {
        let obj = {
            sex: 'All Genders',
            showRemove: false,
        }
        genders.push(obj);
    }

    else{
        let obj;

        for(let i=0; i< app.globals.filters.sex.length; i++){
            let sex = app.globals.filters.sex[i];
            if(sex == '1'){
                obj= {
                            sex: 'Males',
                            sexId: '1',
                            showRemove: true,
                        } 
                        genders.push(obj);
            }
            if(sex == '2'){
                obj= {
                            sex: 'Females',
                            sexId: '2',
                            showRemove: true,
                        } 
                        genders.push(obj);
            }
            if(sex == '3'){
                obj= {
                            sex: 'Unknown',
                            sexId: '3',
                            showRemove: true,
                        } 
                        genders.push(obj);
            }
        }
    }
    ui.renderGenders(genders);
}

const buildCauseOfInjuryBreadcrumbs = () => {
    let causesOfInjury = [];
    let coi;

    if (app.globals.filters.matrixIntent == '0' && app.globals.filters.matrixMech == '3000') {
        coi = {
            causesOfInjury: "All Nonfatal Injuries",
        }
        coi.showRemove = false;

    } else {
        coi = {
            causesOfInjury: `${app.globals.filters.intentName} ${app.globals.filters.mechName}`,
        }
        coi.showRemove = true;
    }
    causesOfInjury.push(coi);
    ui.renderCauseOfInjury(causesOfInjury);
}

const buildTrafficBreadcrumb = () => {
    let traffic = [];
   
    if (app.globals.filters.traffic == "0") {
        let obj = {
            traffic: 'All Possibilities',
            showRemove: false,
        }
        traffic.push(obj);
    }
    else{
        if(app.globals.filters.traffic == '2'){
           let obj= {
                        traffic: 'Yes',
                        trafficId: '2',
                        showRemove: true,
                } 
                traffic.push(obj);
        }
        if(app.globals.filters.traffic == '6'){
           let obj= {
                        traffic: 'No',
                        trafficId: '6',
                        showRemove: true,
                } 
                traffic.push(obj);
        }
        if(app.globals.filters.traffic == '8'){
           let obj= {
                        traffic: 'Unknown',
                        trafficId: '8',
                        showRemove: true,
                } 
                traffic.push(obj);
        }
    }
    ui.renderTraffic(traffic);
}

const buildDispositionBreadcrumbs = () => {
    let dispositions = []
  
    if (app.globals.filters.disp.length == 4) {
        let obj = {
            disposition: 'All Dispositions',
            showRemove: false,
        }
        dispositions.push(obj);
    }

    else{
        let obj;

        for(let i=0; i< app.globals.filters.disp.length; i++){
            let disp = app.globals.filters.disp[i];

            if(disp == '1'){
                obj= {
                            disposition: 'Treated and Released',
                            dispositionId: '1',
                            showRemove: true,
                    } 
                dispositions.push(obj);
            }
            if(disp == '2'){
                obj= {
                            disposition: 'Transferred',
                            dispositionId: '2',
                            showRemove: true,
                    } 
                dispositions.push(obj);
            }
            if(disp == '4'){
                obj= {
                            disposition: 'Hospitalized',
                            dispositionId: '4',
                            showRemove: true,
                    } 
                dispositions.push(obj);
            }
            if(disp == '5'){
                obj= {
                            disposition: 'Observed/Left AMA/Unknown',
                            dispositionId: '5',
                            showRemove: true,
                    } 
                dispositions.push(obj);
            }
        }
    }
    ui.renderDispositions(dispositions);
}

const buildAgeBreadcrumbs = () => {
    let ages;

    if (app.globals.filters.groupby1 == 'AGEGP') {
        if (app.globals.filters.fiveyr1 == "0" && app.globals.filters.fiveyr2 == "199") {
            ages = {
                agegroup: 'All Ages',
                showRemove: false,
            }
        }
         else {
            for (var i = 0; i < app.globals.allAges.length; i++) {
                if (app.globals.filters.fiveyr1 === String(app.globals.allAges[i]['agegrpID'])) {
                    var ageMin = app.globals.allAges[i]['AgeGrpLabel'];
                }
            }

            for (var i = 0; i < app.globals.allAges.length; i++) {
                if (app.globals.filters.fiveyr2 === String(app.globals.allAges[i]['agegrpID'])) {
                    var ageMax = app.globals.allAges[i]['AgeGrpLabel'];
                }
            }

            ages = {
               agegroup: `${ageMin} - ${ageMax}`,
               showRemove: true,
            }
        }
    } 
    else {
        ages = {
            agegroup: 'All Ages',
            showRemove: false,
        }

        var ageCustomMin = app.globals.filters.c_age1;
        var ageCustomMax = app.globals.filters.c_age2;

        if (app.globals.filters.c_age1 == "0" && app.globals.filters.c_age2 == "199") {
            ages = {
                agegroup: `${ageCustomMin} - ${ageCustomMax}`,
                showRemove: false,
            }
        } else {
            ages = {
                agegroup: `${ageCustomMin} - ${ageCustomMax}`,
                showRemove: true,
            }
        }
    }
    ui.renderAges(ages);
}

const buildYearBreadcrumbs = () => {
    let years = {
        start_year: app.globals.filters.start_year,
        end_year: app.globals.filters.end_year,
    }
    ui.renderYears(years);
}

const updateAgeFilter = () => {
    if (app.globals.filters.groupby1 == 'AGEGP') {
        $("#NonFatalAgeGroups").removeClass("displayHideAgeGrp");
        $("#NonFatalCustomAgeRange").addClass("displayHideAgeGrp");
        $('#NonFatalAgeGroupMin option[value="0"]').prop('selected', true);
        $('#NonFatalAgeGroupMax option[value="199"]').prop('selected', true);
    } else {
        $("#NonFatalAgeGroups").addClass("displayHideAgeGrp");
        $("#NonFatalCustomAgeRange").removeClass("displayHideAgeGrp");
        $('#NonFatalAgeRangeMin option[value="0"]').prop('selected', true);
        $('#NonFatalAgeRangeMax option[value="199"]').prop('selected', true);
    }
    toastr.options =  app.toastrOptions;
    toastr.success('You have applied a filter of All Ages.');
}

const updateGenderFilter = (sexId, sexName) => {
    toastr.options =  app.toastrOptions;

    if ($('.selectedSex-Id:checked').length == 1){
        $('input#sex-0').trigger('click');
        toastr.success('You have applied a filter of All Genders.');
    }
    else{
        if(sexId == '1'){
            for(let i=0; i< app.globals.filters.sex.length; i++){
                let sex = app.globals.filters.sex[i];
               
                 if(sex == '2'){
                    $('.selectedSex-Id[data-sex-name="Females"]').prop('checked', true);
                }
                else if(sex == '3'){
                    $('.selectedSex-Id[data-sex-name="Unknown"]').prop('checked', true);
                }
            }
        }
        if(sexId == '2'){
            for(let i=0; i< app.globals.filters.sex.length; i++){
                let sex = app.globals.filters.sex[i];
                if(sex == '1'){
                    $('.selectedSex-Id[data-sex-name="Males"]').prop('checked', true);
                }
                else if(sex == '3'){
                    $('.selectedSex-Id[data-sex-name="Unknown"]').prop('checked', true);
                }
            }

        }
        if(sexId == '3'){
            for(let i=0; i< app.globals.filters.sex.length; i++){
                let sex = app.globals.filters.sex[i];
                if(sex == '1'){
                    $('.selectedSex-Id[data-sex-name="Males"]').prop('checked', true);
                }
                else if(sex == '2'){
                    $('.selectedSex-Id[data-sex-name="Females"]').prop('checked', true);
                }
            }
        }

        $('input#sex-' + parseInt(sexId) +"").prop('checked', false);
        toastr.success('You removed a filter of Gender '+sexName+'.');
    }
}

const updateDispositionFilter = (dispId, dispName) => {
    toastr.options =  app.toastrOptions;
    if ($('.selectedDisp-Id:checked').length == 1){
        $('#disp-0').trigger('click');
        toastr.success('You have applied a filter of All Dispositions.');
    }
    else{
        $('.selectedDisp-Id[data-disp-id="' + dispId + '"]').prop('checked', false);
        toastr.success('You removed a filter of Disposition '+dispName+'.');
    }
}

const updateIntentAndMechFilter = () => {
    $('.selectedIntentId[data-intent-id="0"]').prop('checked', true);
    $('.selectedmech-Id[data-mech-id="3000"]').prop('checked', true);
    toastr.options =  app.toastrOptions;
    toastr.success('You have applied a filter of All Intents and All Injury as the Cause of Injury.');
}

const updateTrafficFilter = () => {
    $('#traffic-0').trigger('click');
    toastr.options =  app.toastrOptions;
    toastr.success('You have applied a filter of All Possibilities for traffic-related injuries.');
}

const registerRemoveBreadcrumbEvents = () => {
    $('.remove-breadcrumb').off('click').on('click', function() {

       let breadcrumbType = $(this).data('breadcrumb-type');

       if(breadcrumbType == 'sex'){ 
            let sexId = $(this).data('sex-id');
            let sexName = $(this).data('sex-name');
            updateGenderFilter(sexId, sexName);
        }

       if (breadcrumbType == 'age') {
           updateAgeFilter();
       }

       if (breadcrumbType == 'traffic') {
            updateTrafficFilter();
        }

       if (breadcrumbType == 'disposition') {
           let dispId = $(this).data('disposition-id');
           let dispName = $(this).data('disposition-name');
           updateDispositionFilter(dispId, dispName);
       }

       if (breadcrumbType == 'coi') {
            updateIntentAndMechFilter();
        }

        $('#applyFilterDataFilters').trigger('click');
        resizeBreadcrumbWrapper();
    });
}

const resizeBreadcrumbWrapper = () => {
    let width = 0;
    let breadcrumbs = $('.breadcrumb-item');
    $('.breadcrumbs-wrapper').css("width", $('.breadcrumb-container').width());
    for(let i = 0; i < breadcrumbs.length; i++) {
        width+= ($(breadcrumbs[i]).width() + 75);
    }
    if ($('.breadcrumbs-wrapper').width() < width) {
        $('.breadcrumbs-wrapper').css("width", `${width}px`);
    }
    let filterNavHeight = $('.filter-data-nav-container').outerHeight();
    $('#deathsStatRibbon').css('top', `${filterNavHeight}px`);
    $('#statsRibbon').css('top', `${filterNavHeight}px`);
    $('#statesStatRibbon').css('top', `${filterNavHeight}px`)
}

const buildBreadcrumbs = () => {
    $('#breadcrumbsResults').html('');
    buildCauseOfInjuryBreadcrumbs();
    buildDispositionBreadcrumbs();
    buildGenderBreadcrumbs();
    buildAgeBreadcrumbs();

    let isTraffic = false;

    app.globals.filters.mechId.forEach(function(element) {
        if(element == 3001 || element == 3010 || element == 3020 || element == 3030 || element == 3040 || element == 3050){
           if( app.globals.filters.isTraffic == "Yes"){
                isTraffic = true;
           }
        }
      });

    if(isTraffic)
    {
        buildTrafficBreadcrumb();
    }

    buildYearBreadcrumbs();
    registerRemoveBreadcrumbEvents();
    resizeBreadcrumbWrapper();
}

module.exports = {
    buildBreadcrumbs,
}