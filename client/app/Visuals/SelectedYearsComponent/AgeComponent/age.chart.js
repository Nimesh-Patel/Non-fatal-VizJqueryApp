'use strict';

let app = require('../../../app.global.js');
const formats = require('../../../../services/formats.js');
const toastr = require('toastr');
const comparisonLegendTemplate = require('../../Legends/ageGroupLegend.hbs')

const getTooltipData = (metadata, groupData, compareData, colors, dataObject) => {
  // Checks to see if breakdown by sex is checked for tool tip rendering
  let breakdownByEthnSex = $('#chkRaceSex').is(':checked');
  let breakdownByAgeSex = $('#chkAgeSex').is(':checked');
  // Checks to see if view state is Analyze and Compare or Explore Data.
  let compareSex = (metadata.compare == "sex");
  let ageBar = (metadata.id == "#ageBar");
  let Xtitle = "Ages";
  let palette;
  let groupStr;
  let countStr;
  let countFormat;
  let compareStr;

  if (compareData.key === "Males" || compareData.key === "Females") {
    if (app.globals.filters.sex.length > 1) {
      palette = colors(compareData.key);
    } else if (app.globals.filters.sex[0] == "M") {
      palette = app.globals.palettes.genderReverse[0];
    } else {
      palette = app.globals.palettes.genderReverse[1];
    }
  } else {
    palette = colors(compareData.key);
  }
  if (!breakdownByAgeSex) {
    groupStr = "<strong><span style='color:" + palette + "'>" +
      formats.formatDataName(metadata.compare) + ": " +
      compareData.key + "</span></strong><br/>";
    if (metadata.count == "injuries") {
      countFormat = $.number(compareData.values, 0)
    } else {
      countFormat = $.number(compareData.values, 1)
    }
    // countFormat = formats.formatCount(compareData.values, metadata.group);
    if (app.globals.currentComparisonView == 'Deaths') {
      if (dataObject['crudeNumber'] != 0 && dataObject['crudeNumber'] < 10 && !$('#selectAllStates').is(':checked')) {
        countStr = formats.formatDataName(metadata.count) + ": " + "--";
      } else if (dataObject['crudeNumber'] < 21) {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat + "**";
      } else {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat;
      }
    } else {
      if (dataObject['crudeNumber'] != 0 && dataObject['crudeNumber'] < 10) {
        countStr = formats.formatDataName(metadata.count) + ": " + "--";
      } else if (dataObject['crudeNumber'] < 21) {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat + "**";
      } else {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat;
      }
    }
    return groupStr + countStr;
  } else {
    compareStr = "<strong><span style='color:" + palette + "'>" +
      formats.formatDataName(metadata.compare) + ": " +
      compareData.key + "</span></strong><br/>";
    groupStr = formats.formatDataName(metadata.group) + ": " + groupData.key + "<br/>";
    if (metadata.count == "injuries") {
      countFormat = $.number(compareData.values, 0)
    } else {
      countFormat = $.number(compareData.values, 1)
    }
    if (app.globals.currentComparisonView == 'Deaths') {
      if (dataObject['crudeNumber'] != 0 && dataObject['crudeNumber'] < 10 && !$('#selectAllStates').is(':checked')) {
        countStr = formats.formatDataName(metadata.count) + ": " + "--";
      } else if (dataObject['crudeNumber'] < 21) {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat + "**";
      } else {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat;
      }
    } else {
      if (dataObject['crudeNumber'] != 0 && dataObject['crudeNumber'] < 10) {
        countStr = formats.formatDataName(metadata.count) + ": " + "--";
      } else if (dataObject['crudeNumber'] < 21) {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat + "**";
      } else {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat;
      }
    }
    return compareStr + groupStr + countStr;
  }
}


const filterDataByAge = (group, chartType, compare) => {
  if (app.globals.filters.groupby1 == 'NONE1') {
    if (compare.type == 'sex') {
      filterAgeDataBySex(compare.by);
    }
  }
  else {
    filterDataByAgeGraph(group);
  }
}

const filterAgeDataBySex = (group) => {
  let sex;
  if (group == 'Males' || group == 'Male') {
    sex = "MaleS";
  } else if (group == "Females" || group == "Female") {
    sex = "FemaleS";
  }
  let checkbox = $('.selectedSex-Id[data-sex-name="' + sex + '"]');
  if ($('#sex-0').is(':checked')) {
    $('#sex-0').trigger('click');
    checkbox.trigger('click');
    $('#applyFilterDataFilters').trigger('click');
    toastr.options = app.toastrOptions;
    toastr.success('You have applied a filter of Gender ' + sex + '.');
  } else if (!checkbox.is(':checked')) {
    $('#sex-0').trigger('click');
    toastr.options = app.toastrOptions;
    toastr.success('You have applied a filter of Male &amp; Female.');
    $('#applyFilterDataFilters').trigger('click');
  } else if (checkbox.is(':checked')) {
    $('#sex-0').trigger('click');
    toastr.options = app.toastrOptions;
    toastr.success('You have applied a filter of Male &amp; Female.');
    $('#applyFilterDataFilters').trigger('click');
  }
}

