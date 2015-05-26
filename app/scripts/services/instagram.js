'use strict';

angular.module('bestInMelbourneApp')
  .factory('instagram', ['$http', 'config', function ($http, config) {

    var instagram = {};

    var params = {
      'callback' : 'JSON_CALLBACK',
      'client_id' : config.instagramClientId
    };

    instagram.getProfilePicture = function(id){
      return $http.jsonp(config.instagram + id, params);
    };

    return instagram;

  }]);
