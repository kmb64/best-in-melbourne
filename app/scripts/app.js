'use strict';

/**
 * @ngdoc overview
 * @name bestInMelbourneApp
 * @description
 * # bestInMelbourneApp
 *
 * Main module of the application.
 */
angular
  .module('bestInMelbourneApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/burgers', {
        templateUrl: 'views/burger.html',
        controller: 'BurgerCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/vote/:place', {
        templateUrl: 'views/vote.html',
        controller: 'VoteCtrl'
      })
      .otherwise({
        redirectTo: '/burgers'
      });
  });
