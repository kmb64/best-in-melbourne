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
  .controller('BurgerCtrl', ['$scope', '$firebaseArray', 'Vote', 'Social', 'config',
    function ($scope, $firebaseArray, Vote, Social, config) {

      var ref = new Firebase(config.firebase);

      $firebaseArray(ref).$loaded(function (places) {
        $scope.places = places;

        angular.forEach($scope.places, function(val){
          Social.getProfilePicture(val.social[0]).then(function(response){
            val.profilePicture = response;
          });
        });
      });

    }]);
