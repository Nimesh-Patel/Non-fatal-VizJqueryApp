'use strict';
 

//MOCK DATA
const mockStatsData = require('../mockData/NF_ByOverall.json')
const mockGenderData = require('../mockData/gender.json');
const mockBubbleData = require('../mockData/NF_byDISP.json');
const mockRaceNoSexData = require('../mockData/race/raceNoSex.json');
const mockRaceSexData = require('../mockData/race/raceSex.json');

//mock age data
const mockAgegroupNoSexData = require('../mockData/age/agegroupsNoSex.json');
const mockAgegroupSexData = require('../mockData/age/agegroupsSex.json');
const mockAgesNoSexData = require('../mockData/age/agegroupsNoSex.json');
const mockAgesSexData = require('../mockData/age/agegroupsSex.json');

const mockTreemapIntentData = require('../mockData/treemap-intent.json')
const mockTreemapMechData = require('../mockData/treemap-mech.json')
const mockAgeTrendsData = require('../mockData/NF_ByAgesTrend.json');
const mockRaceTrendsData = require('../mockData/NF_ByRaceTrend.json');
const mockSexTrendsData = require('../mockData/NF_BySexTrend.json');


const callStatsData = (req, res) => {
    res.status('200').json(mockStatsData);
};

const callDispositionData = (req, res) => {
    res.status('200').json(mockBubbleData);
};

const callAgegroupNoSexData = (req, res) => {
    res.status('200').json(mockAgegroupNoSexData);
};
const callAgegroupSexData = (req, res) => {
    res.status('200').json(mockAgegroupSexData);
};
const callAgesNoSexData = (req, res) => {
    res.status('200').json(mockAgesNoSexData);
};
const callAgesSexData = (req, res) => {
    res.status('200').json(mockAgesSexData);
};

const callRaceNoSexData = (req, res) => {
    res.status('200').json(mockRaceNoSexData);
};

const callRaceSexData = (req, res) => {
    res.status('200').json(mockRaceSexData);
};

const callAgeData = (req, res) => {
    res.status('200').json(mockAgesNoSexData);
};

const callTreemapIntentData = (req, res) => {
    res.status('200').json(mockTreemapIntentData);
};

const callTreemapMechData = (req, res) => {
    res.status('200').json(mockTreemapMechData);
};

const callGenderData = (req, res) => {
    res.status('200').json(mockGenderData);
}

const callAgeTrendsData = (req, res) => {
    res.status('200').json(mockAgeTrendsData);
  };

const callRaceTrendsData = (req, res) => {
    res.status('200').json(mockRaceTrendsData);
};

const callSexTrendsData = (req, res) => {
    res.status('200').json(mockSexTrendsData);
};

module.exports = {
  //mock
  callStatsData, 
  callDispositionData,
  callTreemapIntentData,
  callAgeData, 
  callTreemapMechData,
  callRaceNoSexData,
  callRaceSexData,
  callAgegroupNoSexData,
  callAgegroupSexData,
  callAgesNoSexData,
  callAgesSexData,
  callGenderData,
  callAgeTrendsData,
  callRaceTrendsData,
  callSexTrendsData,
}