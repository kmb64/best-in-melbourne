import CustomerService from './customer.service';

export default angular.module('app.services', [])
  .service('customerService', CustomerService).name;