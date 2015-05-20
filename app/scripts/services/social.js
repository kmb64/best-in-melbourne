'use strict';

angular.module('bestInMelbourneApp')
  .service('Social', ['config', '$http', '$q', 'instagram', 'fb', function (config, $http, $q, instagram, fb) {

    var social = {};

    social.getProfilePicture = function(social) {

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

    social.getRecentMedia = function(social){

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

    social.assignProfilePicture = function(socialAccList){
      //angular.forEach(socialAccList, function(socialAcc){
      //  if(socialAcc.channel === 'instagram') {
      //    return instagram.getProfilePicture(socialAcc.userId);
      //  }
      //
      //});
      return instagram.getProfilePicture();
    };

    social.assignProfilePictures = function (places) {
      angular.forEach(places, function(place){
        console.log(place);
        social.assignProfilePicture(place.social).then(function(response){
          place.profilePicture = response;
        });
      });
    };

    social.getFBProfile = function(facebook) {
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
    };

    return social;

  }]);
