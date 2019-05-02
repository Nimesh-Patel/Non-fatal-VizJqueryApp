
'use strict';

let app = require('../../../app.global.js');
const toastr = require('toastr');
const main = require('../../../../services/main.js');
const filterData = require('../../FilterData/filterData.events.js')
let colorLoop;
let data;
let minimumsArr;

const filterDataTreemap = (group) => { 
    let type = group.type;
    let value = group.value;

    if (type == 'intent') {
      $("#treemapDropdown").val('mech');
      let intent = $('.selectedIntentId[data-intent-name="'+value+'"]').data('intent-id');
      app.globals.intentMechCombo.intent = intent;
      main.setIntentAndMechValues(intent, app.globals.intentMechCombo.mech);
      filterData.checkIntentCheckboxes();
      filterData.checkMechCheckboxes();
      toastr.options =  app.toastrOptions;
      toastr.success('You have applied a filter of '+app.globals.filters.intentName+' '+app.globals.filters.mechName+' as the Cause of Injury.');
    } else {
      $("#treemapDropdown").val('intent');
      let mech = $('.selectedmech-Id[data-mech-name="'+value+'"]').data('mech-id');
      app.globals.intentMechCombo.mech = mech;
      main.setIntentAndMechValues( app.globals.intentMechCombo.intent, mech);
      filterData.checkIntentCheckboxes();
      filterData.checkMechCheckboxes();
      toastr.options =  app.toastrOptions;
      toastr.success('You have applied a filter of '+app.globals.filters.intentName+' '+app.globals.filters.mechName+' as the Cause of Injury.');
    }

    filterData.checkDispositionCheckboxes();
    filterData.checkSexCheckboxes();
    $('#applyFilterDataFilters').trigger('click');
}
 
const drawTreemap = (res, metadata) => {
        $(metadata.id).empty();
        $(metadata.id).css('width', '95%').css('height', $('#chartContainer_treemap').height() * .9).css('margin', '0 auto');
        res.forEach((item) => { item.crudeNumber = item.injuries});
        //data = services.buildSuppressionObjects(res, metadata, 'treemap');
        let visualization = d3plus.viz()
                .container(metadata.id)
                .data(res)
                .type("tree_map")
                .id([metadata.parent])
                .size("injuries")
                .format({
                    "number": function (number, d) {
                        let total = res.reduce((sum, item) => { 
                            return sum += item.injuries}, 0);
                        let currentValue = res.filter((item) => {
                        if (d.key === "share") {
                        if ((item.injuries / total) * 100 == number) {
                            return item;
                        }
                        } else {
                            if (item.injuries == number) {
                                return item;
                            }
                        }
                        })
                        currentValue = currentValue[0];
                        if (d.key === "share") {
                            return (d3.round(number, 1) + "%");
                        } else {
                            if(currentValue.secondarySuppressed || currentValue.suppressed){
                            return "--";
                            } else if (currentValue.crudeNumber < 21) {
                                return `${$.number(number)}**`;
                        } else {
                            return $.number(number);
                            }
                        }
                    },
                    "text": function(text, params) {
                    if (text === "share") {
                    return "Percent";
                    } else {
                    return d3plus.string.title(text, params);
                    }
                    }
                    })
                    .color({
                    "scale": metadata.colorset
                    })
                    .labels({
                    "align": "left",
                    "valign": "top"
                })
                .mouse({
                    "click": function(d, viz) {
                        let group = {};

                        if (metadata.parent == "Intentlbl") {
                        group = {
                            type: "intent",
                            value: d["Intentlbl"]
                        };
                        } else {
                            group = {
                                type: "mech",
                                value: d["Mechlbl"]
                            };
                        }
                         filterDataTreemap(group);
                    }
                })
                .draw()
        
        colorLoop = 0;
        
// app.globals.generateTabThroughElements('data');
}
 
module.exports = {
drawTreemap,
}