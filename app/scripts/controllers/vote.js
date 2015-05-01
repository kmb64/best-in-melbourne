/*global Firebase */

'use strict';

/**
 * @ngdoc function
 * @name bestInMelbourneApp.controller:VoteCtrl
 * @description
 * # VoteCtrl
 * Controller of the bestInMelbourneApp
 */
angular.module('bestInMelbourneApp')
  .controller('VoteCtrl',['$scope','$firebaseAuth', 'config', '$routeParams',
    function ($scope, $firebaseAuth, config, $routeParams) {

    var ref = new Firebase(config.firebase);
    var auth = $firebaseAuth(ref);

      $scope.place = $routeParams.place;
      console.log($scope.place);

  }]);
