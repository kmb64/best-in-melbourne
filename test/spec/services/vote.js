'use strict';

describe('Service: VoteService', function () {

  var mockUserAccount;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){

    mockUserAccount = {
      favourites : {
        melbourne : {
          burger : [
            '0'
          ]
        },
        auckland : {

        }
      }
    };

    //module(function ($provide) {
    //  $provide.constant('$window', mockWindow);
    //});

    //need user id, place id --> website or facebook id?? place type

    //first need to check if that user id has voted for place id before

    //if they have return message ==> Looks like you've already voted for this place!

    //if they haven't save place id in there favourites update place vote count return message --> Thanks for voting!

  });

  it('should know if a user has voted for a particular place before', inject(function (vote) {
    var votedBefore = vote.hasUserVotedForPlace(mockUserAccount, 'melbourne', 'burger', '0');
    expect(votedBefore).toBeTruthy();
  }));

  it('should know if a user hasn\'t voted for a particular place before', inject(function (vote) {
    var votedBefore = vote.hasUserVotedForPlace(mockUserAccount, 'auckland', 'burger', '0');
    expect(votedBefore).toBeFalsy();
  }));

});
