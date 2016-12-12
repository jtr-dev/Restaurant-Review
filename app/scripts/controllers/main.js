(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'restaurantFactory', '$uibModal', '$http', '$log', '$location', '$routeParams'];

  function MainController($scope, restaurantFactory, $uibModal, $http, $log, $routeParams, $location, ModalController) {
    var vm = this;

    var paramValue = $routeParams.id

    vm.getRating = function (num) {
      return new Array(num);
    }

    vm.search = '';
    vm.Restaurants = [];


    restaurantFactory.getRestaurants()
      .then(function (Restaurants) {
        vm.data = Restaurants[0].restaurants;
        console.log(vm.data)
      });

    $scope.myFunct = function (keyEvent) {
      if (keyEvent.which === 13) {
          vm.open(r, $index)
      } 
    };

    var ItemIndex = function (item) {
      return (vm.data.indexOf(item))
    }


    vm.open = function (restaurant, index) {

      var i = ItemIndex(restaurant)

      $uibModal.open({
        templateUrl: 'views/modal.html',
        controller: 'ModalController',
        controllerAs: 'vm',
        resolve: {
          restaurants: function () {
            vm.restaurants = {
              restaurant: vm.Restaurants[index],
              selected: i
            };
            return vm.restaurants;
          }
        }
      });
    };



  }


})();