'use strict';

angular.module('myPost.consumerAddressbook.deliveryAddress').service('deliveryAddressService',
    [
      '$http', '$cookies', 'config', '$q',
      function ($http, $cookies, config, $q) {

        /**
         * Temporary function to parse '32 Beach Rd Portsea VIC 3029' into its component parts.
         * Will be replaced by QAS data and/or manual data entry.
         */
        var parseAddressString = function (input) {
          var parts = /(.*) (\w*) ([A-Z]{3}) (\d{4})/.exec(input);

          /* Csongor talked with Julian. J. said that this temporal solution should be used until the QAS is introduced.
          */
          if (parts === null) {
            return {
              line1: input,
              suburb: '',
              state: '',
              postcode: ''
            };
          } else {
            return {
              line1: parts[1],
              suburb: parts[2],
              state: parts[3],
              postcode: parts[4]
            };
          }
        };

        var add = function (deliveryAddress) {

          var body = {
            name: deliveryAddress.nickname,
            address: parseAddressString(deliveryAddress.address),
            addressee: deliveryAddress.contactName,
            type: 'DLV',
            countryName: 'Australia',
            countryCode: 'AU'
          };

          var url = config.apiEndpoint.deliveryAddress + '/add';

          var deferred = $q.defer();
          $http.post(url, body).then(
              function () {
                deferred.resolve();
              },
              function () {
                deferred.reject();
              });

          return deferred.promise;
        };

        return {
          add: add
        };
      }
    ]);
