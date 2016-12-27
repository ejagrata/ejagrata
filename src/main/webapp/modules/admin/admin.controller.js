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
          
        }
        /**
        *
        **/
        vm.login = function (){
            $state.go('adminHome');
        }

    }

})();