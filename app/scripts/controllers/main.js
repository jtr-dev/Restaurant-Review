(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$uibModal', ];

  function MainController($scope, $uibModal, ModalController, $log) {
    var vm = this;

    vm.hello = 'Hello world';

    vm.getRating = function (num) {
      return new Array(num);
    }



  
    
    vm.open = function (restaurant) {

        var modalInstance = $uibModal.open({
        templateUrl: 'views/modal.html',
        controller: 'ModalController',
        controllerAs: 'vm',
        resolve: {
            restaurant: function () {
                vm.restaurant = vm.data[0].restaurants[restaurant];
                return vm.restaurant;
                
            }
        }
    });



  };


   

    vm.data = [
      {
        title: 'Restaurant viewer',
        restaurants: [{
          name: "FooBar",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere vehicula justo, blandit luctus nibh rhoncus in. Curabitur eget arcu et arcu tincidunt efficitur vitae at nisi. Aenean ullamcorper ligula ultricies libero commodo euismod. Vestibulum quis efficitur ex, sed luctus nisl.",
          rating: 4,
          image: "https://dummyimage.com/600x400/3d3c3d/ffffff.png",
          location: {
            country: "England",
            city: "Bristol"
          }
        }, {
          name: "LoremBar",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere vehicula justo, blandit luctus nibh rhoncus in. Curabitur eget arcu et arcu tincidunt efficitur vitae at nisi. Aenean ullamcorper ligula ultricies libero commodo euismod. Vestibulum quis efficitur ex, sed luctus nisl.",
          rating: 3,
          image: "https://dummyimage.com/600x400/3d3c3d/ffffff.png",
          location: {
            country: "America",
            city: "New York City"
          }
        }, {
          name: "IpsumBar",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere vehicula justo, blandit luctus nibh rhoncus in. Curabitur eget arcu et arcu tincidunt efficitur vitae at nisi. Aenean ullamcorper ligula ultricies libero commodo euismod. Vestibulum quis efficitur ex, sed luctus nisl.",
          rating: 2,
          image: "https://dummyimage.com/600x400/3d3c3d/ffffff.png",
          location: {
            country: "Germany",
            city: "Berlin"
          }
        }, {
          name: "BarBar",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere vehicula justo, blandit luctus nibh rhoncus in. Curabitur eget arcu et arcu tincidunt efficitur vitae at nisi. Aenean ullamcorper ligula ultricies libero commodo euismod. Vestibulum quis efficitur ex, sed luctus nisl.",
          rating: 4,
          image: "https://dummyimage.com/600x400/3d3c3d/ffffff.png",
          location: {
            country: "France",
            city: "Paris"
          }
        }]
      }
    ]


  }


})();