'use strict';

angular.module('bestInMelbourneApp')
  .constant('config', {

    firebase : 'https://vivid-inferno-5850.firebaseio.com/',

    instagram : {
      clientId : '0a5a8e73d67249a8bb13f00948c9a864'
    },

    profilePicture : {
      instagram : function(userId){
        return {
          endPoint : 'https://api.instagram.com/v1/users/' + userId,
          params :{'client_id' : '0a5a8e73d67249a8bb13f00948c9a864'},
          accessor : 'profile_picture'

        }
      },
      facebook : function(userId){
        return {
          endPoint : 'https://graph.facebook.com/v2.3/' + userId + '/picture',
          params : {redirect : false ,width :150},
          accessor : 'url'
        }
      }
    }
  });
