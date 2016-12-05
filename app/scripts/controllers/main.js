(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$uibModal','$http','$log', '$location', '$routeParams'];

  function MainController($scope, $uibModal, $http, $log, $routeParams, $location,  ModalController ) {
    var vm = this;
    
    var paramValue = $routeParams.id
    console.log(paramValue)

    vm.getRating = function (num) {
      return new Array(num);
    }

    function restaurantIndex(i) {
      $scope.current = i;
      $scope.next = i++;
      $scope.previous = i--;
    }
    function previousRestaurant () {
      console.log($scope.previous)
      vm.open($scope.previous)
  }
    function nextRestaurant(){
      console.log($scope.next)
      vm.open($scope.next)
    }

    vm.open = function (restaurant) {

      $uibModal.open({
        templateUrl: 'views/modal.html',
        controller: 'ModalController',
        controllerAs: 'vm',
        resolve: {
          restaurants: function () {
            vm.restaurants = {restaurants: vm.data[0].restaurants, selected: restaurant};
            restaurantIndex(restaurant)
            return vm.restaurants;
          }
        }
      });
    };


    $scope.myFunct = function (keyEvent) {
      if (keyEvent.which === 37) {
        previousRestaurant()
      }
      else if (keyEvent.which === 39) {
        nextRestaurant()
      }
    };





    $http.get('storage/restaurants.json').success(function(data) {
        vm.data = data;
    });

  }


})();