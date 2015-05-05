'use strict';

describe('Controller: BurgerCtrl', function () {

  // load the controller's module
  beforeEach(module('bestInMelbourneApp'));

  var MainCtrl,
    scope,
    firebaseArray,
    mockPlace,
    mockSocialService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    mockPlace = {
      social : [
        {instagram : 0}
      ]
    };

    mockSocialService = {
      getProfilePicture : function(){
        return {then:function(){}};
      }
    };

    firebaseArray = function(){
      return {
        $loaded : function(successCallback){
          successCallback([mockPlace]);
        }
      }
    };
    MainCtrl = $controller('PlaceCtrl', {
      $scope: scope,
      $firebaseArray : firebaseArray,
      Social : mockSocialService
    });
  }));

  it('should attach a list of places to the scope', function () {
    expect(scope.places).toEqual([mockPlace]);
  });
});
