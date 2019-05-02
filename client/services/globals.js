'use strict';

module.exports = {
  isAgree: false,
  ribbonValues: {},
  allAges:
    [{
      agegrpID: 0,
      AgeGrpName: "00-04",
      AgeGrpLabel: "0 to 4"
    },
    {
      agegrpID: 5,
      AgeGrpName: "05-09",
      AgeGrpLabel: "5 to 9"

    },
    {
      agegrpID: 10,
      AgeGrpName: "10-14",
      AgeGrpLabel: "10 to 14"

    },
    {
      agegrpID: 15,
      AgeGrpName: "15-19",
      AgeGrpLabel: "15 to 19"

    },
    {
      agegrpID: 20,
      AgeGrpName: "20-24",
      AgeGrpLabel: "20 to 24"

    },
    {
      agegrpID: 25,
      AgeGrpName: "25-29",
      AgeGrpLabel: "25 to 29"

    },
    {
      agegrpID: 30,
      AgeGrpName: "30-34",
      AgeGrpLabel: "30 to 34"

    },
    {
      agegrpID: 35,
      AgeGrpName: "35-39",
      AgeGrpLabel: "35 to 39"

    },
    {
      agegrpID: 40,
      AgeGrpName: "40-44",
      AgeGrpLabel: "40 to 44"

    },
    {
      agegrpID: 45,
      AgeGrpName: "45-49",
      AgeGrpLabel: "45 to 49"

    },
    {
      agegrpID: 50,
      AgeGrpName: "50-54",
      AgeGrpLabel: "50 to 54"

    },
    {
      agegrpID: 55,
      AgeGrpName: "55-59",
      AgeGrpLabel: "55 to 59"

    },
    {
      agegrpID: 60,
      AgeGrpName: "60-64",
      AgeGrpLabel: "60 to 64"

    },
    {
      agegrpID: 65,
      AgeGrpName: "65-69",
      AgeGrpLabel: "65 to 69"

    },
    {
      agegrpID: 70,
      AgeGrpName: "70-74",
      AgeGrpLabel: "70 to 74"

    },
    {
      agegrpID: 75,
      AgeGrpName: "75-79",
      AgeGrpLabel: "75 to 79"

    },
    {
      agegrpID: 80,
      AgeGrpName: "80-84",
      AgeGrpLabel: "80 to 84"

    },
    {
      agegrpID: 85,
      AgeGrpName: "85+",
      AgeGrpLabel: "85+"

    },
    {
      agegrpID: 199,
      AgeGrpName: "Unknown",
      AgeGrpLabel: "Unknown"

    }
    ],

  generateTabThroughElements: function (id) {
    setTimeout(function () {
      var elements = document.getElementById(id).children;
      var sum = 0;
      var name;
      if (elements.length) {
        for (var i = 0; i < elements.length; i++) {
          sum += elements[i].__data__.crudeNumber;
        }
        for (var i = 0; i < elements.length; i++) {

          if ($("#injuryDropdown").val() == 'mechanism') {
            name = elements[i].__data__.mechName;
          } else {
            name = elements[i].__data__.intentName;
          }
          elements[i].setAttribute('tabindex', '0');
          elements[i].setAttribute('aria-label', name + ' ' + $.number(((elements[i].__data__.crudeNumber / sum) * 100), 1) + '%');
        }
      } else {
        this.generateTabThroughElements(id);
      }
    }, 500);
  },
  checkDataSuppression: function (data) {
    var suppressed = false;
    var tempArray = [];
    data.forEach(function (item) {
      if (item.crudeNumber < 10 && item.crudeNumber != 0 && item.crudeNumber != '' && item.crudeNumber != null && item.crudeNumber != undefined) {
        tempArray.push('true');
      }
    });
    if (tempArray.length === 1 && !$('#selectAllStates').is(':checked')) {
      suppressed = true;
    }
    return suppressed;
  },
  renderRibbon: function (data) {
    $('#crudeNumber').html('');
    $('#crudeRate').html('');
    $('#ageAdjustedRate').html('')
    $('#crudeNumber').html(data.crudeNumber);
    $('#crudeRate').html(data.crudeRate);
    $('#ageAdjustedRate').html(data.ageAdjustedRate);
    $('#totalPopulation').html(data.population);
  },
  containsAll: function (searchItems, array) {
    let valid = true;
    searchItems.forEach(function (searchItem) {
      let present = false;
      array.forEach(function (item) {
        if (item == searchItem) {
          present = true;
        }
      });
      present = _.includes(array, searchItem);
      if (present === false) {
        valid = false;
        return;
      }
    });
    return valid;
  },
  intentMechCombo: {
    intent: '0',
    mech: '3000',
  },
  ageList: ["0004", "0509", "1014", "1519", "2024", "2529", "3034", "3539", "4044", "4549", "5054", "5559", "6064", "6569", "7074", "7579", "8084", "85UP", "98UK"],
  charts: {
    disposition: {
      metadata: {
        id: null,
        compare: null,
        group: null,
        count: null,
        colorset: [],
        width: null
      },
      data: [],
      downloadData: []
    },
    treemap: {
      metadata: {
        id: null,
        compare: null,
        group: null,
        count: null,
        colorset: [],
        width: null
      },
      dataIntent: [],
      dataMech: [],
      downloadData: []
    },
    bars: {
      ageBar: {
        metadata: {
          id: null,
          compare: null,
          group: null,
          count: null,
          colorset: [],
          width: null
        },
        data: [],
        downloadData: []
      },
      genderBar: {
        metadata: {
          id: null,
          compare: null,
          group: null,
          count: null,
          colorset: [],
          width: null
        },
        buildData: [],
        data: [],
        downloadData: []
      },
      ethnBar: {
        metadata: {
          id: null,
          compare: null,
          group: null,
          count: null,
          colorset: [],
          width: null
        },
        data: [],
        sexData: [],
        hispData: [],
        noHispOrSexData: [],
        noHispCompData: [],
        downloadData: []
      }
    },
    trends: {
      ageTrend: {
        metadata: {
          id: null,
          compare: null,
          group: null,
          count: null,
          colorset: [],
          width: null
        },
        data: [],
        downloadData: []
      },
      genderTrend: {
        metadata: {
          id: null,
          compare: null,
          group: null,
          count: null,
          colorset: [],
          width: null
        },
        data: [],
        downloadData: []
      },
      ethnTrend: {
        metadata: {
          id: null,
          compare: null,
          group: null,
          count: null,
          colorset: [],
          width: null
        },
        data: [],
        downloadData: []
      },
      death: {
        metadata: {
          id: null,
          compare: null,
          group: null,
          count: null,
          colorset: [],
          width: null
        },
        data: [],
        downloadData: []
      }
    }
  },
  dropdowns: {
    treemap: 'crudeNumber',
    state: 'ageAdjustedRate',
    sex: 'ageAdjustedRate',
    agegrp: 'crudeRate',
    ethn: 'ageAdjustedRate',
    death: 'ageAdjustedRate',
    heatmap: 'rank',
  },
  filters: {
    racethn: "0",
    start_year: "",
    end_year: "",
    disp: [],
    sex: [],
    intentId: [],
    intentName: "",
    mechName: "",
    matrixIntent: "",
    traffic: "",
    isTraffic: "",
    mechId: [],
    matrixMech: "",
    fiveyr1: "",
    fiveyr2: "",
    c_age1: "",
    c_age2: "",
    agebuttn: "",
    groupby1: "",
  },
  palettes: {
    compare: ["#674172", "#88BCD8", "#16A085"],
    gender: ["#E08283", "#33435C", "#674172"],
    testing: ["#674172", "#33435C", "#E08283"],

    genderReverse: ["#674172", "#33435C", "#E08283"],
    //genderReverse: ["#E08283", "#674172", "#33435C"],
    genderAge: ["#878787", "#674172", "#33435C", "#E08283"],
    disposition: ["#33435C", "#b890bb", "#88BCD8", "#674172", "#C6CC8B", "#EBBE9B", "#E08283"],
    combined: ["#16A085"],
    heatmap: ["#FBF19E", "#DDA067", "#CB6D4F", "#AD1726", "#640000"],
    heatmapBlue: ['#1E4887', '#4481B8', '#78ADD2', '#C1D6E5', '#EFF3FE'],
    heatmapBlueReverse: ['#EFF3FE', '#C1D6E5', '#78ADD2', '#4481B8', '#1E4887'],
    heatmapDarkBlue: ['#1C427B', '#325891', '#5B79A7', '#849BBD', '#ADBCD3', '#BBC8DB', '#D2DAE7', '#EAEEF4'],
    heatmapGreen: ["#87DDCC", "#5AC3AE", "#34AC94", "#16A085"],
    heatmapPurple: ["#C3B5C7", "#9E86A5", "#7F5E89", "#674172"],
    treemap: ["#33435C", "#16A085", "#88BCD8", "#674172", "#C6CC8B", "#EBBE9B", "#E08283"],
    trends: [
      '#075FA9', /* CDC blue */
      // '#33435C', /* color 1 (male) */
      '#16A085', /* Color 2, green */
      '#88BCD8', /* Color 3, light blue */
      '#674172', /* Color 4, purple */
      '#C6CC8B', /* Color 5, chartreuse/yellow/green */
      '#878787', /* Color 6, grey (dark lines) */
      // '#E08283', /* color 7 (female) */
      '#042C4D', /* CDC blue, darker */
      '#0A493D', /* Color 2, green, darker */
      '#3E5663', /* Color 3, light blue, darker */
      '#2F1E34', /* Color 4, purple, darker */
      '#5A5D40', /* Color 5, chartreuse, darker */
      '#0A493D', /* Color 6, grey (dark lines), darker */
      '#181F2A', /* color 1 (male), darker */
      '#663C3C', /* color 7 (female), darker */
      '#7D8797', /* color 1 (male), lighter */
      '#EBAFB0', /* color 7 (female), darker */
      '#6AC2B1', /* Color 2, green, lighter */
      '#B3D4E6', /* Color 3, light blue, lighter */
      '#9E86A5', /* Color 4, purple, lighter */
      '#DADEB5', /* Color 5, chartreuse, lighter */
    ],
  },
  anc_legends: [],
  anc_deaths: {},
  anc_states: {},
  resetGlobals: {},
  globalDefaults: {},
  intents: {
    "0": {
      "intentId": [1, 2, 4, 5, 6],  //[0,1,2,3,4,5,6,7,8],
      "name": "All Intents"
    },
    "1": {
      intentId: [1],
      name: "Unintentional",
    },
    "7": {
      intentId: [2, 5, 4, 6],
      name: "Violence-related",
    },
    "3": {
      intentId: [5, 4],
      name: "Assault - All",
    },
    "5": {
      intentId: [5],
      name: "Assault - Other"
    },
    "4": {
      intentId: [4],
      name: "Assault - Sexual"
    },
    "6": {
      intentId: [6],
      name: "Legal Intervention"
    },
    "8": {
      intentId: [5, 4, 6],
      name: "Assault and Legal Intervention"
    },
    "2": {
      intentId: [2],
      name: "Self-Harm"
    },
  },
  mechanisms: {
    "3000": {   //removed value 3000 for All Mechs based on Nimesh's comment
      mechId: [3160, 3170, 3080, 3130, 3060, 3100, 3150, 3190, 3180, 3120, 3140, 3200, 3090, 3110, 3070, 3010, 3020, 3030, 3040, 3050, 3880, 3990],
      name: "All Causes"
    },
    "3160": {
      mechId: [3160],
      name: "Dog",
    },
    "3170": {
      mechId: [3170],
      name: "Other, including sting",
    },
    "3080": {
      mechId: [3080],
      name: "Cut/Pierce",
    },
    "3130": {
      mechId: [3130],
      name: "Drowning / Submersion"
    },
    "3060": {
      mechId: [3060],
      name: "Fall"
    },
    "3100": {
      mechId: [3100],
      name: "Fire / Burn"
    },
    "3150": {
      mechId: [3150],
      name: "Foreign Body"
    },
    "3190": {
      mechId: [3190],
      name: "BB / Pellet Gun",
    },
    "3180": {
      mechId: [3180],
      name: "Firearm"
    },
    "3120": {
      mechId: [3120],
      name: "Inhalation / Suffocation"
    },
    "3140": {
      mechId: [3140],
      name: "Machinery"
    },
    "3200": {
      mechId: [3200],
      name: "Natural / Environment"
    },
    "3090": {
      mechId: [3090],
      name: "Overexertion",
    },
    "3110": {
      mechId: [3110],
      name: "Poisoning"
    },
    "3070": {
      mechId: [3070],
      name: "Struck By / Against"
    },
    "3001": {
      mechId: [3010, 3020, 3030, 3040, 3050],
      name: "All Transportation"
    },
    "3010": {
      mechId: [3010],
      name: "Motor Vehicle Occupant"
    },
    "3020": {
      mechId: [3020],
      name: "Motorcyclist",
    },
    "3030": {
      mechId: [3030],
      name: "Pedal cyclist (bicyclist, etc.)"
    },
    "3040": {
      mechId: [3040],
      name: "Pedestrian"
    },
    "3050": {
      mechId: [3050],
      name: "Other"
    },
    "3880": {
      mechId: [3880],
      name: "Other Specified"
    },
    "3990": {
      mechId: [3990],
      name: "Unknown / Unspecified"
    }
  },
};