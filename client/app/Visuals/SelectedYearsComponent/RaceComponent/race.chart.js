'use strict';

let app = require('../../../app.global.js');
const formats = require('../../../../services/formats.js');
const raceLegendTemplate = require('../../Legends/raceBarLegend.hbs');

const getTooltipData = (metadata, groupData, compareData, colors, dataObject) => {
  let ethnBar = (metadata.id == "#raceChart");
  let palette;
  let compareStr, groupStr, countStr, countFormat;
  let Xtitle = "Races";
 
      palette = colors(compareData.key);
  
      groupStr = "<strong><span style='color:" + palette + "'>" +
      formats.formatDataName(metadata.compare) + ": " +
      compareData.key + "</span></strong><br/>";
      countFormat = formats.formatCount(compareData.values, metadata.group);

    if (dataObject['crudeNumber'] < 21) {
          countStr = formats.formatDataName(metadata.count) + ": " + countFormat+"**";
        } else {
          countStr = formats.formatDataName(metadata.count) + ": " + countFormat;
        }
      
      return groupStr + countStr;
   
}
const buildEthnLegend = () => {
  $('#raceLegend').html('');
  $('#raceLegend').html(raceLegendTemplate({legends: app.globals.ethnBar_legend}));
  
}
const assignLegend = (data, colorScale) => {
  app.globals.ethnBar_legend = [];
 
  let palettes;
  let breakdownBySex = $('#chkRaceSex').is(':checked')
  let names = [];

    if (breakdownBySex) {
      palettes = app.globals.palettes.gender;
      if (data[0].values) {
        data[0].values.forEach( function(item) {
          names.push(item.key);
        });
        names.forEach( function(name, i) {
            var legendObj = {
                name: name,
                palette: palettes[i]
            }
            if (breakdownBySex) {
              if (app.globals.filters.sex.length > 1) {
                legendObj.color = colorScale(name)
              } else if (app.globals.filters.sex[0] == 'M') {
                legendObj.color = app.globals.palettes.genderReverse[0];
              } else {
                legendObj.color = app.globals.palettes.genderReverse[1];
              }
            } else {
              legendObj.color = colorScale(name)
            }
            app.globals.ethnBar_legend.push(legendObj);
        });
      }
    } else {
      palettes = app.globals.palettes.trends;
      if (data[0].values) {
          data.forEach((obj) => {
              obj.values.forEach( function(item) {
                  names.push(item.key);
              });
          });
          names.forEach( function(name, i) {
              var legendObj = {
                  name: name,
                  color: colorScale(name),
                  palette: palettes[i]
              }
              app.globals.ethnBar_legend.push(legendObj);
          });
      }
    }
  buildEthnLegend();
};

