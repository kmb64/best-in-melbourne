'use strict';

angular.module('bestInMelbourneApp')
  .service('Vote', ['$window', function ($window) {

    var updateVote = function (place) {
      if(hasLocalStorage() && !hasVoted()) {
        place.votes += 1;
        setVoted();
      }
      return place;
    };

    var hasLocalStorage = function(){
      return ($window.localStorage);
    };

    var hasVoted = function(){
      return $window.localStorage.getItem('burger');
    };

    var setVoted = function(){
      return $window.localStorage.setItem('burger', {'voted': 1});
    };


    return {
      updateVote: updateVote
    };

  }]);
