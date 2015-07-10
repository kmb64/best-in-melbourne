'use strict';

angular.module('bestInMelbourneApp')
  .controller('AdminPlaceCtrl', ['$scope', '$firebaseArray', 'Social', 'config', '$routeParams',
    function ($scope, $firebaseArray, Social, config, $routeParams) {

      var ref = new Firebase(config.firebase + $routeParams.city + '/' + $routeParams.type);
      var list = $firebaseArray(ref);

      $scope.place = {};

      $scope.add = function () {
        list.$add($scope.place);
      };

    }]);
