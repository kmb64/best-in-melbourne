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
        social : [
          {
            channel: 'instagram',
            name: 'theroyalebros',
            link: 'https://instagram.com/theroyalebros/'
          }
        ],
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
        social : [
          {
            channel: 'instagram',
            name: 'grandtrailerpark',
            link: 'https://instagram.com/grandtrailerpark/'
          }
          ],
        venues : [
          {
            address: '87 Bourke Street',
            suburb: 'Melbourne',
            state: 'VIC',
            postcode: '3000'
          }
        ]
      },
      {
        title : 'Humburger',
        votes : 4,
        website : {
          name : 'humburger.com.au/',
          link : 'http://www.humburger.com.au/'
        },
        social : [
          {
            channel : 'instagram',
            name : 'humburgermelb',
            link : 'https://instagram.com/humburgermelb/'
          }
        ],
        venues : [
          {
            address: '789 Glenferrie Road',
            suburb: 'Hawthorn',
            state: 'VIC',
            postcode: '3122'
          }
        ]
      },
      {
        title : 'Brother Burger and The Marvellous Brew',
        votes : 8,
        website : {
          name : 'www.brotherburger.com.au/',
          link : 'http://www.brotherburger.com.au/'
        },
        social : [
          {
            channel : 'facebook',
            name : 'Brother Burger and The Marvellous Brew',
            link : 'http://www.facebook.com/brotherburger'
          }
        ],
        venues : [
          {
            address: '413 Brunswick Street',
            suburb: 'Fitzroy',
            state: 'VIC',
            postcode: '3065'
          }
        ]
      }
    ];
  });
