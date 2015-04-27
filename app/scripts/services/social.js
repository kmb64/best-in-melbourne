'use strict';

angular.module('bestInMelbourneApp')
  .service('Social', [function () {

    var getProfilePicture = function() {
      return 'http://blah.com/profile.png';
    };

    return {
      getProfilePicture : getProfilePicture
    };

  }]);
