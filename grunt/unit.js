'use strict';

module.exports = function (grunt) {

  grunt.extendConfig({

    jasmine: {
      options: {
        specs: ['<%= mcac.test.base %>/specs/*.js'],
        vendor: [
          'node_modules/angular/angular.js',
          'node_modules/angular-mocks/angular-mocks.js',
          'node_modules/angular-messages/angular-messages.js',
          'node_modules/requirejs/require.js'
        ],
        helpers: [
          '<%= mcac.app.base %>/app.js'
        ]
      },
      test: {
        src: [
          '<%= mcac.app.base %>/scripts/*.js',
          '!<%= mcac.app.base %>/scripts/qasAutoComplete.js'
        ],
        options: {
          keepRunner: true
        }
      }
    }

  });

};