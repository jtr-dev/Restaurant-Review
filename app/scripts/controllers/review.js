(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReviewController', ReviewController)
        .directive('starRating', starRating);

    function starRating() {
        // http://codepen.io/AstroDroid/pen/FIdHb
        // http://angulartutorial.blogspot.com/2014/03/rating-stars-in-angular-js-using.html
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

    ReviewController.$inject = ['$scope', 'restaurantFactory', '$routeParams', '$location'];
    function ReviewController($scope, restaurantFactory, $routeParams, $location) {
        var vm = this;

        vm.ReviewForm = false;




        vm.Review = {
            restaurant_id: $routeParams.id,
            username: '',
            review: '',
            rating: 5,
            date: datestring() 
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
             vm.Review = {
            restaurant_id: $routeParams.id,
            username: '',
            review: '',
            rating: 5,
            date: datestring() 
        };
            
        }
        function datestring () {
            var date = new Date()
            return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
        }
        restaurantFactory.getRestaurants()
            .then(function (Restaurants) {
                vm.restaurant = Restaurants[0].restaurants[$routeParams.id];
                console.log(vm.restaurant)
                if (vm.restaurant === undefined) {
                    location.pathname = ('404.html')
                }
            });

        restaurantFactory.getReviews()
            .then(function (Reviews) {
                vm.reviews = Reviews[0].reviews.filter(function (r) {
                    return r.restaurant_id == $routeParams.id
                })
                console.log(vm.reviews)
            });


    }
})();