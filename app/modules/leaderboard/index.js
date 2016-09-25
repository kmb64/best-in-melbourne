import LeaderboardConfig from './leaderboard.config';
import LeaderboardCtrl from './leaderboard.controller';

export default angular.module('app.leaderboard', [])
  .config(LeaderboardConfig)
  .controller('LeaderboardCtrl', LeaderboardCtrl).name;
