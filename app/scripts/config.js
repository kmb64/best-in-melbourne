'use strict';

angular.module('bestInMelbourneApp')
  .constant('config', {

    firebase: 'https://vivid-inferno-5850.firebaseio.com/',
    instagram: 'https://api.instagram.com/v1/users/',
    instagramClientId: '0a5a8e73d67249a8bb13f00948c9a864',

    recentMedia: {
      instagram: function (userId) {
        return {
          endPoint: 'https://api.instagram.com/v1/users/' + userId + '/media/recent/',
          params: {'client_id': '0a5a8e73d67249a8bb13f00948c9a864'}
        }
      }

    }
  });
