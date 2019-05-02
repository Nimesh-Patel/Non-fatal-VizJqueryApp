let app = require('../../../app.global.js');
const dispositionLegendTemplate = require('../../Legends/dispositionLegend.hbs')
const formats = require('../../../../services/formats.js');
const toastr = require('toastr');

const buildDispLegend = () => {
    $('#dispositionLegend').html('');
    $('#dispositionLegend').html(dispositionLegendTemplate({ legends: app.globals.anc_legends }));
}

const getTooltipData = (metadata, groupData, colors) => {
    let palette = "#000"
    let groupStr = "<span style='color:" + palette + "'><strong>" +
        formats.formatDataName(metadata.group) + ": " + groupData.group +
        "</strong></span><br/>";
    //let countFormat = formats.formatCount(groupData.count, metadata.group);
    let countFormat;
    if (metadata.count == "injuries") {
        countFormat = $.number(groupData.count, 0)
    } else {
        countFormat = $.number(groupData.count, 1)
    }

    let countStr;
    if (groupData['crudeNumber'] < 21) {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat + "**";
    } else {
        countStr = formats.formatDataName(metadata.count) + ": " + countFormat;
    }
    return groupStr + countStr;
}

const assignLegend = (data) => {
    app.globals.anc_legends = [];
    let palettes = app.globals.palettes.disposition;
    for (var i = 0; i < data.length; i++) {
        let name = data[i].DISPlbl;
        var legendObj = {
            name: data[i].DISPlbl,
            color: palettes[data[i].DISP],
            palette: palettes[data[i].DISP]
        }
        app.globals.anc_legends.push(legendObj);
    }
    buildDispLegend();
};

const filterDataByDisposition = (dispGroup) => {
    let group;
    if (dispGroup == 'All Cases') {
        group = "All Cases";
    }
    else if (dispGroup == "Treated and Released") {
        group = "Treated and Released";
    }
    else if (dispGroup == "Transferred") {
        group = "Transferred";
    }
    else if (dispGroup == "Hospitalized") {
        group = "Hospitalized";
    }
    else if (dispGroup == "Observed/Left AMA/Unknown" || dispGroup == "Observed/Unknown") {
        group = "Observed/Left AMA/Unknown";
    }

    let checkbox = $('.selectedDisp-Id[data-disposition-name="' + group + '"]');

    if ($('#disp-0').is(':checked')) {
        $('#disp-0').trigger('click');
        checkbox.trigger('click');
        toastr.options = app.toastrOptions;
        toastr.success('You have applied a filter of Disposition ' + group + '.');
    }
    else if (!checkbox.is(':checked')) {
        $('#disp-0').trigger('click');
        toastr.options = app.toastrOptions;
        toastr.success('You have applied a filter of All Dispositions.');
    }
    $('#applyFilterDataFilters').trigger('click');
}

