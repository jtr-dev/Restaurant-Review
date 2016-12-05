(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReviewController', ReviewController)
        .directive('starRating', starRating);

    function starRating() {
        return {
            restrict: 'EA',
            template:
            '<ul class="star-rating" ng-class="{readonly: readonly}">' +
            '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
            '    <i class="fa fa-star"></i>' + // or &#9733
            '  </li>' +
            '</ul>',
            scope: {
                ratingValue: '=ngModel',
                max: '=?', // optional (default is 5)
                onRatingSelect: '&?',
                readonly: '=?'
            },
            link: function (scope, element, attributes) {
                if (scope.max == undefined) {
                    scope.max = 5;
                }
                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };
                scope.toggle = function (index) {
                    if (scope.readonly == undefined || scope.readonly === false) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelect({
                            rating: index + 1
                        });
                    }
                };
                scope.$watch('ratingValue', function (oldValue, newValue) {
                    if (newValue) {
                        updateStars();
                    }
                });
            }
        };
    }

    ReviewController.$inject = ['$scope', '$http', '$routeParams', '$location'];
    function ReviewController($scope, $http, $routeParams, $location) {
        var vm = this;
        updateReviews()
        vm.ReviewForm = false;

        vm.Review = {
            restaurant_id: $routeParams.id,
            username: '',
            review: '',
            rating: 5,
        };

        vm.isReadonly = true;
        vm.rateFunction = function (rating) {
            console.log('Rating selected: ' + rating);
        };

        vm.getRating = function (num) {
            return new Array(num);
        }

        vm.submit = function (review) {
            vm.reviews.push(review);
            vm.Review = '';
        }


        $http.get('storage/restaurants.json').success(function (data) {
            vm.restaurant = data[0].restaurants[$routeParams.id];
            if (vm.restaurant === undefined) {
                location.pathname = ('404.html')
            }
        });
        function updateReviews() {
            $http.get('storage/reviews.json').success(function (data) {
                vm.reviews = data[0].reviews.filter(r => r.restaurant_id == $routeParams.id)
                // vm.reviews = data[0].reviews;
                console.log(vm.reviews)
            });
        }
    }
})();