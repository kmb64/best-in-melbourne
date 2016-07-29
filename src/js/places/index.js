import angular from 'angular';

// Create the module where our functionality can attach to
let placesModule = angular.module('app.places', []);

// Include our UI-Router config settings
import PlacesConfig from './places.config';
placesModule.config(PlacesConfig);


// Controllers
import PlacesCtrl from './places.controller';
placesModule.controller('PlacesCtrl', PlacesCtrl);


export default placesModule;