const buildBubbleChart = (data) => {

    let metadata = app.globals.charts.disposition.metadata;

    data.forEach(function (d) {
        d.group = d[metadata.group],
            d.compare = d[metadata.compare],
            d.count = +d[metadata.count]
    });


    var diameter = $('#chartContainer_disposition').width() / 1.5; //max size of the bubbles

    let colorPal = app.globals.palettes.disposition;
    let textColor = '#000';

    let countFormat;
    let sum = 0;
    let max = 0;
    let min = 120000000;
    let scale = 0;
    var margin = { top: 80, right: 80, bottom: 80, left: 80 },
        width = diameter - margin.left - margin.right,
        height = diameter - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, .3);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(8, "%");

    let colors = d3.scale.ordinal()
        .domain(function (d) {
            return d.group;
        })
        .range(metadata.colorset);
    // Define the div for the tooltip
    if ($('#tooltipDisp').length > 0) {
        $('#tooltipDisp').remove();
    }
    let tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltipDisp")
        .style("opacity", 0);

    //convert numerical values from strings to numbers
    if ($('#dispositionDropdown').val() == 'injuries') {
        data = data.map(function (d) { d.value = +d.injuries; return d; });
    }
    else if ($('#dispositionDropdown').val() == 'rate') {
        data = data.map(function (d) { d.value = +d.rate; return d; });
    } else {
        data = data.map(function (d) { d.value = +d.ageadj; return d; });
    }
    data = data.filter(function (obj) {
        return obj.value !== 0;
    });

    data.forEach(e => {
        sum = sum + e.value;

    });
    data.forEach(e => {
        scale = e.value / sum;
        // e.size= 3* parseFloat(scale).toFixed(2) + 'em';
        e.size = 3 * scale + 'em';

        //create placeholder because the bubble library uses e.value as its sizing factor
        e.valuePlaceholder = e.value;
        e.value = (e.value / sum) + .2;

    });

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(0.5);

    $("#dispositionChart").empty();
    var svg = d3.select("#dispositionChart")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    //bubbles needs very specific format, convert data to this.
    var nodes = bubble.nodes({ children: data })
        .filter(function (d) { return !d.children; });

    data.forEach(e => {
        e.value = e.valuePlaceholder;

    });

    //setup the chart
    var bubbles = svg.append("g")
        .attr("transform", "translate(0,0)")
        .selectAll(".bubble")
        .data(nodes)
        .enter();


    data.forEach(d => {
        var side = 2 * d.r * Math.cos(Math.PI / 4);
        d.textBox = d.r - side / 2;
    })

    //create the bubbles
    bubbles.append("circle")
        .attr("r", function (d) { return d.r; })
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .on("click", function (d) {
            filterDataByDisposition(d.DISPlbl);
        })
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
        })
        .on("mousemove", function (d) {
            tooltip.html(getTooltipData(metadata, d, colors))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 45) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .style("fill", function (d) {

            return (colorPal[d.DISP])
        });

    bubbles.append("text")
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y + 5; })
        .attr("text-anchor", "middle")
        .text(function (d) {
            if (metadata.count == "injuries") {
                countFormat = $.number(d.value, 0)
            } else {
                countFormat = $.number(d.value, 1)
            }
            return countFormat;
        })
        .style({
            "fill": (function (d) {
                textColor = '#000'
                if (colorPal[d.dispId] == '#674172') {
                    textColor = '#000'
                }
                return textColor
            }),
            "font-family": "Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": (function (d) {
                // if (d.r / 50 <= 0.5) {
                //     return '0.25em';
                // }
                // else if (d.r / 50 <= 0.75) {
                //     return '0.45em';
                // }
                // else if (d.r / 50 >= 4) {
                //     return '2em';
                // }
                // else {
                return d.r / 70 + 'em';
                // }
            }),
            "word-wrap": "break-word"
        })
        .on("click", function (d) {
            filterDataByDisposition(d.DISPlbl);
        })
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
        })
        .on("mousemove", function (d) {
            tooltip.html(getTooltipData(metadata, d, colors))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 45) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    bubbles.append("text")
        .attr('class', 'testing')
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y - d.r / 5; })
        .attr("text-anchor", "middle")
        .text(function (d) { return d.DISPlbl; })
        .style({
            "fill": (function (d) {
                textColor = '#000'
                if (colorPal[d.dispId] == '#674172') {
                    textColor = '#000'
                }
                return textColor
            }),
            "font-family": "Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": (function (d) {
                // if (d.r / 50 <= 0.5) {
                //     return '0.25em';
                // }
                // else if (d.r / 50 <= 0.75) {
                //     return '0.45em';
                // }
                // else if (d.r / 50 >= 4) {
                //     return '2em';
                // }
                // else {
                //     return d.r / 100 + 'em';
                // }
                return d.r / 88 + 'em';
            }),
            "word-wrap": "break-word"
        })
        .on("click", function (d) {
            filterDataByDisposition(d.DISPlbl);
        })
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
        })
        .on("mousemove", function (d) {
            tooltip.html(getTooltipData(metadata, d, colors))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 45) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    function getLegendColor(name) {
        return colors(name);
    }
    assignLegend(data);
}

module.exports = {
    buildBubbleChart
};