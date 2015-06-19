'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt, {
    // https://github.com/maenu/grunt-template-jasmine-istanbul/issues/8
    pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
  });

  grunt.initConfig({

    watch: {
      grunt: {
        options: {
          // reload watch task if Grunt config changes.
          reload: true
        },
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['<%= mcac.tmp.base %>/**/*']
      }
    },

    clean: {
      tmp: '<%= mcac.tmp.base %>'
    },

    copy: {
      npmModule: {
        files: {
          'address-completion.js': [
            '<%= mcac.tmp.base %>/scripts/address-completion.js'
          ],
          'qasDirective.html' : [
            '<%= mcac.tmp.base %>/views/qasDirective.html'
          ],
          '_addressCompletion.scss' : [
            '<%= mcac.app.base %>/styles/partials/_addressCompletion.scss'
          ]
        }
      }
    }

  });

  grunt.loadTasks('config/grunt');

  grunt.config('mcac', {
    tmp: {
      base: '.tmp'
    },
    app: {
      base: 'app'
    },
    test: {
      base: 'test'
    }
  });

  grunt.registerTask('build',[
    'jshint',
    'clean',
    'sass',
    'copy',
    'uglify'
  ]);

  grunt.registerTask('serve', 'Run during development to immediately see changes.', [
    'build',
    'express:stub',
    'connect:dev',
    'watch'
  ]);

  grunt.registerTask('test', [
    'build',
    'jasmine',
    //'express:test',
    //'connect:test',
    //'protractor'
    ]);

  grunt.registerTask('prepareNpmModule', [
    'test',
    'copy:npmModule'
  ]);
};
