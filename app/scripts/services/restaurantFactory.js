(function () {
    'use strict';

    angular
        .module('app')
        .factory('restaurantFactory', restaurantFactory);

    restaurantFactory.$inject = ['$http'];
    function restaurantFactory($http) {
        var api = {};

        api.getRestaurants = getRestaurants;
        api.getReviews = getReviews;


        var baseUrl = "https://restaurantdb.azurewebsites.net"

        function getRestaurants() {
            return $http.get(baseUrl + '/restaurants').then(handleSuccess, handleError('Error getting all users'));
        }

        function getReviews() {
            return $http.get(baseUrl + '/reviews').then(handleSuccess, handleError('Error getting all users'));
        }
        
        
        
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        return api;
        ////////////////


    }
})();