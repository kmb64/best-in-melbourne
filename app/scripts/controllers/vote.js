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
  .controller('VoteCtrl', ['$scope', '$firebaseObject', 'config', '$routeParams', 'Social', 'Auth',
    function ($scope, $firebaseObject, config, $routeParams, Social, Auth) {

      var ref = new Firebase(config.firebase + $routeParams.type + '/' + $routeParams.place);
      var place = $firebaseObject(ref);

      $scope.$parent.placeType = $routeParams.type;
      var auth = Auth.getAuth();

      place.$loaded(function(){
        place.$bindTo($scope, 'place');

        //Social.getRecentMedia(place.social[0]).then(function(response){
        //  $scope.media = response;
        //});

        Social.getFBProfile().then(function(response){
          $scope.fb = response;
          console.log(response);
        });

      });

      auth.$onAuth(function (authData) {
        $scope.authorized = authData;
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
