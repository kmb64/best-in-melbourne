/*global Firebase */
'use strict';

/**
 * @ngdoc function
 * @name bestInMelbourneApp.controller:BurgerCtrl
 * @description
 * # BurgerCtrl
 * Controller of the bestInMelbourneApp
 */
angular.module('bestInMelbourneApp')
  .controller('BurgerCtrl', ['$scope', '$firebaseArray', '$firebaseAuth', 'Vote', 'Social',
    function ($scope, $firebaseArray, $firebaseAuth, Vote, Social) {

      var ref = new Firebase('https://vivid-inferno-5850.firebaseio.com/');
      //$scope.places = $firebaseArray(ref);

      //var auth = $firebaseAuth(ref);
      //
      //console.log(auth.$getAuth());
      //
      //auth.$onAuth(function(authData){
      //  if(authData) {
      //    console.log(authData);
      //
      //  }else {
      //
      //    auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      //      console.log("Logged in as:", authData.uid);
      //    }).catch(function(error) {
      //      console.error("Authentication failed:", error);
      //    });
      //
      //  }
      //
      //});


      //$scope.logOut = function(){
      //  console.log('logging out!');
      //  auth.$unauth();
      //};

      $firebaseArray(ref).$loaded(function (places) {
        $scope.places = places;

        angular.forEach($scope.places, function(val){
          Social.getProfilePicture(val.social[0]).then(function(response){
            val.profilePicture = response;
          });
        });
      });

      $scope.updateVote = function (place) {
        var updated = Vote.updateVote($scope.places.$getRecord(place.$id));
        $scope.places.$save(updated);
      };

    }]);
