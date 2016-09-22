/*global browser*/
'use strict';

exports.config = {

  // Instruct protractor to connect directly to the browser drivers
  // for Chrome and Firefox
  directConnect: true,

  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.

  allScriptsTimeout: 30000,

  baseUrl: 'http://localhost:9000/',

  rootElement: '[ng-app]',

  // A callback function called once protractor is ready and available, and
  // before the specs are executed
  // You can specify a file containing code to run by setting onPrepare to
  // the filename string.
  onPrepare: function () {

    var env = jasmine.getEnv();

    // Enable ES6 transpiling
    require('babel-core/register');

    // At this point, global 'protractor' object will be set up, and jasmine
    // will be available.
    var jasmineReporters = require('jasmine-reporters');
    // defect with the reporter doesn't create directories if they don't exist.
    env.addReporter(new jasmineReporters.JUnitXmlReporter({
      savePath: 'dist/bin/reports/',
      filePrefix: 'PROTRACTORresults'
    }));

    // Add spec reporter for pretty spec reports
    var SpecReporter = require('jasmine-spec-reporter');
    var SpecConfig = {
      displayStacktrace: 'all'
    };
    env.addReporter(new SpecReporter(SpecConfig));
  },

  afterLaunch: function() {
  },

  // Disable the warning message "You are using an unsupported command-line flag --ignore-certificate-errors. Stability
  // and security will suffer." when functional test run in Chrome
  capabilities: {
    browserName: 'firefox', // 'firefox' or 'chrome'
    'chromeOptions': {
      args: ['--test-type']
    }
  },

  // ----- The test framework -----
  //
  // Jasmine is fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine2',

  // ----- The cleanup step -----
  //
  // A callback function called once the tests have finished running and
  // the webdriver instance has been shut down. It is passed the exit code
  // (0 if the tests passed or 1 if not).
  onCleanUp: function () {
  }

};
