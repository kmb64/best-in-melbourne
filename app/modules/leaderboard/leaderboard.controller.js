export default class PlacesCtrl {

  constructor($scope, $firebaseArray, $window, $q) {
    'ngInject';

    // var ref = firebase.database().ref().child('identities').child('1');
    // var identitiy = $firebaseObject(ref);
    // identitiy.$bindTo($scope, "identity");

    var _facebookCallback = function (response, deferred) {
      if (!response || response.error) {
        deferred.reject(false);
      } else {
        deferred.resolve(response);
      }
    };

    var _facebookApi = function (url, params) {
      params = (typeof params === 'undefined') ? {} : params;
      var deferred = $q.defer();
      $window.FB.api(url, params, function (response) {
        _facebookCallback(response, deferred);
      });
      return deferred.promise;
    };

    let ref = firebase.database().ref().child('melbourne').child('burger');
    $firebaseArray(ref).$loaded(function (places) {
      $scope.places = places;

      angular.forEach($scope.places, function (place) {


        _facebookApi('/' + place.social.facebook.userId + '/picture', profilePicParams).then(function(response){
          place.profilePicture = response.data.url;
          console.log(place);
        }, function(){
          // deferred.resolve(config.defaultProfilePicture);
        });

      });
    });

    var profilePicParams = {redirect : false ,width :150};






  }


}