'use strict';

describe('Service: VoteService', function () {

  var place;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){
    place = {
      votes : 0
    };

    module(function ($provide) {
      $provide.value('$window', {
        localStorage: {
          getItem: function () {},
          setItem: function () {}
        }
      });
    });

  });

  it('should allow increment the number of votes for a burger place', inject(function (Vote, $window) { //parameter name = service name

    //$window.localStorage = true;
    Vote.updateVote(place);
    expect(place.votes).toEqual(1);

  }));

  it('should not update a places vote if the user doesn\'t have local storage', inject(function(Vote, $window){

    $window.localStorage = false;
    //spyOn($window, 'localStorage').and.returnValue(false);
    //console.log($window.localStorage());
    //console.log(delete $window.localStorage);
    //typeof($window.localStorage) = 'undefined';
    //$window.localStorage = false;
    //console.log($window.localStorage);
    //Vote.hasLocalStorage = function(){
    //  console.log('called');
    //  return false;
    //};
    //spyOn(Vote, 'hasLocalStorage').and.returnValue(true);
    //$window.localStorage = function(){return 'undefined';};
    //console.log($window.localStorage);
    //$window.localStorage = false;
    console.log(Vote);
    Vote.updateVote(place);
    expect(place.votes).toBe(0);
  }));

  xit('should not update the votes if a user has already voted', inject(function(Vote, $window){
    $window.localStorage = function(){

    };
    Vote.updateVote(place);
    expect(place.votes).toBe(0);
  }));

});
