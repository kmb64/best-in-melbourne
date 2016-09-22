import angular from 'angular';

// Create the module where our functionality can attach to
let placesModule = angular.module('app.leaderboard', []);

// Include our UI-Router config settings
import PlacesConfig from './leaderboard.config';
placesModule.config(PlacesConfig);


// Controllers
import PlacesCtrl from './leaderboard.controller';
placesModule.controller('PlacesCtrl', PlacesCtrl);


export default placesModule;
