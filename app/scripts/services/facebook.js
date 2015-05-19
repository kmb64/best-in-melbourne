'use strict';

angular.module('bestInMelbourneApp')
  .factory('fb', ['$window', '$q', function ($window, $q) {

    return {
      getProfilePicture : function(id){

        var deferred = $q.defer();

        $window.FB.api('/' + id + '/picture', {}, function(response){
          if(!response || response.error) {
            deferred.reject();
          } else {
            deferred.resolve(response);
          }
        });

        return deferred.promise;
      }
    };

  }]);
