'use strict';

var http = require('http');
var request = require('request');
var js2xmlparser = require('js2xmlparser');
const appConfig = require('../config/config.js')
var winston  = require('winston');

const logger = winston.createLogger({
    level: appConfig.log_level,
    format: winston.format.json(),
    transports: [
     // new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ]
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
     // format: winston.format.simple()
    }));
  }

const session = new Date().toISOString();

// SAS API calls 
function callStatsData(req, SASDataResponse){
    logger.log('info', 'Making request call for callStatsData with session ID: ' + session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'StatsRibbonData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByOverall/dataTargets/byoveral', XMLParameters,  function(error, response, body){
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed callStatsData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'callStatsData SASDataResponse', SASDataResponse);
        _parseResponseData('StatsRibbonData', error, body, SASDataResponse);
    })
}

function ageNoSexData(req, SASDataResponse){
    logger.log('info', 'Making request call for ageNoSexData with session ID: ' + session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'NoSexData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByAges/dataTargets/byage', XMLParameters,  function(error, response, body){
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed ageNoSexData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'ageNoSexData SASDataResponse', SASDataResponse);
        _parseResponseData('ageNoSexData', error, body, SASDataResponse);
    })
}

function ageSexData(req, SASDataResponse){
    logger.log('info', 'Making request call for ageSexData with session ID: '+ session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'SexData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByAgeSex/dataTargets/byagesex', XMLParameters,  function(error, response, body){
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed ageSexData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'ageSexData SASDataResponse', SASDataResponse);
        _parseResponseData('ageSexData', error, body, SASDataResponse);
    })
}

function raceNoSexData(req, SASDataResponse){
    logger.log('info', 'Making request call for raceNoSexData with session ID: ' + session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'RaceDataNoSex', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByRaces/dataTargets/byrace', XMLParameters,  function(error, response, body){
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed raceNoSexData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'raceNoSexData SASDataResponse', SASDataResponse);
        _parseResponseData('raceNoSexData', error, body, SASDataResponse);
    })
}

function raceSexData(req, SASDataResponse){
    logger.log('info', 'Making request call for raceSexData with session ID: ' + session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'raceSexData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByRaceSex/dataTargets/byracesx', XMLParameters,  function(error, response, body){
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed raceSexData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'raceSexData SASDataResponse', SASDataResponse);
        _parseResponseData('raceSexData', error, body, SASDataResponse);
    })
}

function genderData(req, SASDataResponse){
    logger.log('info', 'Making request call for GenderData with session ID: '+ session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'GenderData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByGender/dataTargets/bygender', XMLParameters,  function(error, response, body){
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed genderData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'genderData SASDataResponse', SASDataResponse);
        _parseResponseData('genderData', error, body, SASDataResponse);
    })
}

function callTreemapIntentData(req, SASDataResponse) {
    logger.log('info', 'Making request call for TreemapIntentData with session ID: ' + session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'TreemapIntentData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByIntent/dataTargets/byintent', XMLParameters,  function(error, response, body){
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed callTreemapIntentData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'callTreemapIntentData SASDataResponse', SASDataResponse);
        _parseResponseData('callTreemapIntentData', error, body, SASDataResponse);
    })
}

function callTreemapMechData (req, SASDataResponse){
    logger.log('info', 'Making request call for TreemapMechData with session ID: '+ session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'TreemapMechData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByMech/dataTargets/bymech', XMLParameters,  function(error, response, body){
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed callTreemapMechData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'callTreemapMechData SASDataResponse', SASDataResponse);
        _parseResponseData('callTreemapMechData', error, body, SASDataResponse);
    })
}

function callDispositionData(req, SASDataResponse) {
    logger.log('info', 'Making request call for DispositionData with session ID:' + session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'DispositionData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByDisp/dataTargets/bydisp', XMLParameters,  function(error, response, body){
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed callDispositionData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'callDispositionData SASDataResponse', SASDataResponse);
        _parseResponseData('callDispositionData', error, body, SASDataResponse);
    })
}

function callAgeTrendsData(req, SASDataResponse) {
    logger.log('info', 'Making request call for callAgeTrendsData with session ID:' + session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'AgeTrendsData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByAgesTrend/dataTargets/byagetr', XMLParameters, function (error, response, body) {
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed callAgeTrendsData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'callAgeTrendsData SASDataResponse', SASDataResponse);
        _parseResponseData('callAgeTrendsData', error, body, SASDataResponse);
    })
  }
  
  function callRaceTrendsData(req, SASDataResponse) {
    logger.log('info', 'Making request call for callRaceTrendsData with session ID: ' + session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'RaceTrendsData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByRacesTrend/dataTargets/byracetr', XMLParameters, function (error, response, body) {
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed callRaceTrendsData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'callRaceTrendsData SASDataResponse', SASDataResponse);
        _parseResponseData('callRaceTrendsData', error, body, SASDataResponse);
    })
  }

  function callSexTrendsData(req, SASDataResponse) {
    logger.log('info', 'Making request call for callSexTrendsData with session ID:' + session);
    var XMLParameters = _createRequest(req);
    logger.log('info', 'SexTrendsData', XMLParameters);
    var start = new Date().getTime();

    _makeRequest('/SASBIWS/rest/storedProcesses/Shared+Data/WISQARS/Non_Fatal/NF_ByGenderTrend/dataTargets/bysextr', XMLParameters, function (error, response, body) {
        var end = new Date().getTime();
        var diff = (end - start)/60000;
        logger.log('info', 'Completed callSexTrendsData call at: ' + new Date().toString() + ' and the time it takes is : ' + diff + ' mins');
        logger.log('info', 'callSexTrendsData SASDataResponse', SASDataResponse);
        _parseResponseData('callSexTrendsData', error, body, SASDataResponse);
    })
  }

function _makeRequest(url, XMLParameters, callback){
    url = appConfig.API_HOST + url;
   
    request({
        url: url,
        method: "POST",
        headers: {
            "content-type": "application/xml", 
        },
        body: XMLParameters
    }, function (error, response, body){
       callback(error, response, body);
    });
}

function _createRequest(req){
    var reqJson = req.body;
    var XMLbody = js2xmlparser.parse('any', reqJson);
    var XMLParameters = XMLbody.replace("<?xml version='1.0'?>", "").trim();
    return XMLParameters;
}
 
function _parseResponseData(method, error, body, SASDataResponse){
    logger.log('info', 'Parsing result from API for ' + method, body);
 
    if(error){
        logger.log('error', 'An error occurred while requesting data from API ' + method, error);
    }else {
        if(_isJson(body)){
            var res = JSON.parse(body);
            logger.log('info', 'Parsed Response Data', res);
            SASDataResponse.status('200').json(res)
        }else {
            logger.log('error', 'Invalid JSON data returned from API call ' + method, body)
            SASDataResponse.status('500');
        }
    }
}

function _isJson(str){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
module.exports = {
    //SAS 
    callStatsData,
    genderData,
    ageNoSexData,
    ageSexData,
    raceNoSexData,
    raceSexData,
    callTreemapIntentData,
    callTreemapMechData,
    callDispositionData,
    callAgeTrendsData,
    callRaceTrendsData,
    callSexTrendsData
}