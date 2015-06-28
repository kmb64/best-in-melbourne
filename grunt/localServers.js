'use strict';

module.exports = function (grunt) {

  var modRewrite = require('connect-modrewrite');

  grunt.extendConfig({

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        //hostname: 'localhost',
        hostname: '*',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              modRewrite(['^[^\\.]*$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/.tmp/styles',
                connect.static('./.tmp')
              )
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              modRewrite(['^[^\\.]*$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/.tmp/styles',
                connect.static('./.tmp')
              )
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
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
