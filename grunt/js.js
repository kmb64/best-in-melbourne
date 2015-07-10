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
          '<%= mcac.tmp.base %>/bower_components/angular/angular.js': [
            'bower_components/angular/angular.min.js'
          ],
          '<%= mcac.tmp.base %>/bower_components/angular-route/angular-route.js': [
            'bower_components/angular-route/angular-route.min.js'
          ],
          '<%= mcac.tmp.base %>/bower_components/firebase/firebase.js': [
            'bower_components/firebase/firebase.js'
          ],
          '<%= mcac.tmp.base %>/bower_components/angularfire/dist/angularfire.js': [
            'bower_components/angularfire/dist/angularfire.min.js'
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
          '<%= mcac.test.base %>/specs/*.js'
        ]
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        beautify: false,
        compress: false,
        mangle: false
      },
      js: {
        files: {
          '<%= mcac.tmp.base %>/scripts/app.js': [
            '<%= mcac.app.base %>/scripts/app.js',
            '<%= mcac.app.base %>/scripts/config.js',
            '<%= mcac.app.base %>/scripts/{,*/}*.js'
          ]
        }
      }
    }

  });

};
