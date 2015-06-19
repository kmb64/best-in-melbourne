'use strict';

module.exports = function (grunt) {

  grunt.extendConfig({

    watch : {
      js: {
        files: [
          '<%= mcac.app.base %>/app.js',
          '<%= mcac.app.base %>/scripts/{,*/}*.js'
        ],
        tasks: ['copy:js', 'uglify']
      }
    },

    copy : {
      js: {
        files: {
          '<%= mcac.tmp.base %>/scripts/angular.js': [
            'node_modules/angular/angular.js'
          ],
          '<%= mcac.tmp.base %>/scripts/angular-messages.js': [
            'node_modules/angular-messages/angular-messages.js'
          ],
          '<%= mcac.tmp.base %>/scripts/testFormController.js': [
            '<%= mcac.app.base %>/scripts/testFormController.js'
          ]
        }
      }
    },

    jshint: {
      js: {
        options: {
          reporter: require('jshint-stylish'),
          jshintrc: '.jshintrc'
        },
        src: [
          'Gruntfile.js',
          '<%= mcac.app.base %>/app.js',
          '<%= mcac.app.base %>/scripts/*.js',
          '!<%= mcac.app.base %>/scripts/qasAutoComplete.js',//Library file.
          '<%= mcac.test.base %>/specs/*.js'
        ]
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        beautify: true,
        compress: false,
        mangle: false
      },
      js: {
        files: {
          '<%= mcac.tmp.base %>/scripts/address-completion.js': [
            '<%= mcac.app.base %>/app.js',
            '<%= mcac.app.base %>/scripts/*.js',
            //This script is to aid local dev only.
            '!<%= mcac.app.base %>/scripts/testFormController.js'
          ]
        }
      }
    }

  });

};