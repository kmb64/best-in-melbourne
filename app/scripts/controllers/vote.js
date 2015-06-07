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
  .controller('VoteCtrl', ['$scope', '$firebaseObject', 'config', '$routeParams', 'Social', 'Auth', 'userAccount',
    function ($scope, $firebaseObject, config, $routeParams, Social, Auth, userAccount) {

      var ref = new Firebase(config.firebase + $routeParams.type + '/' + $routeParams.place);
      var place = $firebaseObject(ref);

      $scope.$parent.placeType = $routeParams.type;
      var auth = Auth.getAuth();

      place.$loaded(function(){
        place.$bindTo($scope, 'place');

        var instagram = _.find(place.social, function(socialObj){
          return socialObj.channel === 'instagram';
        });

        if(instagram) {
          Social.getRecentMedia(instagram).then(function(response){
            $scope.media = response;
          });
        }

        var facebook = _.find(place.social, function(socialObj){
          return socialObj.channel === 'facebook';
        });

        if(facebook) {
          Social.getFBProfile(facebook).then(function(response){
            $scope.fb = response;
          });
        }

        userAccount.getAccount('1234').then(function(response){
          console.log('get account loaded');
          console.log(response);
        });

      });

      auth.$onAuth(function (authData) {
        console.log(authData);
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