const filterDataByAgeGraph = (age) => {
  for (var i = 0; i < app.globals.allAges.length; i++) {
    if (age === app.globals.allAges[i]['AgeGrpName']) {
      app.globals.filters.fiveyr1 = [app.globals.allAges[i]['agegrpID']];
      app.globals.filters.fiveyr2 = [app.globals.allAges[i]['agegrpID']];

      toastr.options = app.toastrOptions;
      toastr.success('You have applied a filter of Ages ' + app.globals.allAges[i]['AgeGrpName'] + '.');
      $('#ageGroupsRadioBtn input[value="group"]').trigger('click');
      $('#NonFatalAgeGroupMin option[value="' + app.globals.filters.fiveyr1 + '"]').prop('selected', true);
      $('#NonFatalAgeGroupMax option[value="' + app.globals.filters.fiveyr2 + '"]').prop('selected', true);

      //  filterData.checkSexCheckboxes();  // ?????
      // filterData.checkStatesCheckboxes();

      $('#applyFilterDataFilters').trigger('click');

    }
  }
}
const assignLegend = (data, metadata, getLegendColor) => {
  let breakdownBySex = $('#chkAgeSex').is(':checked');
  let names = [];
  app.globals.anc_legends = [];
  for (var i = 0; i < data.length; i++) {
    var legendObj = {
      name: data[i].key,
    };
    if (breakdownBySex) {
      if (app.globals.filters.sex.length > 1) {
        legendObj.color = getLegendColor(data[i].key)
      }
      else if (app.globals.filters.sex[0] == '1') {
        legendObj.color = app.globals.palettes.gender[1];
      }
      else if (app.globals.filters.sex[0] == '2') {
        legendObj.color = app.globals.palettes.gender[0];
      }
      else {
        legendObj.color = app.globals.palettes.gender[2];
      }
    } else {
      legendObj.color = getLegendColor(data[i].key)
    }
    app.globals.anc_legends.push(legendObj);
  }
  var compare = metadata.compare === "sex" ? "sex" : metadata.compare;
  buildComparisonLegend(compare);

}


const buildComparisonLegend = () => {
  $('#ageBarLegend').html('');
  $('#ageBarLegend').html(comparisonLegendTemplate({ legends: app.globals.anc_legends }));
}

