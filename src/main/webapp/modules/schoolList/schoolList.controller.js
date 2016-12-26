(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('schoolListController', schoolListController);

    /* ngInject */
    function schoolListController($scope, $state, $stateParams) {
        var vm = this;
        init();

        function init() {
            vm.currentNavItem = "app.schoolList.govt";
            vm.currentDist = $stateParams.distId;
            $state.go("app.schoolList.govt");
        }      

    }

})();