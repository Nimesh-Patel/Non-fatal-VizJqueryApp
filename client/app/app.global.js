'use strict';
let globals = require('../services/globals.js');

module.exports = {
    hostUrl: require('../../proxy/config').selectedProxy.CLIENT_URL,
    apiUrl: require('../../proxy/config').selectedProxy.SERVER_URL,
    services: require('../services/app.services').SERVICES,
    router: {},
    showFilterDataNav: function() {
        $('.filter-data-nav-container').show();
      },
    hideFilterDataNav: function() {
        //$('.breadcrumb-item').remove();
        $('.filter-data-nav-container').hide();
      },
    showOverlay: function() {
        $('.loading-overlay').show();
        $('body').addClass('no-scroll');
    },
    hideOverlay: function() {
      $('.progress-bar').css('width', '100%');
      jQuery({ Counter: Math.round($('.progress-bar').width()) }).animate({ Counter: Math.round($('.progress').width())}, {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $('.progress-bar').text(Math.ceil($.number(this.Counter / Math.round($('.progress').width()) * 100, 0)) + '%');
        }
      });
      setTimeout(() => {
        $('.loading-overlay').hide();
        $('.progress-bar').css('width', '0%');
        $('.progress-bar').text('0%');
        $('body').removeClass('no-scroll');
      }, 2000);
    },
    showCheckingComboOverlay: function() {
      $('.loading-checking-overlay').show();
    },
    hideCheckingComboOverlay: function() {
      $('.loading-checking-overlay').hide();
    },
    addProgress: function() {
      let cardCount = $('.card').length;
      let increment = ($('.progress').width() / cardCount );
      let width = $('.progress-bar').width();
      let nextVal = width + increment;
      $('.progress-bar').css('width', nextVal);
      jQuery({ Counter: Math.round(width) }).animate({ Counter: Math.round(nextVal) }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $('.progress-bar').text(Math.ceil($.number(this.Counter / Math.round($('.progress').width()) * 100, 0)) + '%');
        }
      });
    },
    registerTableArrowNav: function(table) {
      $(`${table} td`).keydown(function (e) {
          switch(e.keyCode)
          {
              // left arrow
              case 37:
                  $(this).prev()
                          .focus();
                  break;
   
              // right arrow
              case 39:
                  $(this).next()
                          .focus();
                  break;
   
              // up arrow
              case 40:
                  $(this).parent()
                          .next()
                          .children(`td[name="${$(this).attr('name')}"]`)
                          .focus();
                  break;
   
              // down arrow
              case 38:
                  $(this).parent()
                          .prev()
                          .children(`td[name="${$(this).attr('name')}"]`)
                          .focus();
                  break;
          }
      });
  },
    globals: globals,
    toastrOptions: {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-center",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    },
};