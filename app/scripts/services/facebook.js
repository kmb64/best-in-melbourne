'use strict';

angular.module('bestInMelbourneApp')
  .factory('fb', ['$window', '$q', function ($window, $q) {

    var fb = {};

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

    fb.getProfilePicture = function (id, params) {
      return _facebookApi('/' + id + '/picture', params);
    };

    return fb;

  }]);
