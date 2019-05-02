'use strict';

let app = require('../app/app.global.js');
let isSVG = false;

const getDownloadDataChartMetadata = (chart, currentView) => {
    let data = {};

    if (currentView == 'SelectedYears') {
        // *** SELECTED YEARS DATA *** //
        if (chart == 'treemap') {
            if ($("#treemapDropdown").val() == 'intent') {
                data.keys = ['Intentlbl', 'injuries', 'rate', 'ageadj', 'cv', 'lower', 'upper']
                data.headers = ['Intent', 'Number of Injuries', 'Crude Rate', 'Age Adjusted Rate', 'CV', 'Lower Limit', 'Upper Limit']

            } else {
                data.keys = ['Mechlbl', 'injuries', 'rate', 'ageadj', 'cv', 'lower', 'upper']
                data.headers = ['Mechanism', 'Number of Injuries', 'Crude Rate', 'Age Adjusted Rate', 'CV', 'Lower Limit', 'Upper Limit']
            }
        }

        if (chart == 'disposition') {
            data.keys = ['DISPlbl', 'injuries', 'rate', 'ageadj', 'cv', 'lower', 'upper']
            data.headers = ['Disposition', 'Number of Injuries', 'Crude Rate', 'Age Adjusted Rate', 'CV', 'Lower Limit', 'Upper Limit']
        }

        if (chart == 'genderBar') {
            data.keys = ['Sexlbl', 'injuries', 'rate', 'ageadj', 'cv', 'lower', 'upper']
            data.headers = ['Sex', 'Number of Injuries', 'Crude Rate', 'Age-Adjusted Rate', 'CV', 'Lower Limit', 'Upper Limit']
        }

        if (chart == 'ageBar') {
            if ($('#chkAgeSex').is(':checked')) {
                data.keys = ['agegp', 'Sexlbl', 'injuries', 'rate', 'cv', 'lower', 'upper']
                data.headers = ['Age Group', 'Sex', 'Number of Injuries', 'Crude Rate', 'CV', 'Lower Limit', 'Upper Limit']
            } else {
                data.keys = ['agegp', 'injuries', 'rate', 'cv', 'lower', 'upper']
                data.headers = ['Age Group', 'Number of Injuries', 'Crude Rate', 'CV', 'Lower Limit', 'Upper Limit']
            }
        }

        if (chart == 'ethnBar') {
            if ($('#chkRaceSex').is(':checked')) {
                data.keys = ['Racelbl', 'Sexlbl', 'injuries', 'cv', 'lower', 'upper']
                data.headers = ['Race / Ethnicity', 'Sex', 'Number of Injuries', 'CV', 'Lower Limit', 'Upper Limit']
            } else {
                data.keys = ['Racelbl', 'injuries', 'cv', 'lower', 'upper']
                data.headers = ['Race / Ethnicity', 'Number of Injuries', 'CV', 'Lower Limit', 'Upper Limit']
            }
        }
    }
    else {
        // *** TRENDS DATA *** //
        if (chart == 'treemap') {
            if ($("#treemapDropdown").val() == 'intent') {
                data.keys = ['Intentlbl', 'injuries', 'rate', 'ageadj', 'cv', 'lower', 'upper']
                data.headers = ['Intent', 'Number of Injuries', 'Crude Rate', 'Age Adjusted Rate', 'CV', 'Lower Limit', 'Upper Limit']

            } else {
                data.keys = ['Mechlbl', 'injuries', 'rate', 'ageadj', 'cv', 'lower', 'upper']
                data.headers = ['Mechanism', 'Number of Injuries', 'Crude Rate', 'Age Adjusted Rate', 'CV', 'Lower Limit', 'Upper Limit']
            }
        }

        if (chart == 'disposition') {
            data.keys = ['DISPlbl', 'injuries', 'rate', 'ageadj', 'cv', 'lower', 'upper']
            data.headers = ['Disposition', 'Number of Injuries', 'Crude Rate', 'Age Adjusted Rate', 'CV', 'Lower Limit', 'Upper Limit']
        }

        if (chart == 'genderTrend') {
            data.keys = ['Sexlbl', 'year', 'injuries', 'rate', 'ageadj', 'cv', 'lower', 'upper']
            data.headers = ['Sex', 'Year', 'Number of Injuries', 'Crude Rate', 'Age-Adjusted Rate', 'CV', 'Lower Limit', 'Upper Limit']
        }

        if (chart == 'ageTrend') {
            data.keys = ['agegp', 'year', 'injuries', 'rate', 'cv', 'lower', 'upper']
            data.headers = ['Age Group', 'Year', 'Number of Injuries', 'Crude Rate', 'CV', 'Lower Limit', 'Upper Limit']
        }

        if (chart == 'ethnTrend') {
            data.keys = ['Racelbl', 'year', 'injuries', 'cv', 'lower', 'upper']
            data.headers = ['Race / Ethnicity', 'Year', 'Number of Injuries', 'CV', 'Lower Limit', 'Upper Limit']
        }
    }

    if (app.globals.filters.groupby1 == 'NONE1') {
        data.keys = _.remove(data.keys, (key) => { if (key != 'ageadj') { return key; } });
        data.headers = _.remove(data.headers, (header) => { if (header != 'Age Adjusted Rate') { return header; } });
    }
    return data;
}

