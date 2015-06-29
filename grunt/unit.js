'use strict';

module.exports = function (grunt) {

  grunt.extendConfig({

    jasmine: {
      options: {
        specs: ['<%= mcac.test.base %>/spec/{,*/}*.js'],
        vendor: [
          'bower_components/angular/angular.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-cookies/angular-cookies.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-sanitize/angular-sanitize.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/firebase/firebase.js',
          'bower_components/angularfire/dist/angularfire.js',
          'bower_components/underscore/underscore.js'
        ],
        helpers: [
          '<%= mcac.app.base %>/app.js',
          '<%= mcac.app.base %>/config.js'
        ]
      },
      test: {
        src: [
          '<%= mcac.app.base %>/scripts/{,*/}*.js'
        ],
        options: {
          keepRunner: true
        }
      }
    }

  });

};
