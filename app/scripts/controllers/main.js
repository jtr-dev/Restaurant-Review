(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$uibModal', '$http', '$log', '$location', '$routeParams'];

  function MainController($scope, $uibModal, $http, $log, $routeParams, $location, ModalController) {
    var vm = this;

    var paramValue = $routeParams.id

    vm.getRating = function (num) {
      return new Array(num);
    }

    vm.search = '';    
    vm.Restaurants = [];



    function restaurantIndex(i) {
      $scope.current = i;
      $scope.next = i++;
      $scope.previous = i--;
    }
    function previousRestaurant() {
      vm.open($scope.previous)
    }
    function nextRestaurant() {
      vm.open($scope.next)
    }


    
      var ItemIndex = function(item){
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





    $http.get('storage/restaurants.json').success(function (data) {
      vm.data = data[0].restaurants;
    });

  }


})();