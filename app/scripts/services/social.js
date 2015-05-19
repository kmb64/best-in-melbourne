'use strict';

angular.module('bestInMelbourneApp')
  .service('Social', ['config', '$http', '$q', 'instagram', function (config, $http, $q, instagram) {

    var getProfilePicture = function(social) {

      var deferred = $q.defer();

      var mediaSource = config.profilePicture[social.channel](social.userId),
        url = mediaSource.endPoint,
        params = mediaSource.params;

      params.callback = 'JSON_CALLBACK';

      $http.jsonp(url, {params: params}).then(function(response){
        deferred.resolve(response.data.data[mediaSource.accessor]);
      },function(){
        deferred.resolve('default image link?');
      });

      return deferred.promise;
    };

    var getRecentMedia = function(social){

      var deferred = $q.defer();

      var mediaSource = config.recentMedia[social.channel](social.userId),
        url = mediaSource.endPoint,
        params = mediaSource.params;

      params.callback = 'JSON_CALLBACK';

      $http.jsonp(url, {params: params}).then(function(response){
        deferred.resolve(response.data.data);
      },function(){
        deferred.resolve('default image link?');
      });

      return deferred.promise;

    };

    var assignProfilePictures = function (places) {
      angular.forEach(places, function(place){
        instagram.getProfilePicture(place.social[0]).then(function(response){
          place.profilePicture = response;
        });

      });
    };

    return {
      getProfilePicture : getProfilePicture,
      getRecentMedia : getRecentMedia,
      assignProfilePictures : assignProfilePictures,
      getFBProfile: function(facebook) {
        var deferred = $q.defer();
        FB.api('/' + facebook.userId, {

        }, function(response) {
          if (!response || response.error) {
            deferred.reject('Error occured');
          } else {
            deferred.resolve(response);
          }
        });
        return deferred.promise;
      }
    };

  }]);
