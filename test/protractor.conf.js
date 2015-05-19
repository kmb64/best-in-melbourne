/*global browser*/
'use strict';
exports.config = {

  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.

  allScriptsTimeout: 30000,

  baseUrl: 'http://localhost:9001/',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['functional/**/*.fn.js'],

  rootElement: '[ng-app]',

  // A callback function called once protractor is ready and available, and
  // before the specs are executed
  // You can specify a file containing code to run by setting onPrepare to
  // the filename string.
  onPrepare: function () {

    browser.setWindowSizeMobile = function () {
      browser.driver.manage().window().setSize(360, 480);
    };

  },

  // Disable the warning message "You are using an unsupported command-line flag --ignore-certificate-errors. Stability
  // and security will suffer." when functional test run in Chrome
  capabilities: {
    browserName: 'chrome',
    'chromeOptions': {
      args: ['--test-type']
    }
  },


  // ----- The cleanup step -----
  //
  // A callback function called once the tests have finished running and
  // the webdriver instance has been shut down. It is passed the exit code
  // (0 if the tests passed or 1 if not).
  onCleanUp: function () {
  }
};
