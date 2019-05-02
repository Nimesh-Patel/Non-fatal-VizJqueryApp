const ui = require('./filterData.ui.js');
const app = require('../../app.global.js')
const main = require('../../../services/main.js')

const renderDeathsFilterDataModal = () => {
    ui.renderNonFatalFilterData();
}

const checkTransportationMech = () => {
}

const checkIntentCheckboxes = () => {
    $('.selectedIntentId').prop('checked', false);

    let intent = app.globals.filters.matrixIntent;
    $('.selectedIntentId[data-intent-id="' + intent + '"]').prop('checked', true);

    $('.selectedIntentId').change(function(){
        $('.selectedIntentId').not(this).prop('checked', false);  
        if(this.checked == false){
            if ($('.selectedIntentId:checked').length < 1){  
                $(this).prop("checked", true); 
            }
        }
    });
}

const checkMechCheckboxes = () => {
    $('.selectedmech-Id').prop('checked', false);

    let mech = app.globals.filters.matrixMech;
    $('.selectedmech-Id[data-mech-id="' + mech + '"]').prop('checked', true);

    $('.selectedmech-Id').change(function(){
        $('.selectedmech-Id').not(this).prop('checked', false);  
        if(this.checked == false){
            if ($('.selectedmech-Id:checked').length < 1){  
                $(this).prop("checked", true); 
            }
        }
        
        let transportationSelected = $('.transportation-Id:checked').length;
        if(transportationSelected == 1){
            app.globals.filters.isTraffic = "Yes";

            $('#filter-data-transportation-traffic').css('pointer-events', 'auto');
            $('#filter-data-transportation-traffic').css('opacity', 1);
        }
        else{
            app.globals.filters.isTraffic = "No";

            $('.selectedTransTraffic-Id').prop('checked', false);
            $('#filter-data-transportation-traffic').css('pointer-events', 'none');
            $('#filter-data-transportation-traffic').css('opacity', 0.1);
            $('.selectedTransTraffic-Id[data-traffic-id="0"]').prop('checked', true);
        }
    });
}

const checkSexCheckboxes = () => {
    $('.selectedSex-Id').prop('checked', false);

    for(let i=0; i< app.globals.filters.sex.length; i++){
        let sex = app.globals.filters.sex[i];
        if(sex == '1'){
            $('.selectedSex-Id[data-sex-name="Males"]').prop('checked', true);
        }
        else if(sex == '2'){
            $('.selectedSex-Id[data-sex-name="Females"]').prop('checked', true);
        }
        else{
            $('.selectedSex-Id[data-sex-name="Unknown"]').prop('checked', true);
        }
    }

    if ($('.selectedSex-Id:checked').length == $('.selectedSex-Id:checkbox').length ){  
        $('#sex-0').prop('checked', true);
    }
    else{
        $('#sex-0').prop('checked', false);
    }

    $('.selectedSex-Id').change(function(){
            if(this.checked == false){
                $("#sex-0")[0].checked = false; 
                if ($('.selectedSex-Id:checked').length < 1){  
                    $(this).prop("checked", true); 
                }
            }
            if ($('.selectedSex-Id:checked').length == $('.selectedSex-Id:checkbox').length ){  
                $('#sex-0').prop('checked', true);
            }
    });
    $("#sex-0").change(function(){
        var status = this.checked; 
        $('.selectedSex-Id').each(function(){ 
            this.checked = status; 
        });
    });
}

