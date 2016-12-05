(function () {


    angular
        .module('app')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$scope', '$uibModalInstance', 'restaurants', '$location']
    function ModalController($scope, $uibModalInstance, restaurants, $location) {
        var vm = this;
        vm.restaurants = restaurants;
        var i = vm.restaurants.selected
        vm.restaurant = vm.restaurants.restaurants[i]
        

        vm.getReviews = function(i){
            console.log(vm.restaurants.selected)
            vm.ok()
            $location.path(vm.restaurants.selected)
        }

        vm.getRating = function (num) {
            return new Array(num);
        }

        vm.ok = function () {
            $uibModalInstance.close('ok')
        }

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel')
        }

            

    }
})();

