/*============================================
=               Trend chart                  =
============================================*/
// IMPORTS
let app = require('../../../app.global.js');
const formats = require('../../../../services/formats.js');
const raceLegendTemplate = require('../../Legends/raceBarLegend.hbs');

const getTooltipData = function(metadata, groupData, colors, cn) {
    var groupStr = "<span style='color:" + colors(groupData.group) + "'><strong>" +
        formats.formatDataName(metadata.group) + ": " + groupData.group +
        "</strong></span><br/>";
    var yearStr = "Year: " + groupData.year + "<br/>";
    var countFormat = formats.formatCount(groupData.count, metadata.group);
    
            if (groupData.count < 21) {
                var countStr = formats.formatDataName(metadata.count) + ": " + countFormat + "**" + "<br/>";;
            }
            else{
                var countStr = formats.formatDataName(metadata.count) + ": " + countFormat + "<br/>";
            }         
    
    return groupStr + yearStr + countStr;
}

const buildTrendsLegends = () => {
    $('#raceGroupTrendsLegend').html('')
    $('#raceGroupTrendsLegend').html(raceLegendTemplate({legends: app.globals.anc_ethn_trends_legends}));
}

const assignTrendsLegend = (data, metadata, getLegendColor) => {
    let palettes = app.globals.palettes.trends;
    let names = [];
    app.globals.anc_ethn_trends_legends = [];
    data.forEach( function(item) {
        names.push(item.key);
    });
    names.forEach( function(name, i) {
        var legendObj = {
            name: name,
            color: getLegendColor(name)
        }
        app.globals.anc_ethn_trends_legends.push(legendObj);
    });
    buildTrendsLegends();
};

