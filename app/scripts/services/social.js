'use strict';

angular.module('bestInMelbourneApp')
  .service('Social', ['config', '$http', '$q', function (config, $http, $q) {

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

    return {
      getProfilePicture : getProfilePicture
    };

  }]);
