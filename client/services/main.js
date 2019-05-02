
'use strict';

let globals = require('./globals');

const setIntentAndMechValues = (intent, mech) => {
    intent = intent || "0";
    mech = mech || "3000";
    globals.filters.intentId = globals.intents[intent]["intentId"];
    globals.filters.matrixIntent = intent;
    globals.filters.mechId = globals.mechanisms[mech]["mechId"];
    globals.filters.matrixMech = mech;
    globals.filters.intentName = globals.intents[intent]["name"];
    globals.filters.mechName = globals.mechanisms[mech]["name"];
}

const setGlobalFilters = () => {
    globals.filters.racethn = "0";
    globals.filters.start_year = "2015";
    globals.filters.end_year = "2015";
    globals.filters.disp = ["1","2","4","5"];
    globals.filters.sex = ["1", "2", "3"];
    globals.filters.traffic = "0";
    globals.filters.isTraffic = "No";
    globals.filters.fiveyr1 = "0";
    globals.filters.fiveyr2 = "199";
    globals.filters.c_age1 = "0";
    globals.filters.c_age2 = "199";
    globals.filters.groupby1 = "AGEGP";
    globals.filters.agebuttn = "all";
    setIntentAndMechValues();

}

module.exports = {
    setGlobalFilters,
    setIntentAndMechValues,

}