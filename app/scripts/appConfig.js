'use strict';

angular.module('bestInMelbourneApp')
  .constant('config', {
    profilePicture : {
      instagram : 'https://api.instagram.com/v1/users/'+'clientID'+'?client_id=0a5a8e73d67249a8bb13f00948c9a864&callback=JSON_CALLBACK',
      facebook : '',
      twitter : '',
      pinterest : ''
    }
  });