const buildRaceTrends = (data, metadata) => {
    $(metadata.id).empty();
    $(metadata.id).css('width', '95%').css('height', $(metadata.id).width() * .618).css('margin', '0 auto');
   // data = services.buildSuppressionObjects(data, metadata);
    let rawData = data
    // Data setup
    
    data.forEach(function(d){
        d.compare = d[metadata.compare],
        d.group = d[metadata.group],
        d.date = formats.parseYear(d.year.toString()),//d.year,
        d.count = +d[metadata.count],
        d.year = parseInt(d.year),
        d.crudeNumber = d['injuries']
    });
    // CONSTANTS
    var margin = {
            top: 5,
            right: 80,
            bottom: 60,
            left: 90
        },
        width = $(metadata.id).width() - margin.left - margin.right,
        height = $(metadata.id).height() - margin.top - margin.bottom;

    // SCALES
    let xScale = d3.time.scale()
        .range([0, width]);

    let yScale = d3.scale.linear()
        .range([height, 0]);

    let colors = d3.scale.ordinal()
        .domain(function(d) {
            return d.group;
        })
        .range(metadata.colorset);

    // AXIS SETUP
    let xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    let yAxis = d3.svg.axis()
        .scale(yScale)
        .tickSize(-width)
        .orient("left");
        
    // LINE SETUP
    let line = d3.svg.line()
        .interpolate("monotone")
        .defined(function(d) {
            let currentValue = data.filter((item) => {
                if (item[metadata.group] == d.group && item.year == d.year) {
                    return item;
                }
            })
            currentValue = currentValue[0];
          
                return d;
           
        })
        .x(function(d) {
                return xScale(d.date);
        })
        .y(function(d) {
                return yScale(d.count);
        });

    // TOOLTIP SETUP
     if ($('#tooltip3').length > 0 ){
        $('#tooltip3').remove();
      }
      let tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .attr("id", "tooltip3")
          .style("opacity", 0);

    // SVG element
    let svg = d3.select(metadata.id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /**
     * GROUP DATA FOR LINES & AXIS DOMAINS
     **/
    // we need to nest the data on group since we want to
    // only draw one line per group
    // NESTED DATA
    let nestByYear = d3.nest()
        .key(function(d) {
            return d.group;
        }) // group by
        .key(function(d) {
            return d.year;
        })// then year
        .rollup(function(v) {
            return d3.sum(v, function(d) {
                return d.count;
            });
        }) // sum deaths within each group > year leaf
        .entries(data);

    let crudeNumberRollup = d3.nest()
        .key(function(d) {
            return d.group;
        }) // group by
        .key(function(d) {
            return d.year;
        })// then year
        .rollup(function(v) {
            return d3.sum(v, function(d) {
                return d.crudeNumber;
            });
        }) // sum deaths within each group > year leaf
        .entries(data);


    /**
     * return Male/Female data breakdown for tooltip
     * @param  {String} g group to filter
     * @param  {String} y year to filter
     * @return {Array} compareObj  array of two objects, each which reports the metric by male or female
     */
    let getCompareNestData = (g, y) => {
        let groupFilter = data.filter(function(d){
            return d.group === g;
        });
        let yearFilter = groupFilter.filter(function(g){
            return g.year === parseInt(y);
        });
        let compareObj = yearFilter.map(function(c){
            return {
                key: c.compare,
                count: c.count
            }
        });
        return compareObj;
    }

    // reformat data so it is only two levels deep for making chart
    let dataNested = nestByYear.map(function(g) {
        return {
            key: g.key,
            values: g.values.map(function(y) {
                return {
                    group: g.key,
                    date: formats.parseYear(y.key.toString()),
                    //date: String(y.key),
                    count: y.values,
                    year: y.key,//parseInt(y.key),
                    compare: getCompareNestData(g.key, y.key)
                }
            })
        }
    });

    // DOMAIN FOR AXIS
    let xMin = d3.min(dataNested, function(d) {
            return d3.min(d.values, function(d) {
                return d.date;
            });
        }),
        xMax = d3.max(dataNested, function(d) {
            return d3.max(d.values, function(d) {
                return d.date;
            });
        }),
        yMax = d3.max(dataNested, function(d) {
            return d3.max(d.values, function(d) {
                return d.count;
            });
        });
        
    xScale.domain([ xMin, xMax]);
    yScale.domain([ 0, yMax * 1.1 ]);
    // ADD AXIS
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
        let Ytitle;
        // Y AXIS Title Labels
         if (metadata.id == "#ethnTrend") {
            if (d3.select("#raceDropdown").property("value") == "injuries"){
                Ytitle = "Number of Injuries";
            } else { 
                Ytitle = "Injury Rate per 100,000";
            }
         } else {
             if (d3.select("#ethnDropdown").property("value") == "injuries"){
                Ytitle = "Number of Injuries";
             } else { 
                Ytitle = "Injury Rate per 100,000";
            }
         };

        // X and Y Axis Titles labels
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "translate("+ (width/2) +","+(height+50)+")")
            .text("Years");
        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (0-76) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text(Ytitle);

            dataNested.forEach((groupObj) => {
                // ADD GROUPS FOR LINES
            let sets = svg.append("g")
            .attr("class", "set-line");
            // ADD LINE
            sets.append("path")
                .attr("class", "line")
                .style("fill", "none")
                .attr("d", function(d) {
                    return line(groupObj.values);
                })
                .style("stroke", function(d) {
                    return colors(groupObj.key);
                });

            groupObj.values.forEach((compareObj) => {
                // ADD DOTS
                svg.append("g")
                .attr("class", "set-dot")
                .append("circle")
                .attr("tabindex",0)
                .attr("aria-label", function() {
                    if ($('#raceDropdown').val() == 'injuries'){
                        return compareObj.year+' '+compareObj.group+' '+ $('#raceDropdown').val()+' '+ $.number(compareObj.count, 0);
                    } else {
                        return compareObj.year+' '+compareObj.group+' '+ $('#raceDropdown').val()+' '+ $.number(compareObj.count, 1);
                    }
                })
                .attr("r", function(d){
                        return 5;
                })
                .attr("cx", function(d, i) {
                    let currentValue = data.filter((item) => {
                        if (item[metadata.group] == groupObj.key && item.year == compareObj.year) {
                            return item;
                        }
                    })
                    currentValue = currentValue[0];
                  
                        return xScale(compareObj.date);
                    
                })
                .attr("cy", function(d, i) {
                    let currentValue = data.filter((item) => {
                        if (item[metadata.group] == groupObj.key && item.year == compareObj.year) {
                            return item;
                        }
                    })
                    currentValue = currentValue[0];
                    
                        return yScale(compareObj.count);
                    
                })
                .style("fill", function(d) {
                    let currentValue = data.filter((item) => {
                        if (item[metadata.group] == groupObj.key && item.year == compareObj.year) {
                            return item;
                        }
                    })
                    currentValue = currentValue[0];
                   
                        return colors(compareObj.group);
                    
                })
                .style("display", function(d) {
                    let currentValue = data.filter((item) => {
                        if (item[metadata.group] == groupObj.key && item.year == compareObj.year) {
                            return item;
                        }
                    })
                    currentValue = currentValue[0];
                    
                })
                    // Tooltip for circles
                .on("mouseover", function(d) {
                    tooltip.transition() // declare the transition properties to bring fade-in div
                        .duration(200) // it shall take 200ms
                        .style("opacity", .9); // and go all the way to an opacity of .9
                })
                .on("mousemove", function(d) {
                    tooltip.html(getTooltipData(metadata, compareObj, colors, crudeNumberRollup))
                        .style("left", (d3.event.pageX + 5) + "px") // move it in the x direction
                        .style("top", (d3.event.pageY - 55) + "px"); // move it in the y direction
                })
                .on("mouseout", function() {
                    tooltip.transition() // declare the transition properties to fade-out the div
                        .duration(500) // it shall take 500ms
                        .style("opacity", 0);
                });
            })
        })

       function getLegendColor(name) {
         return colors(name);
       }
       assignTrendsLegend(dataNested, metadata, getLegendColor);
}

module.exports = {
    buildRaceTrends,
}