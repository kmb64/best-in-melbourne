'use strict';

describe('Service: SocialService', function () {

  var mockSocial,
    mockConfig,
    mockHttp,
    mockPromise,
    successCallback,
    failCallback,
    mockInstagram,
    mockFacebook;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){

    mockSocial = {
      channel: 'instagram',
      name: 'bestburgers',
      link: "https://twitter.com/bestburgers/",
      userId: "123abc"
    };

    mockConfig = {
      profilePicture : {
        instagram : function(){
          return {
            endPoint : 'instagram.com',
            params : {blah : 1234},
            accessor : 'profile_picture'
          };
        }
      }
    };

    mockHttp = {
      jsonp : function(){}
    };

    mockPromise = {
      then : function(success, fail){
        successCallback = success;
        failCallback = fail;
      }
    };

    mockInstagram = {
      getProfilePicture : function(){}
    };

    mockFacebook = {
      getProfilePicture : function(){}
    };

    module(function ($provide) {
      $provide.constant('config', mockConfig);
      $provide.constant('instagram', mockInstagram);
      $provide.constant('fb', mockFacebook);
    });

  });

  it('should apply a default image link if a place has no valid social accounts', inject(function(Social){
    var places = [
      {social : [{channel : 'badsocial'}]}
    ];

    spyOn(Social, 'assignProfilePicture').and.returnValue(false);
    Social.assignProfilePictures(places);
    expect(places[0].profilePicture).toBe('default image link?');
  }));

  it('should apply a default image link if the promise is rejected', inject(function(Social){
    var places = [
      {social : [{channel : 'instagram is down'}]}
    ];

    spyOn(Social, 'assignProfilePicture').and.returnValue(mockPromise);
    Social.assignProfilePictures(places);
    failCallback();
    expect(places[0].profilePicture).toBe('default image link?');
  }));

  it('should take a list of places and assign the appropriate profile pictures', inject(function(Social, instagram){
    var places = [
      {social : [{channel : 'instagram'}]}
    ];

    spyOn(Social, 'assignProfilePicture').and.returnValue(mockPromise);
    Social.assignProfilePictures(places);
    successCallback('profile_picture.jpeg');
    expect(places[0].profilePicture).toBe('profile_picture.jpeg');
  }));

  it('should first look for an instagram account to get a profile picture', inject(function(Social, instagram){
    var socialAccList = [
      {channel: 'facebook'},
      {channel: 'instagram'}
    ];

    spyOn(instagram, 'getProfilePicture');
    Social.assignProfilePicture(socialAccList);
    expect(instagram.getProfilePicture).toHaveBeenCalled();

  }));

  it('should look to get a facebook account profile picture if a place has no instagram', inject(function(Social, instagram, fb){
    var socialAccList = [
      {channel: 'facebook'}
    ];

    spyOn(fb, 'getProfilePicture');
    Social.assignProfilePicture(socialAccList);
    expect(fb.getProfilePicture).toHaveBeenCalled();

  }));

  it('should not assign an instagram profile picture if the place has no instagram account', inject(function(Social, instagram){
    spyOn(instagram, 'getProfilePicture');
    Social.assignProfilePicture({channel : 'notinstagram'});
    expect(instagram.getProfilePicture).not.toHaveBeenCalled();
  }));

  it('should call a the instagram api to get a profile picture link', inject(function(Social, config, $http, $httpBackend, $rootScope){
    var resolvedValue;
    $httpBackend.whenJSONP('instagram.com?blah=1234&callback=JSON_CALLBACK').respond({ status :  200, data: {profile_picture : 'profilepic123'}});
    var promise = Social.getProfilePicture(mockSocial);
    $httpBackend.flush();

    // Simulate resolving of promise
    promise.then(function (response) {
      resolvedValue = response;
    });

    // Propagate promise resolution to 'then' functions using $apply().
    $rootScope.$apply();
    expect(resolvedValue).toBe('profilepic123');
  }));

});
