export default function PlacesConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.places', {
      url: '/',
      controller: 'PlacesCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'places/places.html',
      title: 'Places'
    });

}