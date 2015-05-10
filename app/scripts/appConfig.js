'use strict';

var instagramClientId = '0a5a8e73d67249a8bb13f00948c9a864';

angular.module('bestInMelbourneApp')
  .constant('config', {

    firebase : 'https://vivid-inferno-5850.firebaseio.com/',

    recentMedia : {
      instagram : function(userId) {
        return {
          endPoint : 'https://api.instagram.com/v1/users/' + userId + '/media/recent/',
          params :{'client_id' : instagramClientId}
        }
      }

    },

    profilePicture : {
      instagram : function(userId){
        return {
          endPoint : 'https://api.instagram.com/v1/users/' + userId,
          params :{'client_id' : instagramClientId},
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
