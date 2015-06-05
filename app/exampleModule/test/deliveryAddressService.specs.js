'use strict';

describe('Delivery address service', function () {

  var stubConfig, stubDeliveryAddress, stubCookies;
  var stubHttp, stubHttpPromise, httpPromiseSuccessFn, httpPromiseFailureFn;
  var stubQ, stubQPromise, stubQDeferred;
  var deliveryAddressService;

  beforeEach(module('myPost.consumerAddressbook.deliveryAddress'));

  beforeEach(function () {
    stubConfig = {
      apiEndpoint: {}
    };

    stubDeliveryAddress = {
      nickname: 'nickname87234',
      address: 'delivery Address VIC 2734',
      contactName: 'contactName782934'
    };

    stubHttpPromise = {
      then: function (success, failure) {
        httpPromiseSuccessFn = success;
        httpPromiseFailureFn = failure;
      }
    };

    stubHttp = {
      post: function (first, second, third) {
        this.url = first;
        this.body = second;
        this.config = third;
        return stubHttpPromise;
      }
    };

    stubCookies = {};

    stubQPromise = {};

    stubQDeferred = jasmine.createSpyObj('stubQDeferred', ['resolve', 'reject']);
    stubQDeferred.promise = stubQPromise;

    stubQ = {
      defer: function () {
        return stubQDeferred;
      }
    };

    module(function ($provide) {
      $provide.value('config', stubConfig);
      $provide.value('$http', stubHttp);
      $provide.value('$cookies', stubCookies);
      $provide.value('$q', stubQ);
    });

    inject(function ($injector) {
      deliveryAddressService = $injector.get('deliveryAddressService');
    });
  });

  describe('add delivery address', function () {
    it('should use configured end point', function () {
      var endpoint = 'deliveryAddresss892734';
      stubConfig.apiEndpoint.deliveryAddress = endpoint;

      deliveryAddressService.add(stubDeliveryAddress);
      expect(stubHttp.url).toBe(endpoint + '/add');
    });

    it('should resolve promise when delivery address is added', function () {
      deliveryAddressService.add(stubDeliveryAddress);
      httpPromiseSuccessFn();
      expect(stubQDeferred.resolve).toHaveBeenCalled();
    });

    it('should reject promise when delivery address is not added', function () {
      deliveryAddressService.add(stubDeliveryAddress);
      httpPromiseFailureFn();
      expect(stubQDeferred.reject).toHaveBeenCalled();
    });

    describe('request body', function () {
      it('should set the name', function () {
        var expected = 'name892734';
        stubDeliveryAddress.nickname = expected;
        deliveryAddressService.add(stubDeliveryAddress);
        expect(stubHttp.body.name).toBe(expected);
      });

      it('should set the addressee', function () {
        var expected = 'addressee892734';
        stubDeliveryAddress.contactName = expected;
        deliveryAddressService.add(stubDeliveryAddress);
        expect(stubHttp.body.addressee).toBe(expected);
      });

      it('should set the type', function () {
        deliveryAddressService.add(stubDeliveryAddress);
        expect(stubHttp.body.type).toBe('DLV');
      });

      it('should set the country name', function () {
        deliveryAddressService.add(stubDeliveryAddress);
        expect(stubHttp.body.countryName).toBe('Australia');
      });

      it('should set the country code', function () {
        deliveryAddressService.add(stubDeliveryAddress);
        expect(stubHttp.body.countryCode).toBe('AU');
      });

      describe('address', function () {
        beforeEach(function () {
          stubDeliveryAddress.address = '790 Inverness Drive Mcdonough VIC 3025';
        });

        it('should set line1', function () {
          deliveryAddressService.add(stubDeliveryAddress);
          expect(stubHttp.body.address.line1).toBe('790 Inverness Drive');
        });

        it('should set suburb', function () {
          deliveryAddressService.add(stubDeliveryAddress);
          expect(stubHttp.body.address.suburb).toBe('Mcdonough');
        });

        it('should set state', function () {
          deliveryAddressService.add(stubDeliveryAddress);
          expect(stubHttp.body.address.state).toBe('VIC');
        });

        it('should set postcode', function () {
          deliveryAddressService.add(stubDeliveryAddress);
          expect(stubHttp.body.address.postcode).toBe('3025');
        });
      });
    });
  });
});