const checkDispositionCheckboxes = () => {
    $('.selectedDisp-Id').prop('checked', false);

    for(let i=0; i< app.globals.filters.disp.length; i++){
        let disp = app.globals.filters.disp[i];
        if(disp == '1'){
            $('.selectedDisp-Id[data-disposition-name="Treated and Released"]').prop('checked', true);
        }
        else if(disp == '2'){
            $('.selectedDisp-Id[data-disposition-name="Transferred"]').prop('checked', true);
        }
        else if(disp == '4'){
            $('.selectedDisp-Id[data-disposition-name="Hospitalized"]').prop('checked', true);
        }
        else{
            $('.selectedDisp-Id[data-disposition-name="Observed/Left AMA/Unknown"]').prop('checked', true);
        }
    }

    if ($('.selectedDisp-Id:checked').length == $('.selectedDisp-Id:checkbox').length ){  
        $('#disp-0').prop('checked', true);
    }
    else{
        $('#disp-0').prop('checked', false);
    }

    $('.selectedDisp-Id').change(function(){
        if(this.checked == false){
            $("#disp-0")[0].checked = false; 
            if ($('.selectedDisp-Id:checked').length < 1){  
                $(this).prop("checked", true); 
            }
        }
        if ($('.selectedDisp-Id:checked').length == $('.selectedDisp-Id:checkbox').length ){  
            $('#disp-0').prop('checked', true);
        }
});

    $("#disp-0").change(function(){
        var status = this.checked; 
        $('.selectedDisp-Id').each(function(){ 
            this.checked = status; 
        });
    });
}

const checkAgeGroupRadioBtn = () => {
    $('#NonFatalAgeGroupMin option[value="'+app.globals.filters.fiveyr1+'"]').prop('selected', true);
    $('#NonFatalAgeGroupMax option[value="'+app.globals.filters.fiveyr2+'"]').prop('selected', true);
    
    $('input#ageGroupsRadioBtn').on('change', function() {  
        $("#NonFatalAgeGroups").removeClass("displayHideAgeGrp");
        $("#NonFatalCustomAgeRange").addClass("displayHideAgeGrp");

        $('#NonFatalAgeGroupMin option[value="'+app.globals.filters.fiveyr1+'"]').prop('selected', true);
        $('#NonFatalAgeGroupMax option[value="'+app.globals.filters.fiveyr2+'"]').prop('selected', true);
    });
}

const checkCustomAgeRadioBtn = () => {
    
    $('#NonFatalAgeRangeMin option[value="'+app.globals.filters.c_age1+'"]').prop('selected', true);
    $('#NonFatalAgeRangeMax option[value="'+app.globals.filters.c_age2+'"]').prop('selected', true);
    
    $('input#cutomAgeRadioBtn').on('change', function() {  
        $("#NonFatalCustomAgeRange").removeClass("displayHideAgeGrp");
        $("#NonFatalAgeGroups").addClass("displayHideAgeGrp");

        $('#NonFatalAgeRangeMin option[value="'+app.globals.filters.c_age1+'"]').prop('selected', true);
        $('#NonFatalAgeRangeMax option[value="'+app.globals.filters.c_age2+'"]').prop('selected', true);
    });
}

const checkTransportationTrafficCheckboxes = () => {

    $('.selectedTransTraffic-Id').prop('checked', false);

    let trafficId = app.globals.filters.traffic;
    $('.selectedTransTraffic-Id[data-traffic-id="'+trafficId+'"]').prop('checked', true);

    let transportationSelected = $('.transportation-Id:checked').length;
    if (transportationSelected == 1){  
        app.globals.filters.isTraffic = "Yes";
        $('#filter-data-transportation-traffic').css('pointer-events', 'auto');
        $('#filter-data-transportation-traffic').css('opacity', 1);
    }
    else{
        app.globals.filters.isTraffic = "No";
        $('#filter-data-transportation-traffic').css('pointer-events', 'none');
        $('#filter-data-transportation-traffic').css('opacity', 0.1);
    }

    $('.selectedTransTraffic-Id').change(function(){
        $('.selectedTransTraffic-Id').not(this).prop('checked', false);  
        if(this.checked == false){
            if ($('.selectedTransTraffic-Id:checked').length < 1){  
                $(this).prop("checked", true); 
            }
        }
    });
}

const setFilterDataSexValues = () => {
    app.globals.filters.sex = [];
    
//     $('input.selectedSex-Id').each(function () {
//         if(this.checked){
//             console.log("&&&&")
//             let ss = $(this).data('sex-id');
//             app.globals.filters.sex.push(ss);

//         }
//    });

var chk1 = $('input#sex-1').prop('checked');
var chk2 = $('input#sex-2').prop('checked');
var chk3 = $('input#sex-3').prop('checked');

    if(chk1){
        let ss = $('#sex-1').data('sex-id');
       app.globals.filters.sex.push(ss);
    }

    if(chk2){
        let ss = $("#sex-2").data('sex-id');
        app.globals.filters.sex.push(ss);
    }

    if(chk3){
        let ss = $("#sex-3").data('sex-id');
        app.globals.filters.sex.push(ss);
    }

    // $(".selectedSex-Id:checked").each(function() {
    //     console.log("*******")
    //     let ss = $(this).data('sex-id');
    //     app.globals.filters.sex.push(ss);
    // });
}

