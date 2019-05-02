'use strict';

let app = require('../app/app.global.js');

const setIntentAndMechValues = (intent, mech) => {
    intent = intent || 0;  // defaults
    mech = mech || 3000;
    app.globals.filters.intentId = app.globals.intents[intent]["intentId"];
    app.globals.filters.matrixIntent = intent;
   // app.globals.filters.mechId =  app.globals.mechanisms[mech]["mechId"];
   // app.globals.filters.matrixMech = mech;

}
  
module.exports = {
    setIntentAndMechValues,
}