const drawAgeChart = (data, metadata) => {
  app.globals.charts.bars.ageBar.buildData = data;
  $(metadata.id).empty();
  $(metadata.id).css('width', '95%').css('height', $(metadata.id).width() * .618).css('margin', '0 auto');

  // data = services.buildSuppressionObjects(data, metadata);
  // CONSTANTS
  let margin = {
    top: 5,
    right: 75,
    bottom: 75,
    left: 65
  },
    w = $(metadata.id).width() - margin.left - margin.right, // width
    h = $(metadata.id).height() - margin.top - margin.bottom; // height

  // SCALES
  let xScale = d3.scale.ordinal()
    .domain(data.map(function (d) {
      return d[metadata.group];
    }))
    .rangeRoundBands([0, w], 0.1);

  let yMax = d3.max(data, function (d) {
    return d[metadata.count];
  });

  let mid = yMax / 2;

  let yScale = d3.scale.linear()
    .domain([0, yMax * 1.1])
    .range([h, 0]);

  let colors = d3.scale.ordinal()
    .domain(function (d) {
      return d.compare;
    })
    .range(metadata.colorset);
  // AXIS
  let xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

  let yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickSize(-w);

  // Define the div for the tooltip
  if ($('#tooltip2').length > 0) {
    $('#tooltip2').remove();
  }
  let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip2")
    .style("opacity", 0);

  //SVG element
  let svg2 = d3.select(metadata.id)
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // xAxis
  svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (h) + ")")
    .call(xAxis)
    //format tick labels
    .selectAll(".tick text")
    .call(formats.wrap, xScale.rangeBand());

  // yAxis
  svg2.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0 ,0)")
    .call(yAxis);

  // Assign X and Y Axis Titles
  if (metadata.id == "#ageBar") {
    var Xtitle = "Ages";
    if (d3.select("#ageDropdown").property("value") == "injuries") {
      var Ytitle = "Number of Injuries";
    } else { var Ytitle = ""; };
  } else {
    var Xtitle = "";
    var Ytitle = "";
  };

  // X and Y Axis Titles labels
  svg2.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (w / 2) + "," + (h + 50) + ")")
    .text(Xtitle);
  svg2.append("text")
    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate(" + (0 - 50) + "," + (h / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
    .text(Ytitle);
  // NEST DATA
  let dataNest = d3.nest()
    .key(function (d) {
      return d[metadata.group];
    }) // group by
    .key(function (d) { //console.log(d[metadata.compare]); console.log(d[metadata.count]);
      return d[metadata.compare];
    }) // then compare type (state or cause)
    .rollup(function (v) {
      return d3.sum(v, function (d) {
        return +d[metadata.count];
      });
    }) // sum deaths within each group > compare leaf
    .entries(data);

  let dataNestLegend = d3.nest()
    .key(function (d) {
      return d[metadata.compare];
    })
    .entries(data);

  dataNest.forEach(function (groupObj, i) {
    // Grouped Bars
    let breakdownBySex = $('#chkAgeSex').is(':checked')
    let set = svg2.append("g")
      .attr("class", "set-" + (i + 1));
    let numCategories = groupObj.values.length;
    // for each compare item
    groupObj.values.forEach(function (compareObj, j) {
      // ADD BAR
      let bar = set
        .append("rect")
        .attr("tabindex", 0)
        .attr("aria-label", function () {
          if ($('#ageDropdown').val() == 'injuries') {
            if (breakdownBySex) {
              return compareObj.key + ' ' + groupObj.key + ' ' + $('#ageDropdown').val() + ' ' + $.number(compareObj.values, 0);
            } else {
              return groupObj.key + ' ' + $('#ageDropdown').val() + ' ' + $.number(compareObj.values, 0);
            }
          } else {
            if (breakdownBySex) {
              return compareObj.key + ' ' + groupObj.key + ' ' + $('#ageDropdown').val() + ' ' + $.number(compareObj.values, 1);
            } else {
              return groupObj.key + ' ' + $('#ageDropdown').val() + ' ' + $.number(compareObj.values, 1);
            }
          }


        })
        .attr("class", "bar compare-" + i)
        .attr("width", xScale.rangeBand() / numCategories)
        .attr("y", function (d) {
          return yScale(compareObj.values);
        })
        .attr("x", function (d) {
          return (xScale(groupObj.key) + j * (xScale.rangeBand() / numCategories));
        })
        .attr("height", function (d) {
          return h - yScale(compareObj.values);
        })
        .style("display", function (d) {
          let currentValue = data.filter((item) => {
            if (item[metadata.group] == groupObj.key && item[metadata.compare] == compareObj.key) {
              return item;
            }
          })
          currentValue = currentValue[0];
          // if(currentValue.secondarySuppressed || currentValue.suppressed){
          //   return "none";
          // }
        })
        .attr("fill", function (d) {
          if (compareObj.key === "Males" || compareObj.key === "Females" || compareObj.key === "Unknown" || compareObj.key === "Male" || compareObj.key === "Both Sexes" || compareObj.key === "Female") {
            if (app.globals.filters.sex.length > 1) {
              return colors(compareObj.key);
            }
            else if (app.globals.filters.sex[0] == "1") {
              return app.globals.palettes.testing[1];
            }
            else if (app.globals.filters.sex[0] == "2") {
              return app.globals.palettes.testing[2];
            }
            else {
              return app.globals.palettes.testing[0];
            }
          } else {
            return colors(compareObj.key);
          }
        });
      svg2.append("text")
        .attr("class", function (d) {
          return "value-asterisk-groupedBar";
        })
        .attr("x", function (d) {
          return (xScale(groupObj.key) + j * (xScale.rangeBand() / numCategories));
        })
        .attr("y", function (d) {
          return yScale(mid);
        })
        .attr("dx", function (d) {
          if (numCategories === 1) {
            return ((xScale.rangeBand() / numCategories) / 2) - 12;
          }
          if (numCategories === 2) {
            return (xScale.rangeBand() / numCategories) / 3;
          }
          if (numCategories === 4) {
            return (xScale.rangeBand() / numCategories) / 4;
          }
        })
        .attr("dy", "0.5em")
        .text(function (d) {
          let currentValue = data.filter((item) => {
            if (item[metadata.group] == groupObj.key && item[metadata.compare] == compareObj.key) {
              return item;
            }
          })
          currentValue = currentValue[0];
          // if(currentValue.secondarySuppressed || currentValue.suppressed){
          //   return "--";
          // } else {
          //   return "";
          // }
        })
      // TOOLTIPS
      bar.on("mouseover", function (d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
      });
      bar.on("mousemove", function () {
        let dataObject = data.filter((item) => {
          if (item[metadata.group] == groupObj.key && item[metadata.compare] == compareObj.key) {
            return item;
          }
        })
        dataObject = dataObject[0];
        tooltip.html(getTooltipData(metadata, groupObj, compareObj, colors, dataObject))
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 45) + "px");
      });
      bar.on("mouseout", function (d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        // setTimeout(() => {
        //   $(tooltip).remove();
        // }, 500)
      });
      bar.on('click', function (d) {
        //  tooltip.transition().duration(500).style("opacity", 0);
        let compare = { 'type': metadata.compare, 'by': compareObj.key };
        let group = groupObj.key;
        let chartType = metadata.group;
        filterDataByAge(group, chartType, compare);
      });

    });

    function getLegendColor(name) {
      return colors(name);
    }
    if (metadata.id === "#ageBar") {
      assignLegend(dataNestLegend, metadata, getLegendColor);
    }
  });
}

module.exports = {
  drawAgeChart,
}