const drawRaceChart = (data, metadata) => {

    //let suppressedObj = services.buildComparisonSuppressionObjects(data, metadata);
    $(metadata.id).empty();
    $(metadata.id).css('width', '100%').css('height', $(metadata.id).width() * .618);
   // data = services.buildSuppressionObjects(data, metadata);
    // CONSTANTS
    let margin = {
        top: 5,
        right: 5,
        bottom: 75,
        left: 105  //75
    },
    w = $(metadata.id).width() - margin.left - margin.right, // width
    h = $(metadata.id).height() - margin.top - margin.bottom; // height


    // SCALES
    let xScale = d3.scale.ordinal()
      .domain(data.map(function(d) {
        return d[metadata.group];
      }))
      .rangeRoundBands([0, w], 0.1);

    let yMax = d3.max(data, function(d) {
      return d[metadata.count];
    });

    let mid = yMax / 2;

    let yScale = d3.scale.linear()
      .domain([0, yMax * 1.1])
      .range([h, 0]);

    let colors = d3.scale.ordinal()
      .domain(function(d) {
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
    if ($('#tooltip3').length > 0 ){
      $('#tooltip3').remove();
    }
    let tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltip3")
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
    let Xtitle = "Races";
    let Ytitle = "Number of Injuries";
    // // if (metadata.id == "#gBar2") {
    // if (d3.select("#ethnDropdown").property("value") == "crudeNumber"){
    //     Ytitle = "Number of Deaths";
    // } else { 
    //     Ytitle = "Death Rate per 100,000";
    // }
    svg2.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (w/2) +","+(h+50)+")")
        .text(Xtitle);
    svg2.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (0-70) +","+(h/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text(Ytitle);

    // NEST DATA
    let dataNest = d3.nest()
    .key(function(d) {
    return d[metadata.group];
    }) // group by
    .key(function(d) { //console.log(d[metadata.compare]); console.log(d[metadata.count]);
    return d[metadata.compare];
    }) // then compare type (state or cause)
    .rollup(function(v) {
    return d3.sum(v, function(d) {
        return +d[metadata.count];
    });
    }) // sum deaths within each group > compare leaf
    .entries(data);


    dataNest.forEach(function(groupObj, i) {
        // Grouped Bars
        //tickCounter++;
        let breakdownBySex = $('#chkRaceSex').is(':checked')
        let set = svg2.append("g")
          .attr("class", "set-" + (i + 1));
        let numCategories = groupObj.values.length;
        // for each compare item
        groupObj.values.forEach(function(compareObj, j) {
            // ADD BAR
            let bar = set
              .append("rect")
              .attr("tabindex",0)
            //   .attr("aria-label", function() {
            //     if ($('#ethnDropdown').val() == 'crudeNumber'){
            //       if (breakdownBySex) {
            //         return compareObj.key+ ' '+groupObj.key+' '+ $('#ethnDropdown').val()+' '+ $.number(compareObj.values, 0);
            //       } else{
            //         return groupObj.key+' '+ $('#ethnDropdown').val()+' '+ $.number(compareObj.values, 0);
            //       }
            //     }  else {
            //       if (breakdownBySex) {
            //         return compareObj.key+ ' '+groupObj.key+' '+ $('#ethnDropdown').val()+' '+ $.number(compareObj.values, 1);
            //       } else{
            //         return groupObj.key+' '+ $('#ethnDropdown').val()+' '+ $.number(compareObj.values, 1);
            //       }
            //     }
                   
            // })
              .attr("class", "bar compare-" + i)
              .attr("width", xScale.rangeBand() / numCategories)
              .attr("y", function(d) {
                return yScale(compareObj.values);
              })
              .attr("x", function(d) {
                return (xScale(groupObj.key) + j * (xScale.rangeBand() / numCategories));
              })
              .attr("height", function(d) {
                return h - yScale(compareObj.values);
              })
              .style("display", function(d){
                let currentValue = data.filter((item) => {
                  if (item[metadata.group] == groupObj.key && item[metadata.compare] == compareObj.key) {
                      return item;
                  }
                })
              })
              .attr("fill", function(d) {
               if (compareObj.key === "Males" || compareObj.key === "Females" || compareObj.key === "Unknown" || compareObj.key === "Male" || compareObj.key === "Female") {
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
                  .attr("class", function(d) {
                      return "value-asterisk-groupedBar";
                  })
                  .attr("x", function(d) {
                      return (xScale(groupObj.key) + j * (xScale.rangeBand() / numCategories));
                  })
                  .attr("y", function(d) {
                      return yScale(mid);
                    // }
                  })
                  .attr("dx", function(d) {
                      if (numCategories === 1) {
                        return  ((xScale.rangeBand() / numCategories)/2) - 12;
                      }
                      if (numCategories === 2) {
                        return  (xScale.rangeBand() / numCategories)/3;
                      }
                      if (numCategories === 4) {
                        return  (xScale.rangeBand() / numCategories)/4;
                      }
                  })
                  .attr("dy", "0.5em")
                  .text(function(d) {
                    let currentValue = data.filter((item) => {
                      if (item[metadata.group] == groupObj.key && item[metadata.compare] == compareObj.key) {
                          return item;
                      }
                    })
                    // currentValue = currentValue[0];
                    // if(currentValue.secondarySuppressed || currentValue.suppressed){
                    //   return "--";
                    // } else {
                    //   return "";
                    // }
                  });

            // TOOLTIPS
            bar.on("mouseover", function(d) {
                tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
            });
            bar.on("mousemove", function(d) {
              let currentValue = data.filter((item) => {
                if (item[metadata.group] == groupObj.key && item[metadata.compare] == compareObj.key) {
                    return item;
                }
              })
              currentValue = currentValue[0];
              tooltip.html(getTooltipData(metadata, groupObj, compareObj, colors, currentValue))
                      .style("left", (d3.event.pageX + 5) + "px")
                      .style("top", (d3.event.pageY - 45) + "px");
            });
            bar.on("mouseout", function(d) {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
            });
            bar.on('click', function(d) {
                tooltip.transition().duration(500).style("opacity", 0);
            });
        });
    });
    assignLegend(dataNest, colors);
}

module.exports = {
    drawRaceChart,
}