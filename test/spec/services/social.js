'use strict';

describe('Service: SocialService', function () {

  var mockSocial;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){

    //module(function ($provide) {
    //  $provide.value('$window', mockWindow);
    //});

    mockSocial = {
      channel: 'twitter',
      name: 'bestburgers',
      link: "https://twitter.com/bestburgers/",
      userId: "123abc"
    };

  });

  it('should retrieve a places profile picture for a given social media user id', inject(function(Social){
    var profilePictureLink = Social.getProfilePicture(mockSocial);
    expect(profilePictureLink).toBe('http://blah.com/profile.png');
  }));

});
