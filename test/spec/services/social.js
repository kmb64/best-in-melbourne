'use strict';

describe('Service: SocialService', function () {

  var mockSocial, mockConfig, mockHttp;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){

    mockConfig = {
      profilePicture : {
        facebook : 'www.facebook.com',
        twitter : 'www.twitter.com',
        instagram : 'www.instagram.com'
      }
    };

    mockSocial = {
      channel: 'twitter',
      name: 'bestburgers',
      link: "https://twitter.com/bestburgers/",
      userId: "123abc"
    };

    mockHttp = {
      jsonp : function(){}
    };

    module(function ($provide) {
      $provide.constant('config', mockConfig);
    });

    module(function($provide){
      $provide.value('$http', mockHttp);
    });

  });

  it('should call a social media endpoint to get a profile picture link', inject(function(Social, config, $http){
    spyOn($http, 'jsonp');
    Social.getProfilePicture(mockSocial);
    expect($http.jsonp).toHaveBeenCalledWith(mockConfig.profilePicture.twitter);
  }));

});
