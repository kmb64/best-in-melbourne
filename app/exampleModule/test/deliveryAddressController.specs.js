'use strict';

describe('Delivery address controller', function () {

  var stubDeliveryAddress, stubDeliveryAddressService;
  var stubScope, stubLocation, stubPromise;

  beforeEach(module('myPost.consumerAddressbook.deliveryAddress'));

  beforeEach(inject(function ($controller) {
    stubScope = {
      deliveryAddressForm : {}
    };

    stubPromise = {
      then: function (success) {
        this.successFn = success;
      }
    };

    stubDeliveryAddressService = {
      add: function () {
        return stubPromise;
      }
    };
    spyOn(stubDeliveryAddressService, 'add').and.callThrough();

    stubDeliveryAddress = {
      nickname: 'nickname87234',
      address: '32 Beach Rd Portsea VIC 3029',
      contactName: 'contactName782934'
    };

    stubLocation = jasmine.createSpyObj('stubLocation', ['path', 'replace']);

    $controller('deliveryAddressController', {
      '$scope': stubScope,
      '$location': stubLocation,
      'deliveryAddressService': stubDeliveryAddressService
    });
  }));

  it('should call service to save delivery address', function () {
    stubScope.deliveryAddress = stubDeliveryAddress;
    stubScope.addAddress();
    expect(stubDeliveryAddressService.add).toHaveBeenCalledWith(stubDeliveryAddress);
  });

  it('should forward to address book page on success', function () {
    stubScope.addAddress();
    stubPromise.successFn();
    expect(stubLocation.path).toHaveBeenCalledWith('/address');
  });

  it('should replace the entry in the browser history so the user can\'t use browser back to return to the entry form', function () {
    stubScope.addAddress();
    stubPromise.successFn();
    expect(stubLocation.replace).toHaveBeenCalled();
  });

  it('should not submit the form if it is invalid', function () {
    stubScope.deliveryAddressForm.$invalid = true;
    stubScope.addAddress();
    expect(stubDeliveryAddressService.add).not.toHaveBeenCalled();
  });
});
