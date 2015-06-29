'use strict';

describe('Facebook Service', function () {

  var mockWindow, fbCallback, mockDeferred, mockPromise, successCallback, failCallback;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function () {

    mockWindow = {
      FB: {
        api: function (path, params, callback) {
          fbCallback = callback;
        }
      }
    };

    mockPromise = {
      then : function(success, fail) {
        successCallback = success;
        failCallback = fail;
      }
    };

    mockDeferred = {
      reject: function () {
      },
      resolve: function () {
      },
      promise: mockPromise
    };

    module(function ($provide) {
      $provide.constant('$window', mockWindow);
    });
  });

  it('should call the correct facebook api endpoint to retrieve a place\'s profile picture', inject(function (fb, $window) {
    spyOn($window.FB, 'api');
    fb.getProfilePicture('1234');
    expect($window.FB.api).toHaveBeenCalledWith('/1234/picture', jasmine.any(Object), jasmine.any(Function));
  }));

  it('should call the correct facebook api endpoint to retrieve a place\'s profile information', inject(function (fb, $window) {
    spyOn($window.FB, 'api');
    fb.getProfileInfo('6346');
    expect($window.FB.api).toHaveBeenCalledWith('/6346', jasmine.any(Object), jasmine.any(Function));
  }));

  it('should reject the promise if facebook returns an error', inject(function (fb, $q) {
    spyOn($q, 'defer').and.returnValue(mockDeferred);
    spyOn(mockDeferred, 'reject');

    fb.getProfilePicture();
    fbCallback({error: true});

    expect(mockDeferred.reject).toHaveBeenCalled();
  }));

  it('should reject the promise if facebook returns a falsy response', inject(function (fb, $q) {
    spyOn($q, 'defer').and.returnValue(mockDeferred);
    spyOn(mockDeferred, 'reject');

    fb.getProfilePicture();
    fbCallback('');

    expect(mockDeferred.reject).toHaveBeenCalled();
  }));

  it('should resolve the promise if facebook returns a successful response', inject(function (fb, $q) {
    spyOn($q, 'defer').and.returnValue(mockDeferred);
    spyOn(mockDeferred, 'resolve');

    fb.getProfilePicture();
    fbCallback('success');

    expect(mockDeferred.resolve).toHaveBeenCalledWith('success');
  }));

  it('should return a promise', inject(function (fb, $q) {
    spyOn($q, 'defer').and.returnValue(mockDeferred);
    var promise = fb.getProfileInfo();
    expect(promise).toBe(mockDeferred.promise);
  }));

});
