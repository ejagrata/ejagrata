(function () {
	"use strict";

	angular
	.module('eJag', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMaterial', 'ngCookies'])
	.controller('mainController', mainController);

	/* ngInject */
	function mainController($scope, $rootScope) {
		var vm = this;
		init();

		function init() {

		};

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			if ($rootScope.hasSlideShow){ // check if slide view is ON so that to cancel navigation
				event.preventDefault(); 				
			} else {
				window.scrollTo(0, 0);
			}
		});
	}

})();