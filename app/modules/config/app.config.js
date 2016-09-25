function AppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'layout/app-view.html'
    });

  $urlRouterProvider.otherwise('/burger/melbourne');

}

export default AppConfig;
