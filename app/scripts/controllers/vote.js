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
  .controller('VoteCtrl', ['$scope', '$firebaseAuth', '$firebaseObject', 'config', '$routeParams',
    function ($scope, $firebaseAuth, $firebaseObject, config, $routeParams) {

      var auth = $firebaseAuth(new Firebase(config.firebase));
      var syncObject = $firebaseObject(new Firebase(config.firebase +$routeParams.place));

      syncObject.$bindTo($scope, 'place');

      auth.$onAuth(function (authData) {
        $scope.authorized = authData;
        if (authData) {
          var provider = authData.provider;
          $scope.status = 'Welcome, ' + authData[provider].displayName;
        }
      });

      $scope.getAuthorized = function (provider) {
        auth.$authWithOAuthRedirect(provider, function (error) {
          $scope.status = 'fail redirect' + error;
        });
      };

      $scope.logOut = function () {
        auth.$unauth();
      };

    }]);
