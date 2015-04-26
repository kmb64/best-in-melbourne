/*global Firebase */
'use strict';

/**
 * @ngdoc function
 * @name bestInMelbourneApp.controller:BurgerCtrl
 * @description
 * # BurgerCtrl
 * Controller of the bestInMelbourneApp
 */
angular.module('bestInMelbourneApp')
  .controller('BurgerCtrl', ['$scope', '$firebaseArray', 'Vote', function ($scope, $firebaseArray, Vote) {

    var ref = new Firebase('https://vivid-inferno-5850.firebaseio.com/');
    $scope.places = $firebaseArray(ref);

    $scope.updateVote = function(place){
      var updated = Vote.updateVote($scope.places.$getRecord(place.$id));
      $scope.places.$save(updated);
    };

  }]);