const getAssetInfo = (asset, chart, view) => { 
    let chartInfo = {};
    if (view == 'SelectedYears') {
        if (chart == 'treemap') {
            chartInfo.chartObj = app.globals.charts.treemap;
            chartInfo.file = 'WISQARS_NonFatalCauseOfInjury_treemap';
        }
        if (chart == 'disposition') {
            chartInfo.chartObj = app.globals.charts.disposition;
            chartInfo.file = 'WISQARS_NonFatalDisposition';
        }
        if (chart == 'genderBar') {
            chartInfo.chartObj = app.globals.charts.bars.genderBar;
            chartInfo.file = 'WISQARS_nonFatalDistBySex_bar';
        }
        if (chart == 'ageBar') {
            chartInfo.chartObj = app.globals.charts.bars.ageBar;
            chartInfo.file = 'WISQARS_NonFatalDistByAge_bar';
        }
        if (chart == 'ethnBar') {
            chartInfo.chartObj = app.globals.charts.bars.ethnBar;
            chartInfo.file = 'WISQARS_NonFatalDistByEthn_bar';
        }
    }
    else {
        if (chart == 'treemap') {
            chartInfo.chartObj = app.globals.charts.treemap;
            chartInfo.file = 'WISQARS_injuryCauseOfDeath_treemap';
        }
        if (chart == 'disposition') {
            chartInfo.chartObj = app.globals.charts.disposition;
            chartInfo.file = 'WISQARS_areasHighConcentration_USmap';
        }
        if (chart == 'genderTrend') {
            chartInfo.chartObj = app.globals.charts.trends.genderTrend;
            chartInfo.file = 'WISQARS_distBySex_trend';
        }
        if (chart == 'ageTrend') {
            chartInfo.chartObj = app.globals.charts.trends.ageTrend;
            chartInfo.file = 'WISQARS_distByAge_trend';
        }
        if (chart == 'ethnTrend') {
            chartInfo.chartObj = app.globals.charts.trends.ethnTrend;
            chartInfo.file = 'WISQARS_distByEthn_trend';
        }
    }
    return chartInfo;
}

const downloadAsset = (asset, chart, view) => {
    let chartInfo = getAssetInfo(asset, chart, view);

    if (asset == 'CSV') {
        downloadData(chartInfo, chart);
    }
    if (asset == 'JPG') {
        downloadJpg(chartInfo, chart);
    }
    if (asset == 'SVG') {
        downloadSvg(chartInfo, chart);
    }
}

/*====================================
=            download.js             =
= Download D3 charts as SVG, JPG     =
= and chart data as CSV              =
= Uses canvas-toBlob and file-saver  =
====================================*/
let FileSaver = require('file-saver');
if (!FileSaver.saveAs) {
    FileSaver.saveAs = FileSaver.default;
}
$.fn.ignore = (sel) => {
    return this.clone().find(sel || ">*").remove().end();
};

const getBlob = () => {
    return window.Blob || window.WebKitBlob || window.MozBlob;
};

