import angular from 'angular';
import 'angular-ui-router';
import 'Firebase';
import 'angularfire';

// Import our app config files
import constants  from './modules/config/app.constants';
import appConfig  from './modules/config/app.config';
import appRun     from './modules/config/app.run';

import './modules/config/app.templates';
import './modules/leaderboard';
import './modules/services';

// Create and bootstrap application
const requires = [
  'firebase',
  'ui.router',
  'templates',

  'app.leaderboard',
  'app.services'
];

firebase.initializeApp({
  apiKey: 'AIzaSyBmsVvx08Eo6YyNvE8eIPsb72RD_FV693g',
  authDomain: 'wheres-the-best.firebaseapp.com',
  databaseURL: 'https://wheres-the-best.firebaseio.com',
  storageBucket: 'wheres-the-best.appspot.com',
});

angular.module('app', requires)
  .constant('AppConstants', constants)
  .config(appConfig)
  .run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});