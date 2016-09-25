export default class LeaderboardCtrl {

  constructor($window, $firebaseArray, $firebaseObject, $stateParams, FacebookService, AppConstants) {
    'ngInject';

    let entityKeysRef = $window.firebase.database().ref()
      .child(AppConstants.localities)
      .child($stateParams.locality)
      .child($stateParams.type);

    let entitiesRef = $window.firebase.database().ref()
      .child(AppConstants.entities);

    let entityKeys = $firebaseArray(entityKeysRef);
    this.entities = [];

    entityKeys.$loaded().then((keys) => {

      keys.map((key) => {
        let entity = $firebaseObject(entitiesRef.child(key.$id));

        entity.$loaded((e) => {
          FacebookService.getProfileImage(e.facebook.userId).then((response) => {
            e.profileImage = response;
          }).finally(() => {
            this.entities.push(e);
          })
        });

      });

    });
  }

}