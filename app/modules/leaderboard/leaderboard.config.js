export default function LeaderboardConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.leaderboard', {
      url: '/:type/:locality',
      controller: 'LeaderboardCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'leaderboard/leaderboard.html'
    });

}