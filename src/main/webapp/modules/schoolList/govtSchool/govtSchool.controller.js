(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('govtSchoolController', govtSchoolController);

	/* ngInject */
	function govtSchoolController($scope, $state, appConfig, apiService, $timeout) {
		var vm = this;
		init();

		function init() {
			vm.loading = true;
			vm.loadMsg = "Fetching data... Please wait..";
			var schoolDist = $scope.$parent.vm.currentDist; // gets the current district id
			var eduDist = $scope.$parent.vm.currentEdDist; // gets the current eduDist id                        
		
			vm.district = "Ernakulam";
			vm.eduDistrict = (eduDist == "1") ? "Aluva" : ((eduDist == "2") ? "Ernakulam" : (eduDist == "3") ? "Kothamangalam" : "Muvattupuzha");
			
			apiService.serviceRequest({
				URL: appConfig.requestURL.schoolDistList + schoolDist + '/' + eduDist + '/Government',
				hideErrMsg: true				
			}, function (response) {							
				vm.govtSchool = response;
				for (var i=0; i<vm.govtSchool.length; i++){
					vm.govtSchool[i].imageURL = (vm.govtSchool[i].schoolDocumentBean && vm.govtSchool[i].schoolDocumentBean.length > 0) ?
					'files/' + vm.govtSchool[i].schoolDocumentBean[0].docId: "images/default.jpg";
				};
		
				$timeout(function (){
					// reaveal these elements when scoll happens            
					window.sr = ScrollReveal();
					// for app title
					sr.reveal('.sr-listImg', {
						duration: 1000,
						scale: 0.3,
						distance: '20px'
					});
					vm.loading = false;
				}, 100);
				
			}, function (response) {

			});             
		}
		/**
		 * 
		 */
		vm.gotoSchool = function (item) {			
			$state.go('app.schoolDetail', {
				schoolDetails: JSON.stringify(item)
			});
		}

	}

})();