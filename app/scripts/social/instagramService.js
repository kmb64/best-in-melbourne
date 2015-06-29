'use strict';

angular.module('bestInMelbourneApp')
  .factory('instagram', ['$http', 'config', '$q', function ($http, config, $q) {

    var instagram = {};

    var params = {
      'callback': 'JSON_CALLBACK',
      'client_id': config.instagramClientId
    };

    instagram.getProfilePicture = function (id) {
      var deferred = $q.defer();

      $http.jsonp(config.instagram + id, {params: params}).then(function(response){
        deferred.resolve(response.data.data.profile_picture);
      }, function(){
        deferred.resolve(config.defaultProfilePicture);
      });

      return deferred.promise;
    };

    instagram.getRecentMedia = function(id) {
      var deferred = $q.defer();

      $http.jsonp(config.instagram + id + '/media/recent/', {params: params}).then(function(response){
        deferred.resolve(response.data.data);
      }, function(){
        deferred.resolve(false);
      });

      return deferred.promise;
    };

    return instagram;

  }]);
