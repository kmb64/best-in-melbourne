'use strict';

describe('Instagram Service', function () {

  var mockPromise, successCallback, failCallback;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function () {
    mockPromise = {
      then : function(success, fail) {
        successCallback = success;
        failCallback = fail;
      }
    }
  });

  it('should call the correct instagram api endpoint to retrieve a place\'s profile picture',
    inject(function (instagram, $http, config) {
    var id = '1234';
    spyOn($http, 'jsonp').and.returnValue(mockPromise);
    instagram.getProfilePicture(id);
    expect($http.jsonp).toHaveBeenCalledWith(config.instagram + id, jasmine.any(Object));
  }));

  it('should call the instagram api with the correct parameters', inject(function (instagram, $http, config) {
    spyOn($http, 'jsonp').and.returnValue(mockPromise);
    instagram.getProfilePicture();
    expect($http.jsonp).toHaveBeenCalledWith(jasmine.any(String), {params : {
      'callback' : 'JSON_CALLBACK',
      'client_id' : config.instagramClientId
    }});

  }));

  it('should return a the url of the place\'s profile picture', inject(function (instagram, $http) {
    spyOn($http, 'jsonp').and.returnValue(mockPromise);
    var profilePic = instagram.getProfilePicture();
    successCallback({
      data : {
        data : {
          profile_picture : 'instagram.com/1234/picture'
        }
      }
    });
    expect(profilePic.$$state.value).toBe('instagram.com/1234/picture');
  }));

  it('should return a default image url if the call to instagram fails for whatever reason', inject(function (instagram, $http) {
    spyOn($http, 'jsonp').and.returnValue(mockPromise);
    var profilePic = instagram.getProfilePicture();
    failCallback();
    expect(profilePic.$$state.value).toBe('default image link?');
  }));

  it('should call the correct instagram api endpoint to retrieve a place\'s recent media',
    inject(function (instagram, $http, config) {
      var id = '1234';
      spyOn($http, 'jsonp').and.returnValue(mockPromise);
      instagram.getRecentMedia(id);
      expect($http.jsonp).toHaveBeenCalledWith(config.instagram + id + '/media/recent/', jasmine.any(Object));
    }));

  it('should call the instagram recent media endpoint with the correct parameters', inject(function (instagram, $http, config) {
    spyOn($http, 'jsonp').and.returnValue(mockPromise);
    instagram.getRecentMedia();
    expect($http.jsonp).toHaveBeenCalledWith(jasmine.any(String), {params : {
      'callback' : 'JSON_CALLBACK',
      'client_id' : config.instagramClientId
    }});

  }));

  it('should return an object containing the place\'s recent media', inject(function (instagram, $http) {
    spyOn($http, 'jsonp').and.returnValue(mockPromise);
    var recentMedia = instagram.getRecentMedia();
    successCallback({
      data : {
        data : 'recent media'
      }
    });
    expect(recentMedia.$$state.value).toBe('recent media');
  }));

  it('should return false if a call for to the recent media instagram endpoint fails', inject(function (instagram, $http) {
    spyOn($http, 'jsonp').and.returnValue(mockPromise);
    var recentMedia = instagram.getRecentMedia();
    failCallback(false);
    expect(recentMedia.$$state.value).toEqual(false);
  }));

});
