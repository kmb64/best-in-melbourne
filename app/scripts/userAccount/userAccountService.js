'use strict';

angular.module('bestInMelbourneApp')
  .factory('userAccount', ['$window', '$firebaseObject', 'config', '$q',
    function ($window, $firebaseObject, config, $q) {

    var uaService ={};

    uaService.getAccount = function(id) {
      var deferred = $q.defer();
      $firebaseObject(new $window.Firebase(config.firebase + 'userAccounts/' + id)).$loaded(function(response){
        deferred.resolve(response);
      }, function(){
        deferred.reject();
      });

      return deferred.promise;
    };

    return uaService;

  }]);
