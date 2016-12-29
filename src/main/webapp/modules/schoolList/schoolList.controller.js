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
		}

	}

})();