const downloadJPGLegend = (html, element) => {
    let isIE = $.browser.msie;
    let legend;
    if (isIE) {
        legend = d3.select(element)
            .node()
            .parentNode
            .innerHTML;

    } else {
        legend = d3.select(element)
            .node()
            .outerHTML;
    }
    return html += legend;
    // Convert SVG string to data URL
    // let imgsrc = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(html)));
    // let canvas = document.getElementById("canvas");
    // let context = canvas.getContext("2d");
    // let writeCurrentFilters = function(context, width, height) {
    //                 let heightSpace = 0;
    //                 let widthSpace = (width/4);
    //                 let colWidth = 30;
    //                 context.lineWidth=1;
    //                 context.fillStyle="#000";
    //                 context.lineStyle="#000";
    //                 context.font="12px sans-serif";
    //                 for(let i=0;i<filters.length;i++) {
    //                   if (i%17===0 && i!==0) {
    //                     colWidth+=widthSpace;
    //                     heightSpace = 15;
    //                     context.fillText(filters[i], colWidth, (height+heightSpace));
    //                   } else {
    //                     heightSpace+=15;
    //                     context.fillText(filters[i], colWidth, (height+heightSpace));
    //                   }
    //                 }
    //                 return context;
    //               };

    // canvas.width = width;
    // canvas.height = totalHeight;
    // let image = new Image();
    // image.onload = function() {
    //     context.clearRect(0, 0, width, totalHeight);
    //     context.fillStyle="#fff";
    //     context.fillRect(0,0,width,totalHeight);
    //     context.drawImage(image, 0, 0, width, height);
    //     function download(data, filename) {
    //       let a = document.createElement('a');
    //       a.download = filename;
    //       a.href = data
    //       document.body.appendChild(a);
    //       a.click();
    //       a.remove();
    //     }
    //     if (!isIE) {
    //       canvas.toBlob( function(blob) {
    //           FileSaver.saveAs(blob, filename + "_" + filenameDateFormat(new Date()) + ".jpg")
    //       });
    //     }
    // }
    // image.onerror = function () {
    //    console.error("Cannot load image", image.src);
    // }
    // image.src = imgsrc;
    // d3.select("#canvas").remove();
}

const getLegend = (source, view) => {
    let legendArray = [];
    let legend;

    legend = $(source).children();
    $.each(legend, (i) => {
        let color;
        if (source == '#statemapLegend') {
            color = $($($(legend[i]).children()[0])[0]).css('background');
        } else {
            color = $($($(legend[i]).children()[0])[0]).css('background-color');
        }
        let text = $($($(legend[i]).children()[1])[0]).text();
        legendArray.push({ color: color, text: text });
    })



    return legendArray;
}

const getCurrentFilters = () => {
    let filters = [];
    let subNav = $('.active-tab-nav-button').data('sub-tab-id');
    // if (subNav) {
    // } else if (app.globals.currentComparisonView == 'Injuries') {
    //     let str = 'Comparison Injuries -';
    //     app.globals.anc_Injuries.forEach((cod, index) => {
    //         if (index == (app.globals.anc_Injuries.length - 1)) {
    //             str += ` ${cod.intentName} ${cod.mechName}`;
    //         } else {
    //             str += ` ${cod.intentName} ${cod.mechName},`;
    //         }
    //     })
    //     filters.push(str);
    // } else {
    //     let str = 'Comparison States -';
    //     app.globals.anc_states.forEach((state) => {
    //         str += ` ${state['state-name']}`;
    //     })
    //     filters.push(str);
    // }


    //filters.push(`Start Year:  ${app.globals.filters.start_year}, End Year: ${app.globals.filters.end_year}`);


    
    for (let i = 0; i < $('.breadcrumb-item').length; i++) {
        let breadcrumbItem = $('.breadcrumb-item')[i];
        let filterText = $(breadcrumbItem).text().trim();
        let newFilterText = filterText.slice(0, -1);
        filters.push(newFilterText);
    }

    for (let i = 0; i < $('.breadcrumb-item-no-shadow').length; i++) {
        let breadcrumbItem = $('.breadcrumb-item-no-shadow')[i];
        let filterText = $(breadcrumbItem).text().trim();
        filters.push(filterText);
    }

    return filters;
};

