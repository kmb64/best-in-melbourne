'use strict';

module.exports = function (grunt) {

  grunt.extendConfig({

    connect: {
      dev: {
        options: {
          port: 9000,
          hostname: '*',
          livereload: 35729,
          base: ['<%= mcac.tmp.base %>'],
          open: 'http://localhost:<%= connect.dev.options.port %>/index.html'
        }
      },
      test: {
        options: {
          port: 9001,
          hostname: '*',
          base: ['<%= mcac.tmp.base %>']
        }
      }
    },

    express: {
      options: {
        port: 4000,
        script: 'test/express/stub.js'

      },
      stub: {
        options: {
          args: [9000]
        }
      },
      test: {
        options: {
          args: [9001]
        }
      }
    }

  });

};