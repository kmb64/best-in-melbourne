'use strict';

/**
 * @ngdoc function
 * @name bestInMelbourneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bestInMelbourneApp
 */
angular.module('bestInMelbourneApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