const getFilterTextBasedOnSelectedTabOnAnC = (breadcrumbItem, filterText) => {
    let AnCType = $('#codVizContainer > nav').attr('data-tab');
    let activeTab = $('.anc-tab.active-tab').text();
    if (AnCType && activeTab && activeTab != 'Comparison') {
        let activeTabId = $.trim($('.anc-tab.active-tab').attr('data-tab-id'));
        AnCType = AnCType.split("_").pop();
        if ($(breadcrumbItem).has("button[data-" + AnCType + "-filter-tab]").size() > 0) {
            let _TabId = $.trim($(breadcrumbItem).children("button").attr("data-" + AnCType + "-filter-tab"));
            if (_TabId == activeTabId) {
                return filterText;
            } else {
                return "";
            }
        } else {
            return filterText;
        }
    } else {
        return filterText;
    }
};

// Format helper for filename
let filenameDateFormat = d3.time.format("%Y%m%d-%H%M%S");

// Downloads chart as SVG
const downloadSvg = (chartInfo, chartType) => {
    let source;
    if ( chartType === 'treemap') {
        source = '#d3plus';
    } else {
        source = chartInfo.chartObj.metadata.id;
    }
    let filename = chartInfo.file;
    let BB = getBlob();
    if ( source.indexOf('Bar') !== -1) {
        styleBarChart(source);
    }
    if ( source.indexOf('Trend') !== -1) {
        styleTrendChart(source);
    }
    let legend;
    let legendHeight;
    let filters;
    let view = $('.active-tab-nav-button').data('tab-id') == 'Comparison' ? 'Comparison' : 'individual';
    let legendSource = getLegendSource(source);
    let width = d3.select(source)[0][0].clientWidth;
    let height = d3.select(source)[0][0].clientHeight;
    let origHeight = height;
    let totalHeight = height;
    let writeLegends = function(legend,source,width,height) {
        let heightSpace = 0;
        let widthSpace = (width/3);
        let colWidth = 80;
        legend.forEach((item, index) => {
            if (index%8===0 && index!==0) {
                colWidth+=widthSpace;
                heightSpace = 15;
            } else {
                heightSpace+=15;
            }
            if (item.color.indexOf('url') < 0) {
                $(source).append(`<rect class="legends legend-box-${index}"></rect>`)
                $(`.legends.legend-box-${index}`)
                .attr("x", colWidth)
                .attr("y", (height + heightSpace))
                .attr("width", "12")
                .attr("height", "12")
                .attr("stroke", "#000")
                .attr("stroke-width", ".5px")
                .attr("fill", item.color)
            } else {
                $(source).append(`<rect class="legends legend-box-${index}"></rect>`)
                $(`.legends.legend-box-${index}`)
                .attr("x", colWidth)
                .attr("y", (height + heightSpace))
                .attr("width", "12")
                .attr("height", "12")
                .attr("stroke", "#000")
                .attr("stroke-width", ".5px")
                .attr("fill", "#fff")
            }
            $(source).append(`<text class="legends legend-text-${index}">${item.text}</text>`)
            $(`.legends.legend-text-${index}`)
            .attr("x", colWidth+20)
            .attr("y", (height + heightSpace+10))
            .css("color", item.color)
            .css("font-family", "sans-serif")
            .css("font-size", "12px")
        });
    };
    let writeCurrentSvgFilters = function(width, height) {
        let heightSpace = 0;
        let widthSpace = (width/4);
        let colWidth = 30;
        let growHeight = 15;
        filters = getCurrentFilters();
        for(let i=0;i<filters.length;i++) {
            if (i%17===0 && i!==0) {
            colWidth+=widthSpace;
            heightSpace = 15;
            d3.select(source).append('text').text(filters[i])
                                            .attr("class", "filters")
                                            .attr("x", colWidth)
                                            .attr("y", (height + heightSpace))
                                            .attr("font-family", "sans-serif")
                                            .attr("font-size", "12px")
            } else {
            heightSpace+=15;
            if (i<=17) {
                growHeight+=15;
            }
            d3.select(source).append('text').text(filters[i])
                                            .attr("class", "filters")
                                            .attr("x", colWidth)
                                            .attr("y", (height + heightSpace))
                                            .attr("font-family", "sans-serif")
                                            .attr("font-size", "12px")
            }
        }
        // totalHeight+=growHeight;
    };
    let isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
    let isIE = ($.browser.msie);
    if (legendSource == '#statemapLegend') {
        if (isIE) {
            legend = $(legendSource).children()[0]
        } else {
            legend = $(legendSource).html();
        }
        $(source).append(legend);
        $(`${source} .legendQuant`).attr('transform', `translate(50, ${height})`);  
    } else {
        legend = getLegend(legendSource, view);
        writeLegends(legend,source,width,height);
    }
    if (isSVG) {
        if (isIE) {
            legendHeight = $(legendSource).height();
        } else {
            legendHeight = $(legendSource).innerHeight();
        }
        height += legendHeight;
        totalHeight += legendHeight;
    } else if (legend.length <= 8) {
        legendHeight = legend.length*30;
        height += legendHeight;
        totalHeight+=legendHeight
    } else {
        legendHeight = 20*8;
        height += legendHeight;
        totalHeight+=legendHeight
    }
    writeCurrentSvgFilters(width, height);
    if (filters.length <= 17) {
        totalHeight+=(filters.length*20);
    } else {
        totalHeight+=(17*20);
    }
    d3.select(source)
    .style('height', (totalHeight)+'px');
    let html = d3.select(source)
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", source)
        .node().outerHTML;
    if (isSafari) {
        let img = "data:image/svg+xml;utf8," + html;
        let newWindow = window.open(img, 'download');
    } else if (isIE) {
        let ieHTML = d3.select(source)
                    .attr("version", 1.1)
                    //.attr("xmlns", "http://www.w3.org/2000/svg")
                    .attr("xmlns:xlink", source)
                    .node()
                    .parentNode
                    .outerHTML;

           let test = ieHTML.replace("Drawing Visualization", "");

        let svgBlob = new BB([test], {
            type: "data:image/svg+xml;utf8"
        });
      FileSaver.saveAs(svgBlob, filename + "_" + filenameDateFormat(new Date()) + ".svg");
    } else {
        let blob = new BB([html], {
            type: "data:image/svg+xml"
        });
        FileSaver.saveAs(blob, filename + "_" + filenameDateFormat(new Date()) + ".svg")
    }
    d3.select(source)
    .style('height', origHeight+'px');
    if (isSVG) {
        if (isIE) {
            $(source+' .legendQuant').remove();
            $(legendSource).append(legend)
            $(legendSource+' > .legendQuant').attr('transform', 'translate(20, 20)');
        } else {
            $(`${source} .legendQuant`).remove();
            $(`${source} .legendQuant`).empty();
        }
    } else {
        if (isIE) {
            $(source+' text.legends').remove();
        } else {
            $(`${source} text.legends`).remove();
            $(`${source} text.legends`).empty();
        }
    }
    if (isIE) {
        $(source+' text.filters').remove();
    } else {
        $(`${source} text.filters`).remove();
        $(`${source} text.filters`).empty();
    }
    $('#pattern').remove();
};

