(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('govtSchoolController', govtSchoolController);

    /* ngInject */
    function govtSchoolController($scope, $state, $stateParams) {
        var vm = this;
        init();

        function init() {
            var schoolDist = $scope.$parent.vm.currentDist; // gets the current district id
            // reaveal these elements when scoll happens
            
            window.sr = ScrollReveal();
            // for app title
            sr.reveal('.sr-listImg', {
                duration: 1000,
                scale: 0.3,
                distance: '20px'
            });
        }

        vm.gotoSchool = function () {
            $state.go('app.schoolDetail', {
                schoolId: 1
            });
        }

    }

})();