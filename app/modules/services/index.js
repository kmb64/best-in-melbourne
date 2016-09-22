import FacebookService from './facebook.service';

export default angular.module('app.services', [])
  .service('FacebookService', FacebookService).name;