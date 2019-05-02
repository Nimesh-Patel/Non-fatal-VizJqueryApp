'use strict';

let SERVICES = {
    renderLoading: function() {
        $('.loading-view').show();
    },
    hideLoading: function() {
        $('.loading-view').hide();
    },
};

module.exports = {
    SERVICES,
};