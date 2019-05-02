let app = require("../../../app.global.js");
const toastr = require("toastr");
const genderLegendTemplate = require("../../Legends/genderBarLegend.hbs");
const formats = require("../../../../services/formats.js");

const filterDataBySex = group => {
  let sex;
  if (group == "Males" || group == "Male") {
    sex = "Males";
  } else if (group == "Females" || group == "Female") {
    sex = "Females";
  } else if (group == "Unknown") {
    sex = "Unknown";
  }
  let checkbox = $('.selectedSex-Id[data-sex-name="' + sex + '"]');
  if ($("#sex-0").is(":checked")) {
    $("#sex-0").trigger("click");
    checkbox.trigger("click");
    toastr.options = app.toastrOptions;
    toastr.success("You have applied a filter of Gender " + sex + ".");
  } else if (!checkbox.is(":checked")) {
    $("#sex-0").trigger("click");
    toastr.options = app.toastrOptions;
    toastr.success("You have applied a filter of All Genders.");
  }
  //   else if (checkbox.is(':checked')) {
  //     $('#sex-0').trigger('click');
  //     toastr.options =  app.toastrOptions;
  //     toastr.success('You have applied a filter of Male &amp; Female.');
  //   }
  $("#applyFilterDataFilters").trigger("click");
};

const buildGenderLegend = () => {
  $("#genderBarLegend").html("");
  $("#genderBarLegend").html(
    genderLegendTemplate({ legends: app.globals.anc_legends })
  );
};

const assignLegend = data => {
  app.globals.anc_legends = [];
  let names = [];
  let palettes = app.globals.palettes.gender;

  // data.forEach(function (item) {
  //   names.push(item.key);
  // });
  names = ["Females", "Males", "Unknown"];
  names.forEach(function (name, i) {
    var legendObj = {
      name: name,
      color: palettes[i],
      palette: palettes[i]
    };
    app.globals.anc_legends.push(legendObj);
  });
  buildGenderLegend();
};

const getTooltipData = (metadata, groupData, colors) => {
  let color;
  if (groupData.group == "Males") {
    color = app.globals.palettes.gender[1];
  } else if (groupData.group == "Females") {
    color = app.globals.palettes.gender[0];
  } else {
    color = app.globals.palettes.gender[2];
  }
  let groupStr =
    "<span style='color:" +
    color +
    "'><strong>" +
    formats.formatDataName(metadata.group) +
    ": " +
    groupData.group +
    "</strong></span><br/>";
  //let countFormat = formats.formatCount(groupData.count, metadata.group);
  let countFormat;
  if (metadata.count == "injuries") {
    countFormat = $.number(groupData.count, 0);
  } else {
    countFormat = $.number(groupData.count, 1);
  }

  let countStr;
  if (groupData["crudeNumber"] < 21) {
    countStr =
      formats.formatDataName(metadata.count) + ": " + countFormat + "**";
  } else {
    countStr = formats.formatDataName(metadata.count) + ": " + countFormat;
  }

  return groupStr + countStr;
};

