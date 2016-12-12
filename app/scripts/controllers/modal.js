(function () {


    angular
        .module('app')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$scope', '$uibModalInstance', 'restaurants', '$location']
    function ModalController($scope, $uibModalInstance, restaurants, $location) {
        var vm = this;
        vm.restaurant = restaurants.restaurant
        

        vm.getReviews = function(){
            vm.ok()
            $location.path(restaurants.selected)
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

