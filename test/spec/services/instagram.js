'use strict';

describe('Facebook Service', function () {

  var mockDeferred;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function () {

    mockDeferred = {
      reject: function () {
      },
      resolve: function () {
      },
      promise: {}
    };
  });

  it('should call the correct instagram api endpoint to retrieve a place\'s profile picture', inject(function (instagram, $http, config) {
    var id = '1234';
    spyOn($http, 'jsonp');
    instagram.getProfilePicture(id);
    expect($http.jsonp).toHaveBeenCalledWith(config.instagram + id, jasmine.any(Object));
  }));

  it('should call the instagram api with the correct parameters', inject(function (instagram, $http, config) {
    spyOn($http, 'jsonp');
    instagram.getProfilePicture();
    expect($http.jsonp).toHaveBeenCalledWith(jasmine.any(String), {
      'callback' : 'JSON_CALLBACK',
      'client_id' : config.instagramClientId
    });
  }));

});
