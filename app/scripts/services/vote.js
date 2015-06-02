'use strict';

angular.module('bestInMelbourneApp')
  .factory('vote', [function () {

    var voteService = {};

    voteService.hasUserVotedForPlace = function (userAccount, city, placeType, placeId) {
      var voted;
      try {
        voted = userAccount['favourites'][city][placeType][placeId];
      }
      catch (e) {
        voted = false;
      }

      return voted;
    };

    return voteService;


  }]);
