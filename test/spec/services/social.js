'use strict';

describe('Service: SocialService', function () {

  var mockSocial, mockConfig, mockHttp;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){

    mockConfig = {
      profilePicture : {
        instagram : function(){
          return {
            endPoint : 'instagram.com',
            params : {blah : 1234}
          };
        }
      }
    };

    mockSocial = {
      channel: 'instagram',
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
    expect($http.jsonp).toHaveBeenCalledWith('instagram.com', {params : {blah : 1234, callback : 'JSON_CALLBACK'}});
  }));

});
