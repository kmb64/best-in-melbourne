'use strict';

describe('Service: FacebookService', function () {

  var mockWindow, fbCallback, mockDeferred;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){

    mockWindow = {
      FB : {
        api : function(path, params, callback){
          fbCallback = callback;
        }
      }
    };

    mockDeferred = {
      reject : function(){},
      resolve : function(){},
      promise : {}
    };

    module(function ($provide) {
      $provide.constant('$window', mockWindow);
    });
  });

  it('should call the correct facebook api endpoint to retrieve a place\'s profile picture', inject(function(fb, $window){
    spyOn($window.FB, 'api');
    fb.getProfilePicture('1234');
    expect($window.FB.api).toHaveBeenCalledWith('/1234/picture', jasmine.any(Object), jasmine.any(Function));
  }));

  it('should reject the promise if facebook returns an error', inject(function(fb, $q){
    spyOn($q, 'defer').and.returnValue(mockDeferred);
    spyOn(mockDeferred, 'reject');

    fb.getProfilePicture();
    fbCallback({error : true});

    expect(mockDeferred.reject).toHaveBeenCalled();
  }));

  it('should reject the promise if facebook returns a falsy response', inject(function(fb, $q){
    spyOn($q, 'defer').and.returnValue(mockDeferred);
    spyOn(mockDeferred, 'reject');

    fb.getProfilePicture();
    fbCallback('');

    expect(mockDeferred.reject).toHaveBeenCalled();
  }));

  it('should resolve the promise if facebook returns a successful response', inject(function(fb, $q){
    spyOn($q, 'defer').and.returnValue(mockDeferred);
    spyOn(mockDeferred, 'resolve');

    fb.getProfilePicture();
    fbCallback('success');

    expect(mockDeferred.resolve).toHaveBeenCalledWith('success');
  }));


});
