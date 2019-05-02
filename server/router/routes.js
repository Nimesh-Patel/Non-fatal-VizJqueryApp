'use strict';
const apiController = require('../controllers/apiController.js');
const testDataController = require('../controllers/testDataController');

module.exports = function(router, virtualPath) {
  //   router.get(virtualPath + '/*', function(req, res) {
  //     res.sendFile(`${process.env.PWD}/index.html`);
  //   });
  router.get(virtualPath + '/', function(req, res) {
    res.render('index', { virtualPath });
  });

  //Mock data routes
  // router.post('/api/genderData', apiController.genderData);
  // router.post('/api/callTreemapIntentData', apiController.callTreemapIntentData);
  // router.post('/api/callTreemapMechData', apiController.callTreemapMechData);
  // router.post('/api/callDispositionData', apiController.callDispositionData);
  // router.post('/api/callRaceData', apiController.callRaceData);

  // //mock age APIs
  // router.post('/api/callAgegroupsNoSexData', apiController.callAgegroupNoSexData);
  // router.post('/api/callAgegroupsSexData', apiController.callAgegroupSexData);
  // router.post('/api/callAgesNoSexData', apiController.callAgesNoSexData);
  // router.post('/api/callAgesSexData', apiController.callAgesSexData);

  // SAS API routes

  router.post(virtualPath + '/api/callStatsData', apiController.callStatsData);
  router.post(virtualPath + '/api/genderData', apiController.genderData);
  router.post(
    virtualPath + '/api/callAgeNoSexData',
    apiController.ageNoSexData
  );
  router.post(virtualPath + '/api/callAgeSexData', apiController.ageSexData);
  router.post(
    virtualPath + '/api/callRaceNoSexData',
    apiController.raceNoSexData
  );
  router.post(virtualPath + '/api/callRaceSexData', apiController.raceSexData);
  router.post(
    virtualPath + '/api/callTreemapMechData',
    apiController.callTreemapMechData
  );
  router.post(
    virtualPath + '/api/callTreemapIntentData',
    apiController.callTreemapIntentData
  );
  router.post(
    virtualPath + '/api/callDispositionData',
    apiController.callDispositionData
  );
  router.post(
    virtualPath + '/api/callAgeTrendsData',
    apiController.callAgeTrendsData
  );
  router.post(
    virtualPath + '/api/callRaceTrendsData',
    apiController.callRaceTrendsData
  );
  router.post(
    virtualPath + '/api/callSexTrendsData',
    apiController.callSexTrendsData
  );

  //mock data
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByOverall/dataTargets/byoveral',
    testDataController.callStatsData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByGenderTrend/dataTargets/bysextr',
    testDataController.callSexTrendsData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByAgesTrend/dataTargets/byagetr',
    testDataController.callAgeTrendsData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByRacesTrend/dataTargets/byracetr',
    testDataController.callRaceTrendsData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByAges/dataTargets/byage',
    testDataController.callAgeData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByAgeSex/dataTargets/byagesex',
    testDataController.callAgesSexData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByRaces/dataTargets/byrace',
    testDataController.callRaceNoSexData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByRaceSex/dataTargets/byracesx',
    testDataController.callRaceSexData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByGender/dataTargets/bygender',
    testDataController.callGenderData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByIntent/dataTargets/byintent',
    testDataController.callTreemapIntentData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByMech/dataTargets/bymech',
    testDataController.callTreemapMechData
  );
  router.post(
    virtualPath +
      '/SASBIWS/rest/storedProcesses/*/WISQARS/Non_Fatal/NF_ByDisp/dataTargets/bydisp',
    testDataController.callDispositionData
  );
};
