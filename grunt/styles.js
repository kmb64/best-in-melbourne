'use strict';

module.exports = function (grunt) {

  grunt.extendConfig({

    watch : {
      css: {
        files: [
          '<%= mcac.app.base %>/styles/{,*/}*.scss',
          '<%= mcac.app.base %>/styles/app.scss'
        ],
        tasks: ['sass']
      }
    },

    copy : {
      fonts: {
        expand: true,
        cwd: '<%= mcac.app.base %>/styles/fonts/',
        dest: '<%= mcac.tmp.base %>/styles/fonts/',
        src: '*'
      }
    },

    sass: {
      app: {
        files: {
          '<%= mcac.tmp.base %>/styles/app.css': '<%= mcac.app.base %>/styles/app.scss'
        }
      }
    }

  });

};