const getLegendSource = (source) => {
    switch (source) {
        case '#d3plus':
            return 'treemap';
        case '#heatmap':
            isSVG = true;
            return 'heatmapLegend';
        case '#dispositionChart':
            if ($('.active-tab-nav-button').data('tab-id') == 'Comparison') {
                return '#genderBarComparisonLegend';
            } else {
                isSVG = false;
                return '#dispositionLegend';
            }
        case '#genderBar':
            if ($('.active-tab-nav-button').data('tab-id') == 'Comparison') {
                return '#genderBarComparisonLegend';
            } else {
                isSVG = false;
                return '#genderBarLegend';
            }
        case '#ageBar':
            if ($('.active-tab-nav-button').data('tab-id') == 'Comparison') {
                isSVG = false;
                return '#ageComparisonLegend';
            } else {
                isSVG = false;
                return '#ageBarLegend';
            }
        case '#ethnBar':
            if ($('.active-tab-nav-button').data('tab-id') == 'Comparison') {
                isSVG = false;
                return '#raceLegend';
            } else {
                isSVG = false;
                return '#raceLegend';
            }
        case '#deathTrends':
            isSVG = false;
            return '#InjuriesComparisonLegend';
        case '#genderTrend':
            isSVG = false;
            return '#genderTrendsLegend';
        case '#ageTrend':
            isSVG = false;
            return '#ageGroupTrendsLegend';
        case '#ethnTrend':
            isSVG = false;
            return '#raceGroupTrendsLegend';
    }
}

