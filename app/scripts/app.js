'use strict';

angular
  .module('app', [
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
    })
      .otherwise({
        redirectTo: '/'
      });
  });
