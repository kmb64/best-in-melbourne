export default function PlacesConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.places', {
      url: '/',
      controller: 'PlacesCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'leaderboard/leaderboard.html',
      title: 'Places'
    });

}