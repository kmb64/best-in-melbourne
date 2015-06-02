'use strict';

describe('Service: VoteService', function () {

  var mockWindow;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){

    //mockFirebaseArray = function(){
    //  return {
    //    $loaded : function(){
    //
    //    }
    //  }
    //};

    mockWindow = {
      Firebase : function(){}
    };

    module(function ($provide) {
      $provide.constant('$window', mockWindow);
    });

    //need user id, place id --> website or facebook id?? place type

    //first need to check if that user id has voted for place id before

    //if they have return message ==> Looks like you've already voted for this place!

    //if they haven't save place id in there favourites update place vote count return message --> Thanks for voting!

  });

  it('should check if a user has voted for a particular place before', inject(function (vote, $window) {
    spyOn($window.Firebase);
    vote.hasUserVotedForPlace('useId1234', 'placeId1234', 'burgerPlaceType');
    expect($firebaseArray.toHaveBeenCalledWith)

  }));

});
