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
  .controller('PlaceCtrl', ['$scope', '$firebaseArray', 'Vote', 'Social', 'config',
    function ($scope, $firebaseArray, Vote, Social, config) {

      var ref = new Firebase(config.firebase);

      var assignProfilePictures = function(places){
        angular.forEach(places, function(place){
          Social.getProfilePicture(place.social[0]).then(function(response){
            place.profilePicture = response;
          });
        });
      };

      $firebaseArray(ref).$loaded(function (places) {
        $scope.places = places;
        assignProfilePictures(places);
      });

    }]);