const setFilterIntentAndMechValues = () => {
    let intent = $(".selectedIntentId:checked").data('intent-id');
    let mech = $(".selectedmech-Id:checked").data('mech-id');
    app.globals.intentMechCombo.intent = intent;
    app.globals.intentMechCombo.mech =  mech;
    main.setIntentAndMechValues(intent, mech);
}


const setAgeGroupValues = () => {
    $('input#ageGroupsRadioBtn').prop('checked', true);

    app.globals.filters.fiveyr1 = "";
    app.globals.filters.fiveyr2 = "";
    let agegrpMin = $('#NonFatalAgeGroupMin :selected').val();
    let agegrpMax = $('#NonFatalAgeGroupMax :selected').val();
    app.globals.filters.fiveyr1 = agegrpMin;
    app.globals.filters.fiveyr2 = agegrpMax;
    app.globals.filters.c_age1 = "0"; // set custom age range to 0
    app.globals.filters.c_age2 = "199";
    app.globals.filters.groupby1 = "AGEGP";

    if(app.globals.filters.fiveyr1 == "0" && app.globals.filters.fiveyr2 == "199"){
        app.globals.filters.agebuttn = "all";  // no age group selected
    }
    else{
        app.globals.filters.agebuttn = "5yr";   // age group selected
    }
}


const setCustomAgeGroupValues = () => {
    $('input#cutomAgeRadioBtn').prop('checked', true);

    app.globals.filters.c_age1 = "";
    app.globals.filters.c_age1 = "";
    let customagegrpMin = $('#NonFatalAgeRangeMin :selected').val();
    let customagegrpMax = $('#NonFatalAgeRangeMax :selected').val();
    app.globals.filters.c_age1 = customagegrpMin;
    app.globals.filters.c_age2 = customagegrpMax;
    app.globals.filters.fiveyr1 = "0"; // set age group to 0
    app.globals.filters.fiveyr2 = "199";
    app.globals.filters.groupby1 = "NONE1";

    if(app.globals.filters.c_age1 == "0" && app.globals.filters.c_age2 == "199"){
        app.globals.filters.agebuttn = "all";  // no single age selected
    }
    else{
        app.globals.filters.agebuttn = "custom";   // single age selected
    }
}

const setDispositionValues = () => {
    app.globals.filters.disp = [];

    if($('#disp-1').prop('checked')){
        app.globals.filters.disp.push(1);
    }
     if($('#disp-2').prop('checked')){
        app.globals.filters.disp.push(2);
    }
     if($('#disp-4').prop('checked')){
        app.globals.filters.disp.push(4);
    }
     if($('#disp-5').prop('checked')){
        app.globals.filters.disp.push(5);
    }

    // $(".selectedDisp-Id:checked").each(function() {
    //     let dispId = $(this).data('disp-id')
    //     app.globals.filters.disp.push(dispId);
    // });
}

const setTrafficValue = () => {
    app.globals.filters.traffic = "";

    $(".selectedTransTraffic-Id:checked").each(function() {
        let trafficId = $(this).data('traffic-id');
        app.globals.filters.traffic = trafficId;
    });
}

module.exports = {
    renderDeathsFilterDataModal,
    checkTransportationMech,
    checkMechCheckboxes,
    checkIntentCheckboxes,
    checkSexCheckboxes,
    checkDispositionCheckboxes,
    checkAgeGroupRadioBtn,
    checkCustomAgeRadioBtn,
    checkTransportationTrafficCheckboxes,
    setFilterDataSexValues,
    setFilterIntentAndMechValues,
    setAgeGroupValues,
    setCustomAgeGroupValues,
    setDispositionValues,
    setTrafficValue,
}