'use strict';

angular.module('bestInMelbourneApp')
  .factory('userAccount', ['$window', '$firebaseObject', 'config',function ($window, $firebaseObject, config) {

    var uaService ={};

    uaService.getAccount = function(id) {
      return $firebaseObject(new $window.Firebase(config.firebase + '/userAccounts' + '/' + id));
    };

    return uaService;

  }]);
