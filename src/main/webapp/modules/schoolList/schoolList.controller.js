(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('schoolListController', schoolListController);

	/* ngInject */
	function schoolListController($scope, $state, $stateParams, $rootScope) {
		var vm = this;
		init();

		function init() {          	
			vm.currentDist = $stateParams.distId;
			vm.currentEdDist = $stateParams.edDistId; 
			
			if ($state.current.name == "app.schoolList.aided") {
				vm.currentNavItem = "app.schoolList.aided";
				$state.go("app.schoolList.aided");
			} else if ($state.current.name == "app.schoolList.unaided") {
				vm.currentNavItem = "app.schoolList.unaided";
				$state.go("app.schoolList.unaided");
			} else {
				vm.currentNavItem = "app.schoolList.govt";
				$state.go("app.schoolList.govt", true);
			} 
		};
		/**
		 *  function to show the slider
		 */
		vm.showSlideShow = function (item){
			$rootScope.hasSlideShow = true; // flag to indicate slider is active
			$rootScope.scrollY = window.scrollY; // to save scroll value when slider is opended
			vm.showSlider = true; // flag to indicate slider is active
			vm.schoolDetails = item; // save school details to populate in slider
		};
		/**
		 * 
		 */
		vm.closeSlideShow = function (){
			window.scrollTo(0, $rootScope.scrollY); // set the scroll to previous one
			$rootScope.hasSlideShow = false; // set the slide show active flag
			vm.showSlider = false;
		}
	}

})();