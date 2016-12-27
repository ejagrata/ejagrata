(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('adminHomeController', adminHomeController);

    /* ngInject */
    function adminHomeController($scope, $state) {
        var vm = this;
        init();

        function init() {            
            if ($state.current.name == "adminHome.schoolUpload") {
                vm.currentNavItem = "adminHome.schoolUpload";
                $state.go("adminHome.schoolUpload");
            } else {
                vm.currentNavItem = "adminHome.schoolStatus";
                $state.go("adminHome.schoolStatus");
            }
        }

    }

})();