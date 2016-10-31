(function () {


    angular
        .module('app')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$uibModalInstance', 'restaurant']
    function ModalController($uibModalInstance, restaurant) {
        var vm = this;
        vm.restaurant = restaurant;

        vm.getRating = function (num) {
            return new Array(num);
        }

        vm.ok = function(){
            $uibModalInstance.close('ok')
        }

        vm.cancel = function(){
            $uibModalInstance.dismiss('cancel')
        }

    }
})();

