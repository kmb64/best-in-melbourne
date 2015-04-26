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
  .controller('BurgerCtrl', ['$scope', '$firebaseArray', 'Vote', '$http', function ($scope, $firebaseArray, Vote, $http ) {

    var ref = new Firebase('https://vivid-inferno-5850.firebaseio.com/');
    //$scope.places = $firebaseArray(ref);

    $scope.places = $firebaseArray(ref).$loaded(function(places){
      $scope.places = places;
      angular.forEach($scope.places, function(val){
        console.log(val.social[0].userId);
        $http.jsonp('https://api.instagram.com/v1/users/'+val.social[0].userId+'?client_id=0a5a8e73d67249a8bb13f00948c9a864&callback=JSON_CALLBACK')
          .success(function(response){
            //console.log(response.data['profile_picture']);
            if(response.data){
              val.profilePicture = response.data['profile_picture'];
            }
            //try facebook
            else {
              $http.jsonp('https://graph.facebook.com/v2.3/' + val.social[0].userId + '/picture?redirect=false&width=150&callback=JSON_CALLBACK')
                .success(function(fbResponse){
                  val.profilePicture = fbResponse.data['url'];
                })
            }

          });
        //$http.get('https://api.instagram.com/v1/users/'+val.social[0].userId+'/media/recent/?client_id=0a5a8e73d67249a8bb13f00948c9a864')
        //  .success(function(data){
        //    console.log(data.profile_picture);
        //
        //  });
      });
    });


    $scope.updateVote = function(place){
      var updated = Vote.updateVote($scope.places.$getRecord(place.$id));
      $scope.places.$save(updated);
    };

  }]);
