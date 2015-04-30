'use strict';

angular.module('bestInMelbourneApp')
  .service('Social', ['config', '$http', function (config, $http) {

    var getProfilePicture = function(social) {
      var url = config.profilePicture[social.channel];
      return $http.jsonp(url);
      //, {params :{'another' : 'queryparametre'}}
    };

    return {
      getProfilePicture : getProfilePicture
    };

  }]);
