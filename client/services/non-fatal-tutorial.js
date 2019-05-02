var hopscotch = require('hopscotch');

var delayFocus = function() {
  setTimeout(function() {
    $(".tour-cdc-wisqars").focus();
    $(".hopscotch-next").focus();
  },1000);
};

var tour = {
  id: "cdc-wisqars",
  steps: [
    {
      onNext: function(){
      },
      onShow: function(){
        sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
        delayFocus()
      },
      title: "START YEAR",
      content: "Please select a Start Year and End Year. Once your selection is made, hit <strong>EXPLORE DATA</strong> button.",
      target: "#year_select_first_landing",
      placement: "top",
    },
    {
        onNext: function(){
        },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "END YEAR",
        content: "Please select a Start Year and End Year. Once your selection is made, hit <strong>EXPLORE DATA</strong> button.",
        target: "#year_select_second_landing",
        placement: "top",
      },
      {
        onNext: function(){
            document.querySelector('button#non-fatal-explore').click();
            setTimeout(function(){
              hopscotch.showStep(3);
            }, 400)
        },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "EXPLORE NONFATAL INJURY DATA",
        content: "Click the <strong>EXPLORE DATA </strong>button to access the tool, or hit <strong> NEXT </strong> to continue with the Tutorial.",
        target: "#non-fatal-explore",
        placement: "bottom",
        multipage: true

      },
      {
        onNext: function(){
            $('#modal-nonFalaFilterDataModal').modal('show');
            setTimeout(function(){
                hopscotch.showStep(4);
              }, 300)
        },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "FILTER DATA",
        content: "This is the <strong> FILTER DATA </strong> button. This will open a window containing all the filter state options. For keyboard accessibility, all selection can be made here.",
        target: "#non-fatal-filter-data-button",
        placement: "bottom",
      },
      {
        onNext: function(){
            $('#modal-nonFalaFilterDataModal').modal('hide');
            setTimeout(function(){
                hopscotch.showStep(5);
              }, 300)
        },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "FILTER DATA",
        content: "This <strong>Filter Data</strong> window gives you complete control over the filter state of the application! Your filter state can be as broad or specific as desired.",
        target: "#applyFilterDataFilters",
        placement: "top",
      },
      {
        onNext: function(){
            $('.selectedSex-Id[value="2"]').trigger('click');
            $('.selectedSex-Id[value="3"]').trigger('click');
            $('#applyFilterDataFilters').trigger('click');
            setTimeout(function(){
                hopscotch.showStep(6);
              }, 300)
        },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "BREADCRUMBS",
        content: "These are <strong>Filter State</strong> Breadcrumbs, which show the current filter state of the application. When specific filters are applied, they will update here.",
        target: '.breadcrumb-container',
        placement: "bottom",
      },
      {
        onNext: function(){
            $('button[data-breadcrumb-type="sex"]').trigger('click');
            setTimeout(function(){
                hopscotch.showStep(7);
              }, 300)
        },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        onPrev: function(){
            sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
            $('.selectedSex-Id[value="2"]').trigger('click');
            $('.selectedSex-Id[value="3"]').trigger('click');
            $('#applyFilterDataFilters').trigger('click');
            setTimeout(function(){
                hopscotch.showStep(5);
              }, 200)
          },
        title: "BREADCRUMBS",
        content: "We have changed the current filter state of the application to show only <strong>Male</strong> results. Specific filters can be removed by clicking the <strong>X</strong> next to the Filter label ",
        target: '.breadcrumb-container',
        placement: "right",
      },
      {
        onNext: function(){
            $('button[data-breadcrumb-type="sex"]').trigger('click');
            setTimeout(function(){
                hopscotch.showStep(8);
              }, 300)
        },
        onPrev: function(){
            sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
            $('.selectedSex-Id[value="2"]').trigger('click');
            $('.selectedSex-Id[value="3"]').trigger('click');
            $('#applyFilterDataFilters').trigger('click');
            setTimeout(function(){
                hopscotch.showStep(6);
              }, 200)
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "BREADCRUMBS",
        content: "By removing the <strong>Male</strong> filter, we have reset the filter state of the application back to <strong>All Filters</strong>.",
        target: '.breadcrumb-container',
        placement: "bottom",
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "SELECT YEARS",
        content: "You are able to adjust the <strong>Start Year </strong> and <strong>End Year</strong>, at any point in your exploration. Remember to select the <strong>SUBMIT YEAR SELECTION </strong>button if you change your year range.",
        target: '#selectYearsSubmitBtn',
        placement: "left",
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "TRENDS TAB",
        content: "Click the <strong>TRENDS</strong> button to view nonfatal injury data trends over time, beginning in year 2001.",
        target: '#trends-tab',
        placement: "left",
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "STATISTICS RIBBON",
        content: "This <strong>Statistics Ribbon</strong> will update as the filter state of the application changes.",
        target: '#nonFatalStatRibbon',
        placement: "top",
        xOffset : 100,
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "TREEMAP",
        content: "This is the <strong>Nonfatal Injury Causes Treemap</strong>. It is a two level visualization, showing Intents and Mechanisms of Nonfartal Injury. " +
        " Hovering over a specific Intent will show a Tooltip containing more information about the Intent. " +
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",
        target: '#chartContainer_treemap',
        placement: "top",
        xOffset : 50,
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "TREEMAP",
        content: "To regroup the Treemap by Mechanism of Injury, change the <strong>Show As</strong> selection.",
        target: '#treemapDropdown',
        placement: "top",
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "TREEMAP",
        content: "To view the Treemap as a table, change the <strong>View As</strong> selection.",
        target: '#treemapViewOption',
        placement: "top",
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "DISTRIBUTION BY DISPOSITION",
        content: "This is the <strong>Distribution by Disposition </strong> bubble chart. It contains various groupings of categories that show where the injured person went when released from emergency department. " +
        " Hovering over a specific Dispostion will show a Tooltip containing more information about the Disposition." +
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
        target: '#chartContainer_disposition',
        placement: "top",
        xOffset : 60,
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "DISTRIBUTION BY DISPOSITION",
        content: "As the bubble chart legend describes, the dispositions are sized based on how they compare to each other." +
        " Click on a Disposition bubble to filter the distribution visuals by that Disposition. ",
        target: '#dispositionLegend',
        placement: "top",
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "DISTRIBUTION BY SEX",
        content: "This is the <strong>Distribution By Sex </strong>chart. Interacting with chart's bars will update the Gender filter of the application. " +
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
        target: '#chartContainer_gender',
        placement: "top",
        xOffset : 60,
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "DISTRIBUTION BY SEX",
        content: "Click on the <strong>Show As</strong> dropdown menu to change the statistic displayed, and click on the <strong>View As</strong> dropdown menu to change the view from the bar chart to a data table.",
        target: '#genderDropdown',
        placement: "top",
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "DISTRIBUTION BY AGE",
        content: "This is the <strong>Distribution by Age </strong>chart. This chart visualizes each Age Group or Custom Age Range. Interacting with this chart will update the Age filter of the application. " +
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
        target: '#chartContainer_age',
        placement: "top",
        xOffset : 60,
      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "SHOW BREAKDOWN BY SEX",
        content: "Clicking this <strong>Show Breakdown by Sex </strong>checkbox will redraw to show distribution by both age and sex. Uncheck the box to return to the default distribution by age only.",
        target: '#chkAgeSex',
        placement: "top",
      },
      {
        onNext: function(){
            document.querySelector('#trends-tab').click();
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "DISTRIBUTION BY RACE / ETHNICITY",
        content: "This is the <strong>Distribution by Race and Ethnicity </strong>chart. This visualization represents a combination of <strong>Race </strong>and <strong>Ethnicities</strong> based on the current filter state of the application. " +
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
        target: '#chartContainer_race',
        placement: "top",
        xOffset : 60,
      },

      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "TREEMAP IN TRENDS TAB (filter on cause)",
        content: "This Treemap visualization illustrates how the Intents and Mechanisms of nonfatal injury compare to each other, but for the selected year only." +
        " As the tree map legend describes, each cause tile is sized based on how it ranks. Click on a cause to filter the distribution visuals by that cause."+
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
        target: '#chartContainer_treemap',
        placement: "top",
        xOffset : 60,

      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "DISPOSITION IN TRENDS TAB (filter on disposition)",
        content: "This Distribution by Injury Disposition chart visualization illustrates how the dispositions of nonfatal injury compare to each other, but for the selected year only." +
        "As the legend describes, each disposition is sized based on how it ranks. Click on a Disposition bubble to filter the distribution visuals by that disposition."+
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
        target: '#chartContainer_disposition',
        placement: "top",
        xOffset : 60,

      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "SEX TRENDLINE CHART",
        content: "This is the Distribution by Sex trendline chart. Hovering over a data point on the trendline will show the full description, data point year, and selected statistic." +
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
        target: '#chartContainer_gender',
        placement: "top",
        xOffset : 60,

      },
    //   {
    //     onNext: function(){
    //     },
    //     onPrev: function(){
    //       },
    //     onShow: function(){
    //       sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
    //       delayFocus()
    //     },
    //     title: "AGE TRENDLINE CHART",
    //     content: "This is the Distribution by Age trendline chart where each trendline represents a 5-year age group. Hovering over a data point on the trendline will show the full description, data point year, and selected statistic." +
    //     "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
    //     target: '#chartContainer_gender',
    //     placement: "top",
    //   },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "AGE TRENDLINE CHART",
        content: "This is the Distribution by Age trendline chart where each trendline represents a 5-year age group. Hovering over a data point on the trendline will show the full description, data point year, and selected statistic." +
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
        target: '#chartContainer_ageGroup',
        placement: "top",
        xOffset : 60,

      },
      {
        onNext: function(){
        },
        onPrev: function(){
          },
        onShow: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
          delayFocus()
        },
        title: "RACE / ETHNICITY TRENDLINE CHART",
        content: "This is the Distribution by Race and Ethnicity trendline chart. Hovering over a data point on the trendline will show the full description, data point year, and selected statistic." +
        "<br><br>For <strong><u>keyboard accessibility</u> </strong>, use the FILTER DATA button to get information on the charts. ",   
        target: '#chartContainer_raceGroup',
        placement: "top",
      },
      {
        title: "FINISHED TUTORIAL!",
        target: "#chartContainer_raceGroup",
        placement: "left",
        nextBtn: "DONE",
        onShow: function() {
          delayFocus();
        },
        onPrev: function(){
          sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
        }
      }
    
  ],
    onClose: function(){  
    console.log("Non-fatal Tutorial was closed.")
    sessionStorage.setItem('closedTutorial', 'yes')
    sessionStorage.setItem('tutorialStep', hopscotch.getCurrStepNum())
    },
  showPrevButton: true,
};

