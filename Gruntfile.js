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
      tmp: '<%= mcac.tmp.base %>',
      dist : 'dist'
    },

    copy : {
      dist : {
        expand: true,
        cwd: '<%= mcac.tmp.base %>/',
        dest: 'dist/',
        src: '**/*'
      },
      firebase : {
        files: {
          'dist/firebase.json': [
            '<%= mcac.app.base %>/firebase.json'
          ]
        }
      }
    }

  });

  grunt.loadTasks('grunt');

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
    //'jshint',
    'clean',
    'sass',
    'copy',
    'uglify'
  ]);

  grunt.registerTask('serve', 'Run during development to immediately see changes.', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('test', [
    'build',
    'jasmine',
    'connect:test',
    'protractor'
    ]);

  grunt.registerTask('dist', [
    'build',
    //'test',
    'copy:dist',
    'copy:firebase'
  ]);

};
