'use strict';

describe('Service: User Account', function () {

  var mockUserAccount, mockWindow, mockFireBaseObject;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function(){

    mockWindow = {
      Firebase : function(){}
    };

    mockUserAccount = {
      uid: 'uid1234'
    };

    mockFireBaseObject = function(){
      return {$loaded : function(mockUserAccount){}}
    };

    module(function ($provide) {
      $provide.constant('$window', mockWindow);
      $provide.constant('$firebaseObject', mockFireBaseObject);
    });

  });

  it('should retrieve a users account with the correct Firebase reference',
    inject(function (userAccount, $window, $firebaseObject, config) {

      spyOn($window, 'Firebase');
      userAccount.getAccount('1234');
      expect($window.Firebase).toHaveBeenCalledWith(config.firebase + '1234');

    }));

});