const drawGenderChart = (data, metadata) => {
  // Make sure chart space is empty
  $("#genderBar").empty();
  $("#genderBar")
    .css("width", "98%")
    .css("height", $("#genderBar").width() * 0.618)
    .css("margin", "0 auto");
  // Data setup
  data.forEach(function (d) {
    (d.group = d[metadata.group]),
      (d.compare = d[metadata.compare]),
      (d.count = +d[metadata.count]);
  });
  let dropdown = $('#genderDropdown :selected').val();
  let count;

  // Sort the data so bar chart is sorted in decreasing order
  data = data.sort(function (a, b) { return a.count - b.count; });

  // SIZING CONSTANTS
  let margin = 70;
  let width = $("#genderBar").width();
  let height = $("#genderBar").height() - 10;
  let barHeight = ((height - margin) * 0.5) / data.length;

  // SCALES
  let yScale = d3.scale
    .ordinal()
    .rangeRoundBands([height - margin, 0], 0.1)
    .domain(
      data.map(function (d) {
        return d.group;
      })
    );

  let xScale = d3.scale
    .linear()
    .range([0, width - margin * 2])
    .domain([
      0,
      d3.max(data, function (d) {
        return d.count;
      }) * 1.1
    ]);

  let xMax = d3.max(data, function (d) {
    return d.count;
  });

  let mid = xMax / 2;
  let colors = d3.scale
    .ordinal()
    .domain(function (d) {
      return d.group;
    })
    .range(metadata.colorset);

  // AXIS
  let yAxis = d3.svg
    .axis()
    .scale(yScale)
    .orient("left");

  let xAxis = d3.svg
    .axis()
    .scale(xScale)
    .tickSize(-height + margin)
    .orient("botton");
  // Define the div for the tooltip
  if ($("#tooltip1").length > 0) {
    $("#tooltip1").remove();
  }
  let tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip1")
    .style("opacity", 0);

  // SVG CANVAS
  let svg1 = d3
    .select("#genderBar")
    .attr("width", width)
    .attr("height", height);

  // ADD Y AXIS TO CHART
  svg1
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin + ",0)")
    .call(yAxis);

  // ADD X AXIS TO CHART
  svg1
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
    .call(xAxis);

  let Xtitle = ""; //test x-axis
  // X and Y Axis Titles labels
  svg1
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + width / 2 + "," + (height - 20) + ")")
    .text(Xtitle);

  // ADD BARS
  let chart = svg1
    .append("g")
    .attr("transform", "translate(0,0)")
    .attr("class", "bars-group");

  let bar = chart
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("tabindex", 0)
    // .attr("aria-label", function(d) {
    //     if ($('#genderDropdown').val() == 'crudeNumber') {
    //         return d.sex +' '+$('#genderDropdown').val()+' '+ $.number(d.count, 0);
    //     } else{
    //         return d.sex +' '+$('#genderDropdown').val()+' '+ $.number(d.count, 1);
    //     }
    // })

    .attr("width", function (d) {
      return xScale(d.count);
    })
    .attr("y", function (d) {
      return yScale(d.group);
    })
    .attr("height", barHeight)
    .attr("transform", function (d) {
      return "translate(" + margin + "," + (barHeight / 2 - 20) + ")";
    })
    .attr("fill", function (d) {
      if (d.group == "Males") {
        return app.globals.palettes.gender[1];
      } else if (d.group == "Females") {
        return app.globals.palettes.gender[0];
      } else {
        return app.globals.palettes.gender[2];
      }
    })
    .style("display", function (d) {
      let currentValue = data.filter(item => {
        if (item[metadata.group] == d.group) {
          return item;
        }
      });
      // currentValue = currentValue[0];
      // if(currentValue.secondarySuppressed || currentValue.suppressed){
      //     return "none";
      // }
    });

  // ADD LABELS
  chart
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    // .attr("class", function(d){
    //     let currentValue = data.filter((item) => {
    //         if (item[metadata.group] == d.group) {
    //             return item;
    //         }
    //     })
    //     currentValue = currentValue[0];
    //     if(currentValue.secondarySuppressed || currentValue.suppressed){
    //         return "value-asterisk"
    //     } else {
    //         return "value";
    //     }
    // })
    .attr("y", barHeight / 2 - 20)
    .attr("dy", ".35em") //vertical align middle
    .attr('class', 'gender-bar-text-fill')
    .text(function (d) {
      // let currentValue = data.filter((item) => {
      //     if (item[metadata.group] == d.group) {
      //         return item;
      //     }
      // })
      // currentValue = currentValue[0];
      // if(currentValue.secondarySuppressed || currentValue.suppressed){
      //     return "--";
      // } else {
      //     let countFormat = formats.formatCount(d.count, metadata.group);
      //     return countFormat;
      // }
      if (d.group != "Unknown") {
        if (dropdown == "injuries") {
          count = $.number(d.count, 0)
        } else {
          count = $.number(d.count, 1);
        }
        return count;
      } else {
        return "";
      }
    })
    .attr("transform", function (d) {
      let currentValue = data.filter(item => {
        if (item[metadata.group] == d.group) {
          return item;
        }
      });
      // currentValue = currentValue[0];
      // if(currentValue.secondarySuppressed || currentValue.suppressed){
      //     return "translate(" + xScale(mid) + "," + (yScale(d.group) + barHeight / 2 + 3) + ")";
      // } else {
      //     return "translate(" + xScale(d.count) + "," + (yScale(d.group) + barHeight / 2 + 3) + ")";
      // }
      return (
        "translate(" +
        xScale(d.count) +
        "," +
        (yScale(d.group) + barHeight / 2 + 3) +
        ")"
      );
    });

  // Adds yAxis title
  chart
    .append("text")
    .text("Number of Deaths/ Death Rate per 100,000")
    .attr("transform", "translate(-70, -20)");

  // ADD TOOLTIPS
  bar.on("mouseover", function (d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0.9);
  });
  bar.on("mousemove", function (d) {
    tooltip
      .html(getTooltipData(metadata, d, colors))
      .style("left", d3.event.pageX + 5 + "px")
      .style("top", d3.event.pageY - 45 + "px");
  });
  bar.on("mouseout", function (d) {
    tooltip
      .transition()
      .duration(500)
      .style("opacity", 0);
  });

  //   // COLOR SCALES
  let colorScale = d3.scale
    .ordinal()
    .domain(function (d) {
      return d.compare;
    })
    .range(metadata.colorset);
  // NEST DATA by state for comparing
  let dataNest = d3
    .nest()
    // group by state
    .key(function (d) {
      return d[metadata.group];
    })
    .entries(data);

  bar.on("click", function (d) {
    let group = d.group;
    let chartType = metadata.group;
    filterDataBySex(group);
  });

  assignLegend(dataNest);
};
module.exports = {
  drawGenderChart
};
