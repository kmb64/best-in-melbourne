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
  .controller('VoteCtrl', ['$scope', '$firebaseObject', 'config', '$routeParams', 'Social', 'Auth', 'userAccount', 'vote',
    function ($scope, $firebaseObject, config, $routeParams, Social, Auth, userAccount, vote) {

      var city = $routeParams.city,
        placeType = $routeParams.type,
        placeId = $routeParams.place,
        favourites;

      $scope.$parent.city = city;
      $scope.$parent.placeType = placeType;

      var ref = new Firebase(config.firebase + city + '/' + placeType + '/' + placeId);
      var place = $firebaseObject(ref);

      var auth = Auth.getAuth();

      place.$loaded(function(){
        place.$bindTo($scope, 'place');

        if(typeof place.social.instagram !== 'undefined') {
          Social.getRecentMedia(place.social.instagram).then(function(response){
            $scope.media = response;
          });
        }

        Social.assignProfilePicture(place.social).then(function (response) {
          $scope.profilePic = response;
        });

        $scope.vote = function() {
          $scope.place.votes += 1;
          favourites.$add(placeId).then(function(){
            $scope.voted = true;
          });
        };

      });

      auth.$onAuth(function (authData) {
        $scope.authorized = authData;
        if(authData) {
          favourites = userAccount.getUserFavourites($scope.authorized.uid, city, placeType);
          favourites.$loaded(function(places){
            angular.forEach(places, function(place){
              if(place.$value === placeId) {
                $scope.voted = true;
              }
            });

          });
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
