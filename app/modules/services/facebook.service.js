export default class FacebookService {

  constructor($window, $q) {
    'ngInject';

    this.$window = $window;
    this.$q = $q;

  }

  getProfileImage(facebookId) {

    let params = {redirect: false, width: 150};

    let deferred = this.$q.defer();

    this.$window.FB.api(`/${facebookId}/picture`, params, (response) => {
      if (!response || response.error) {
        deferred.reject(false);
      } else {
        deferred.resolve(response.data.url);
      }
    });

    return deferred.promise;

  }

}