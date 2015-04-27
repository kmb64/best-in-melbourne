'use strict';

describe('Controller: BurgerCtrl', function () {

  // load the controller's module
  beforeEach(module('bestInMelbourneApp'));

  var MainCtrl,
    scope,
    firebaseArray;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    firebaseArray = function(){
      return {
        $loaded : function(successCallback, failCallback){
          successCallback();
        }
      }
    };
    MainCtrl = $controller('BurgerCtrl', {
      $scope: scope,
      $firebaseArray : firebaseArray
    });
  }));

  it('should attach a list of burger places to the scope', function () {
    expect(scope.places).toEqual([0,1,2]);
  });
});
