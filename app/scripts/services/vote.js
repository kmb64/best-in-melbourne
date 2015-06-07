'use strict';

angular.module('bestInMelbourneApp')
  .factory('vote', [function () {

    var voteService = {};

    var _hasUserVotedForPlace = function (userAccount, city, placeType, placeId) {
      var voted;
      try {
        voted = userAccount['favourites'][city][placeType][placeId];
      }
      catch (e) {
        voted = false;
      }
      return voted;
    };

    voteService.confirmVote = function (userAccount, place, city, placeType) {
      var confirmationMessage;
      if(!_hasUserVotedForPlace(userAccount, city, placeType, place.$id)) {
        place.votes += 1;
        confirmationMessage = 'Thank you for voting for ' + place.title;
      } else {
        confirmationMessage = 'Looks like you\'ve already voted for ' + place.title;
      }
      return confirmationMessage;
    };
    return voteService;
  }]);
