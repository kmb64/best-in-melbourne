'use strict';

describe('Service: SocialService', function () {

  var mockSocial, mockConfig, mockHttp, mockPromise, successCallback;

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
      then : function(successCallback){
        successCallback();
      }
    };

    module(function ($provide) {
      $provide.constant('config', mockConfig);
    });

  });

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
