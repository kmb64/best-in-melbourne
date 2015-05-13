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
  .controller('VoteCtrl', ['$scope', '$firebaseAuth', '$firebaseObject', 'config', '$routeParams', 'Social',
    function ($scope, $firebaseAuth, $firebaseObject, config, $routeParams, Social) {

      var auth = $firebaseAuth(new Firebase(config.firebase));
      var place = $firebaseObject(new Firebase(config.firebase + $routeParams.type + '/' + $routeParams.place));
      $scope.$parent.placeType = $routeParams.type;

      place.$loaded(function(){
        place.$bindTo($scope, 'place');

        Social.getRecentMedia(place.social[0]).then(function(response){
          $scope.media = response;
        });

        Social.getMyLastName().then(function(response){
          console.log(response);
        });

      });



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