// Downloads chart as JPG image
const downloadJpg = (chartInfo, chartType) => {
    let source;
    let html;
    if (chartType === 'treemap') {
        source = '#d3plus';
    } else {
        source = chartInfo.chartObj.metadata.id;
    }
    let legend;
    let legendHeight;
    let view = $('.active-tab-nav-button').data('tab-id') == 'Comparison' ? 'Comparison' : 'individual';
    let legendSource = getLegendSource(source);
    let filename = chartInfo.file;
    let width = d3.select(source)[0][0].clientWidth;
    let height = d3.select(source)[0][0].clientHeight;
    let totalHeight = height;
    let content = d3.select("body").append("canvas")
        .attr("id", "canvas")
        .style("display", "none");
    // If bar chart, we need to add the CSS styles inline
    // so chart will render image correctly
    if (source.indexOf('Bar') !== -1) {
        styleBarChart(source);
    }
    if (source.indexOf('Trend') !== -1) {
        styleTrendChart(source);
    }
    let isIE = $.browser.msie;
    if (isIE) {
        html = d3.select(source)
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("xmlns:xlink", source)
            .attr("crossorigin", "anonymous")
            .node()
            .parentNode
            .innerHTML;
        if (legendSource == '#statemapLegend') {
            legend = d3.select(legendSource)
                .attr("version", 1.1)
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("xmlns:xlink", legendSource)
                .attr("crossorigin", "anonymous")
                .node()
                .parentNode
                .innerHTML;
        } else {
            legend = getLegend(legendSource, view);
        }
    } else {
        html = d3.select(source)
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("xmlns:xlink", source)
            .node()
            .outerHTML;
        if (legendSource == '#statemapLegend') {
            legend = d3.select(legendSource)
                .attr("version", 1.1)
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("xmlns:xlink", legendSource)
                .node()
                .outerHTML;
        } else {
            legend = getLegend(legendSource, view);
        }
    }
    // Convert SVG string to data URL
    let imgsrc = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(html)));
    let legendSrc;
    if (legendSource == '#statemapLegend') {
        legendSrc = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(legend)));
    }
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let filters = getCurrentFilters();
    if (filters.length <= 17) {
        totalHeight += (filters.length * 20);
    } else {
        totalHeight += (17 * 20);
    }
    if (isSVG) {
        legendHeight = $(legendSource).innerHeight()
        totalHeight += legendHeight;
    } else if (legend.length <= 8) {
        legendHeight = legend.length * 30;
        totalHeight += legendHeight
    } else {
        legendHeight = 20 * 8;
        totalHeight += legendHeight
    }
    let writeLegends = function (legend, context, width, height) {
        let heightSpace = 0;
        let widthSpace = (width / 3);
        let colWidth = 80;
        context.lineWidth = 1;
        context.lineStyle = "#000";
        context.font = "12px sans-serif";
        legend.forEach((item, index) => {
            if (index % 8 === 0 && index !== 0) {
                colWidth += widthSpace;
                heightSpace = 15;
                if (item.color.indexOf('url') >= 0) {
                    var im = $('#crosshatch').children()[0]
                    var pat = context.createPattern(im, 'repeat');
                    context.rect(colWidth, (height + heightSpace), 12, 12)
                    context.fillStyle = pat;
                    context.fill();
                } else {
                    context.fillStyle = item.color;
                    context.fillRect(colWidth, (height + heightSpace), 12, 12);
                }
                context.fillStyle = '#000';
                context.fillText(item.text, (colWidth + 20), (height + heightSpace + 10));
            } else {
                heightSpace += 15;
                if (item.color.includes('url')) {
                    var im = $('#crosshatch').children()[0]
                    var pat = context.createPattern(im, 'repeat');
                    context.rect(colWidth, (height + heightSpace), 12, 12)
                    context.fillStyle = pat;
                    context.fill();
                } else {
                    context.fillStyle = item.color;
                    context.fillRect(colWidth, (height + heightSpace), 12, 12);
                }
                context.fillStyle = '#000';
                context.fillText(item.text, (colWidth + 20), (height + heightSpace + 10));
            }
        });
        return context;
    };

    let writeCurrentFilters = function (context, width, height) {
        let heightSpace = 0;
        let widthSpace = (width / 4);
        let colWidth = 30;
        context.lineWidth = 1;
        context.fillStyle = "#000";
        context.lineStyle = "#000";
        context.font = "12px sans-serif";
        for (let i = 0; i < filters.length; i++) {
            if (i % 17 === 0 && i !== 0) {
                colWidth += widthSpace;
                heightSpace = 15;
                context.fillText(filters[i], colWidth, ((height + legendHeight) + heightSpace));
            } else {
                heightSpace += 15;
                context.fillText(filters[i], colWidth, ((height + legendHeight) + heightSpace));
            }
        }
        return context;
    };

    canvas.width = width;
    canvas.height = totalHeight;
    let image = new Image();
    let legendImg;
    if (legendSource == '#statemapLegend') {
        legendImg = new Image();
    }
    image.onload = function () {
        context.clearRect(0, 0, width, totalHeight);
        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, totalHeight);
        context.drawImage(image, 0, 0, width, height);
        if (legendSource == '#statemapLegend') {
            context.drawImage(legendImg, 0, height);
        } else {
            writeLegends(legend, context, width, height);
        }
        writeCurrentFilters(context, width, height);
        function download(data, filename) {
            let a = document.createElement('a');
            a.download = filename;
            a.href = data
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
        if (!isIE) {
            canvas.toBlob(function (blob) {
                FileSaver.saveAs(blob, filename + "_" + filenameDateFormat(new Date()) + ".jpg")
            });
        }
    }
    image.onerror = function () {
        console.error("Cannot load image", image.src);
    }
    if (legendSource == '#statemapLegend') {
        legendImg.onerror = function () {
            console.error("Cannot load image", legendImg.src);
        }
    }
    image.src = imgsrc;
    if (legendSource == '#statemapLegend') {
        legendImg.src = legendSrc;
    }
    d3.select("#canvas").remove();
    d3.select("#canvas").empty();
};

