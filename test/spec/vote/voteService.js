'use strict';

describe('Service: VoteService', function () {

  var stubUserAccount, stubPlace;
  var mockUserAccountService;
  var vote;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function () {

    stubUserAccount = {
      favourites: {
        melbourne: {
          burger: [
            '0'
          ]
        },
        auckland: {}
      }
    };

    stubPlace = {};

    mockUserAccountService = {
      saveFavourite: function () {}
    };

    inject(function ($injector) {
      vote = $injector.get('vote');
    });

  });

  it('should update a places vote', function () {
    stubPlace.votes = 0;
    vote.confirmVote(stubUserAccount, stubPlace);
    expect(stubPlace.votes).toBe(1);
  });

  it('should not update a places vote if a user has voted for it already', function () {
    stubPlace.votes = 0;
    stubPlace.$id = 0;
    vote.confirmVote(stubUserAccount, stubPlace, 'melbourne', 'burger');
    expect(stubPlace.votes).toBe(0);
  });

  it('should return the correct confirmation message if a user attempts to vote for a place more than once', function () {
    stubPlace.title = 'Karl\'s Burger Place';
    stubPlace.$id = 0;
    var message = vote.confirmVote(stubUserAccount, stubPlace, 'melbourne', 'burger');
    expect(message).toBe('Looks like you\'ve already voted for ' + stubPlace.title);
  });

  it('should return the correct confirmation message once a place\'s vote is updated', function () {
    stubPlace.title = 'Karl\'s Burger Place';
    var message = vote.confirmVote(stubUserAccount, stubPlace, 'melbourne', 'burger');
    expect(message).toBe('Thank you for voting for ' + stubPlace.title);
  });

});
