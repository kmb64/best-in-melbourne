'use strict';

module.exports = function (grunt) {

  grunt.extendConfig({

    protractor: {
      options: {
        configFile: 'test/protractor.conf.js', // Target-specific config file
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false // If true, protractor will not use colors in its output.
      },
      firefox: {
        options: {
          args: {
            verbose: true,
            browser: 'firefox',
            directConnect: true,
            params: '<%= data %>'
          }
        }
      }
    }

  });

};