exports.startTutorialInit = function () {
  hopscotch.startTour(tour, 0);
};

exports.endTutorialInit = function () {
  if (hopscotch.getCurrTour() != undefined) {
    hopscotch.endTour();
  }
};

exports.startNewTutorial = function () {
  hopscotch.startTour(tour, 6)
};

exports.startTutorial = function () {
    hopscotch.startTour(tour, parseInt(sessionStorage.getItem('tutorialStep'), 10))
};

exports.endTour = function () {
      hopscotch.endTour();
  };

    //Selected years
   exports.startStatemapSelectedYearsTour = function () {
    hopscotch.startTour(tour,28);
    };
    exports.startSexSelectedYearsTour = function () {
     hopscotch.startTour(tour,29);
   };
   exports.startAgeSelectedYearsTour = function () {
     hopscotch.startTour(tour,30);
   };
   exports.startRaceSelectedYearsTour = function () {
     hopscotch.startTour(tour,32);
   };

// Trends
   exports.startStatemapTrendsTour = function () {
    hopscotch.startTour(tour,34);
    };
    exports.startSexTrendsTour = function () {
     hopscotch.startTour(tour,35);
   };
   exports.startAgeTrendsTour = function () {
     hopscotch.startTour(tour,36);
   };
   exports.startRaceTrendsTour = function () {
     hopscotch.startTour(tour,37);
   };

exports.endTutorial = function () {
  hopscotch.endTour(true);
};

