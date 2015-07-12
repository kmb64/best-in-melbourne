/*global Firebase */
'use strict';

/**
 * @ngdoc function
 * @name bestInMelbourneApp.controller:PlaceCtrl
 * @description
 * PlaceCtrl
 * Controller of the bestInMelbourneApp
 */
angular.module('bestInMelbourneApp')
  .controller('PlaceCtrl', ['$scope', '$firebaseArray', 'Social', 'config', '$routeParams',
    function ($scope, $firebaseArray, Social, config, $routeParams) {

      var ref = new Firebase(config.firebase + $routeParams.city + '/' + $routeParams.type);
      $scope.$parent.placeType = $routeParams.type;
      $scope.$parent.city = $routeParams.city;

      $firebaseArray(ref).$loaded(function (places) {
        $scope.places = places;
        Social.assignProfilePictures($scope.places);
      });

    }]);
