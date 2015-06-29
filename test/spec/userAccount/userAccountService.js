'use strict';

describe('Service: User Account', function () {

  var stubUserAccount, mockWindow, mockFireBaseObject, mockQ, mockQDeferred;
  var loadedSuccessFn, loadedFailFn;

  var userAccount;

  beforeEach(module('bestInMelbourneApp'));

  beforeEach(function () {

    stubUserAccount = {
      uid: 'uid1234'
    };

    mockWindow = {
      Firebase: function () {}
    };

    mockFireBaseObject = function () {
      var $loaded = function (success, fail) {
        loadedSuccessFn = success;
        loadedFailFn = fail;
      };

      return {
        $loaded : $loaded
      };
    };

    mockQDeferred = jasmine.createSpyObj('mockQDeferred', ['resolve', 'reject']);

    mockQ = {
      defer: function () {
        return mockQDeferred;
      }
    };

    module(function ($provide) {
      $provide.value('$window', mockWindow);
      $provide.value('$firebaseObject', mockFireBaseObject);
      $provide.value('$q', mockQ);
    });

    inject(function ($injector) {
      userAccount = $injector.get('userAccount');
    });

  });

  it('should retrieve a users account with the correct Firebase reference', inject(function ($window, config) {
    spyOn($window, 'Firebase');
    userAccount.getAccount('1234');
    expect($window.Firebase).toHaveBeenCalledWith(config.firebase + 'userAccounts/' + '1234');
  }));

  it('should resolve a promise and return user account details', inject(function () {
    userAccount.getAccount('1234');
    loadedSuccessFn(stubUserAccount);
    expect(mockQDeferred.resolve).toHaveBeenCalledWith(stubUserAccount);
  }));

  it('should reject a promise if the call fails', inject(function () {
    userAccount.getAccount('1234');
    loadedFailFn(stubUserAccount);
    expect(mockQDeferred.reject).toHaveBeenCalled();
  }));

});
