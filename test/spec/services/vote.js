'use strict';

describe('Service: VoteService', function () {

  var place, mockWindow;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){
    place = {
      votes : 0
    };

    mockWindow = {
      localStorage: {
        getItem: function () {},
        setItem: function () {}
      }
    };

    module(function ($provide) {
      $provide.value('$window', mockWindow);
    });

  });

  it('should increment the number of votes for a burger place', inject(function (Vote) {
    Vote.updateVote(place);
    expect(place.votes).toEqual(1);
  }));

  it('should not update a places vote if the user doesn\'t have local storage', inject(function(Vote, $window){
    $window.localStorage = false;
    Vote.updateVote(place);
    expect(place.votes).toBe(0);
  }));

  it('should not update the votes if a user has already voted', inject(function(Vote, $window){
    spyOn($window.localStorage, 'getItem').and.returnValue(true);
    Vote.updateVote(place);
    expect(place.votes).toBe(0);
  }));

});
