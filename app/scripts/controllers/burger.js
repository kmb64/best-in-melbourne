/*global $firebaseArray, Firebase */
'use strict';

/**
 * @ngdoc function
 * @name bestInMelbourneApp.controller:MainCtrl
 * @description
 * # BurgerCtrl
 * Controller of the bestInMelbourneApp
 */
angular.module('bestInMelbourneApp')
  .controller('BurgerCtrl',function ($scope, $firebaseArray) {

    var ref = new Firebase('https://vivid-inferno-5850.firebaseio.com/');
    $scope.places = $firebaseArray(ref);

    $scope.updateVote = function(place){
      var burger = $scope.places.$getRecord(place.$id);
      burger.votes += 1;
      $scope.places.$save(burger);
    };

  });
