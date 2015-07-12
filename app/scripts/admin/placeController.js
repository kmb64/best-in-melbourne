'use strict';

angular.module('bestInMelbourneApp')
  .controller('AdminPlaceCtrl', ['$scope', '$firebaseArray', 'Social', 'config', '$routeParams', '$location',
    function ($scope, $firebaseArray, Social, config, $routeParams, $location) {

      $scope.$parent.city = $routeParams.city;

      var ref = new Firebase(config.firebase + $routeParams.city + '/' + $routeParams.type);
      var list = $firebaseArray(ref);

      $scope.type = $routeParams.type;
      $scope.place = {};

      var add = function () {
        $scope.place.votes = 0;
        list.$add($scope.place).then(function() {
          $location.path('/melbourne/burger');
          $location.replace();
        });
      };

      $scope.submit = function() {
        if($scope.adminPlaceForm.$invalid) {
          return false;
        }
        add();
      };

    }]);
