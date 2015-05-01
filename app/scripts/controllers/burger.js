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
  .controller('BurgerCtrl', ['$scope', '$firebaseArray', '$firebaseAuth', 'Vote', 'Social', 'config',
    function ($scope, $firebaseArray, $firebaseAuth, Vote, Social, config) {

      var ref = new Firebase(config.firebase);
      var auth = $firebaseAuth(ref);

      auth.$onAuth(function(authData){
        console.log('run onauth' + authData);
      });
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


      $scope.logOut = function(){
        console.log('logging out!');
        auth.$unauth();
      };

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
