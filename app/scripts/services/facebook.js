'use strict';

angular.module('bestInMelbourneApp')
  .factory('fb', ['$window', '$q', function ($window, $q) {

    var fb = {};

    var profilePicParams = {redirect : false ,width :150};

    var _facebookCallback = function (response, deferred) {
      if (!response || response.error) {
        deferred.reject(false);
      } else {
        deferred.resolve(response);
      }
    };

    var _facebookApi = function (url, params) {
      params = (typeof params === 'undefined') ? {} : params;
      var deferred = $q.defer();
      $window.FB.api(url, params, function (response) {
        _facebookCallback(response, deferred);
      });
      return deferred.promise;
    };

    fb.getProfileInfo = function (id, params) {
      return _facebookApi('/' + id, params);
    };

    fb.getProfilePicture = function (id) {
      var deferred = $q.defer();
      _facebookApi('/' + id + '/picture', profilePicParams).then(function(response){
        deferred.resolve(response.data.url);
      }, function(){
        deferred.resolve('default image link?');
      });

      return deferred.promise;
    };

    return fb;

  }]);