// Downloads chart data as CSV
const downloadData = (chartInfo, chartType) => {
    let chartData = chartInfo.chartObj.downloadData;

    if (app.globals.filters.groupby1 == 'NONE1') {
        chartData.forEach((item) => {
            delete item.ageadj;
        });
    }

    let filename = chartInfo.file;
    let filters = getCurrentFilters();
    let filterString = '';
    for (let q = 0; q < filters.length; q++) {
        if (q === 0) {
            filterString += '' + filters[q] + ',';
        } else if (q === (filters.length - 1)) {
            filterString += ' ' + filters[q] + '';
        } else {
            filterString += ' ' + filters[q] + ',';
        }
    }
    for (let i = 0; i < chartData.length; i++) {
        chartData[i].appliedFilters = filterString;
    }
    let blob = new Blob([d3.csv.format(chartData)], {
        type: "data:text/csv;charset=utf-8"
    });
    FileSaver.saveAs(blob, filename + "_" + filenameDateFormat(new Date()) + ".csv")
};

const styleBarChart = (source) => {
    /*
     * applies CSS styling to bar chart elements
     * so SVG / PNG will render properly
     */
    d3.select(source)
        .selectAll('.axis path')
        .style('fill', 'none');
    d3.select(source)
        .selectAll('.axis line')
        .style('fill', 'none')
        .style('stroke', '#C4C4C4')
        .style('stroke-width', '1px')
        .style('shape-rendering', 'crispEdges');
    // if ( source.indexOf('genderBar') !== -1 ) {
    d3.select(source)
        .selectAll('text.value')
        .style('fill', 'white');
    d3.select(source)
        .selectAll('.x.axis path')
        .style('display', 'none');
    // }
};

const styleTrendChart = (source) => {
    /*
     * applies CSS styling to bar chart elements
     * so SVG / PNG will render properly
     */
    d3.select(source)
        .selectAll('.axis path')
        .style('fill', 'none');
    d3.select(source)
        .selectAll('.axis line')
        .style('fill', 'none')
        .style('stroke', '#C4C4C4')
        .style('stroke-width', '1px')
        .style('shape-rendering', 'crispEdges');
    d3.select(source)
        .selectAll('.grid .tick')
        .style('stroke', '#C4C4C4')
        .style('opacity', '0.7')
        .style('shape-rendering', 'crispEdges');
    d3.select(source)
        .selectAll('.grid .path')
        .style('stroke-width', '0');
    d3.select(source)
        .selectAll('.line')
        .style('fill', 'none')
        .style('stroke-width', '1.5px');
};

module.exports = {
    getDownloadDataChartMetadata,
    downloadAsset,
}
