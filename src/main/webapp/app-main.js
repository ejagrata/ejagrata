(function () {
    "use strict";

    angular
        .module('eJag', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMaterial'])
        .controller('mainController', mainController);

    /* ngInject */
    function mainController($scope, $rootScope) {
        var vm = this;
        init();

        function init() {
           
        }
        
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            window.scrollTo(0, 0);
        });
    }

})();