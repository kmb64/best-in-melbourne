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
    'ngRoute',
    'firebase'
  ])
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/:city/:type', {
        templateUrl: 'views/place.html',
        controller: 'PlaceCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/:city/:type/vote/:place', {
        templateUrl: 'views/vote.html',
        controller: 'VoteCtrl'
      })
      .otherwise({
        redirectTo: '/melbourne/burger'//Default to melbourne's burger places :)
      });
  }).run(['$window', function($window){

    $window.fbAsyncInit = function() {
      // Executed when the SDK is loaded
      FB.init({
        appId: '743407799109108',
        /*
         Adding a Channel File improves the performance
         of the javascript SDK, by addressing issues
         with cross-domain communication in certain browsers.
         */
        channelUrl: 'app/channel.html',
        status: true,
        cookie: true,
        xfbml: true
      });
    };

    (function(d){
      // load the Facebook javascript SDK

      var js,
        id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];

      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";

      ref.parentNode.insertBefore(js, ref);

    }(document));



  }]);
