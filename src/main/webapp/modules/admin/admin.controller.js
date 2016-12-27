(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('adminController', adminController);

    /* ngInject */
    function adminController($scope, $state, $stateParams) {
        var vm = this;
        init();

        function init() {
            if ($state.current.name == "admin.schoolUpload") {
                vm.currentNavItem = "admin.schoolUpload";
                $state.go("admin.schoolUpload");
            } else {
                vm.currentNavItem = "admin.schoolStatus";
                $state.go("admin.schoolStatus");
            }
        }

    }

})();