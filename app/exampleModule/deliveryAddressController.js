'use strict';

angular.module('myPost.consumerAddressbook.deliveryAddress').controller('deliveryAddressController',
  [
    '$scope', '$location', 'deliveryAddressService',
    function ($scope, $location, deliveryAddressService) {

      $scope.deliveryAddress = {};

      $scope.addAddress = function () {

        if ($scope.deliveryAddressForm.$invalid) {
          return false;
        }
        deliveryAddressService.add($scope.deliveryAddress).then(
          function () {
            $location.path('/address');
            $location.replace();
          });
      };
    }
  ]);
