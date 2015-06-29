'use strict';

angular.module('bestInMelbourneApp')
  .factory('Auth', ['$firebaseAuth', 'config', function ($firebaseAuth, config) {

    var getAuth = function () {
      return $firebaseAuth(new Firebase(config.firebase));
    };

    return {
      getAuth: getAuth
    }

  }]);
