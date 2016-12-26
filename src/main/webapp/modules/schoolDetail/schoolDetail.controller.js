(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('schoolDetailsController', schoolDetailsController);

    /* ngInject */
    function schoolDetailsController($scope, $state, $stateParams) {
        var vm = this;
        init();

        function init() {
            console.log($stateParams.schoolId);
            
            $scope.myInterval = 3000;
            $scope.noWrapSlides = false;
            $scope.active = 0;
            var slides = $scope.slides = [];
            var currIndex = 0;

            $scope.addSlide = function () {
                slides.push({
                    image: 'http://www.gstatic.com/webp/gallery/1.jpg',
                    text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                    id: currIndex++
                });
            };


            for (var i = 0; i < 4; i++) {
                $scope.addSlide();
            }
        }

    }

})();