'use strict';

/**
 * @ngdoc function
 * @name bestInMelbourneApp.controller:MainCtrl
 * @description
 * # BurgerCtrl
 * Controller of the bestInMelbourneApp
 */
angular.module('bestInMelbourneApp')
  .controller('BurgerCtrl', function ($scope) {
    $scope.places = [
      {
        title : 'Royale Brothers',
        votes : 13,
        website : {
          name : 'royalebrothers.com.au/',
          link : 'http://royalebrothers.com.au/'
        },
        social : {
          instagram : {
            name : 'theroyalebros',
            link : 'https://instagram.com/theroyalebros/'
          }
        },
        venues: [
          {
            address: 'Rear 1 Church Street',
            suburb: 'Brighton',
            state: 'VIC',
            postcode: '3186'
          }
        ]
      },
      {
        title : 'The Grand Trailer Park Taverna',
        votes : 4,
        website : {
          name : 'grandtrailerpark.com.au/',
          link : 'http://www.grandtrailerpark.com.au/'
        },
        social : {
          instagram : {
            name : 'grandtrailerpark',
            link : 'https://instagram.com/grandtrailerpark/'
          }
        },
        venues : [
          {
            address: '87 Bourke Street',
            suburb: 'Melbourne',
            state: 'VIC',
            postcode: '3000'
          }
        ]
      }
    ];
  });
