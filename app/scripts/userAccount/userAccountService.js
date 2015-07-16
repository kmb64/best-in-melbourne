'use strict';

angular.module('bestInMelbourneApp')
  .factory('userAccount', ['$window', '$firebaseObject', 'config', '$q', '$firebaseArray',
    function ($window, $firebaseObject, config, $q, $firebaseArray) {

    var uaService ={};

    uaService.getAccount = function(userId) {
      var deferred = $q.defer();
      $firebaseObject(new $window.Firebase(config.firebase + 'userAccounts/' + userId)).$loaded(function(response){
        deferred.resolve(response);
      }, function(){
        deferred.reject();
      });

      return deferred.promise;
    };

      uaService.getUserFavourites = function(userId, city, placeType) {
        return $firebaseArray(new $window.Firebase(config.firebase + 'userAccounts/' + userId + 'favourites/' + city + '/' + placeType));
      };

    return uaService;

  }]);
