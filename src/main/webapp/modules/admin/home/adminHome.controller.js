(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('adminHomeController', adminHomeController);

    /* ngInject */
    function adminHomeController($scope, $state, apiService, $cookies, $http) {
        var vm = this;
        init();

        function init() {
        	if ($cookies.get('userName')) {			
				 $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('access_token'); // sets the access	token for all http request
			 } else {
				 $state.go('admin');
				 return;
			 }
            if ($state.current.name == "adminHome.schoolUpload") {
                vm.currentNavItem = "adminHome.schoolUpload";
                $state.go("adminHome.schoolUpload");
            } else {
                vm.currentNavItem = "adminHome.schoolStatus";
                $state.go("adminHome.schoolStatus");
            }
        }
        /**
         *
         **/
        vm.logout = function () {            
        	apiService.logoutAction();
        }

    }

})();