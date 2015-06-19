'use strict';

module.exports = function (grunt) {

  grunt.extendConfig({

    watch : {
      html: {
        files: [
          '<%= mcac.app.base %>/**/*.html'
        ],
        tasks: ['newer:copy:html']
      }
    },

    copy : {
      html: {
        files: [
          {
            expand: true,
            cwd: '<%= mcac.app.base %>/views',
            dest: '<%= mcac.tmp.base %>/views',
            src: ['**/*.html']
          },
          {
            expand: true,
            cwd: '<%= mcac.app.base %>/',
            dest: '<%= mcac.tmp.base %>/',
            src: ['index.html']
          }
        ]
      }
    }

  });

};