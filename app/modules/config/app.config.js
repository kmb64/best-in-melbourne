function AppConfig($stateProvider, $urlRouterProvider, $httpProvider) {
  'ngInject';

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'layout/app-view.html'
    });

  $urlRouterProvider.otherwise('/burger/melbourne');

}

export default AppConfig;
