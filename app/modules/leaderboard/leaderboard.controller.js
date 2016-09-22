export default class PlacesCtrl {

  constructor($window, $firebaseArray, $firebaseObject, $stateParams, FacebookService) {
    'ngInject';

    this.$window = $window;
    this.FacebookService = FacebookService;

    let entityKeysRef = $window.firebase.database().ref()
      .child('localities')
      .child($stateParams.locality)
      .child($stateParams.type);

    let entitiesRef = $window.firebase.database().ref()
      .child('entities');

    let entityKeys = $firebaseArray(entityKeysRef);
    this.entities = [];

    entityKeys.$loaded().then((keys) => {

      keys.map((key) => {
        let entity = $firebaseObject(entitiesRef.child(key.$id));

        entity.$loaded((e) => {
          this.FacebookService.getProfileImage(e.facebook.userId).then((response) => {
            e.profileImage = response;
          }).finally(() => {
            this.entities.push(e);
          })
        });

      });

    });
  }


}