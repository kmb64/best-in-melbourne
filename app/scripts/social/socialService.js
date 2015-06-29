'use strict';

angular.module('bestInMelbourneApp')
  .service('Social', ['config', '$http', '$q', 'instagram', 'fb', function (config, $http, $q, instagram, fb) {

    var social = {};

    social.getRecentMedia = function (instagramAcc) {
      return instagram.getRecentMedia(instagramAcc.userId);
    };

    social.assignProfilePicture = function(socialAccList) {
      var promise = false;
      angular.forEach(socialAccList, function(socialAcc){
        if(socialAcc.channel === 'instagram') {
          promise = instagram.getProfilePicture(socialAcc.userId);
        } else if (socialAcc.channel === 'facebook') {
          promise = fb.getProfilePicture(socialAcc.userId);
        }
      });
      return promise;
    };

    social.assignProfilePictures = function (places) {
      angular.forEach(places, function (place) {
        var promise = social.assignProfilePicture(place.social);
        if (promise) {
          promise.then(function (response) {
            place.profilePicture = response;
          }, function () {
            place.profilePicture = config.defaultProfilePicture;
          });
        } else {
          place.profilePicture = config.defaultProfilePicture;
        }
      });
    };

    social.getFBProfile = function (facebook) {
      return fb.getProfileInfo(facebook.userId);
    };

    return social;

  }]);
