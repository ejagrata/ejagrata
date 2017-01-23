(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('unAidedSchoolController', unAidedSchoolController);

	/* ngInject */
	function unAidedSchoolController($scope, $state, appConfig, apiService, $timeout) {
		var vm = this;
		init();

		function init() {
			vm.loading = true; // flag to indicate page is loading
			vm.loadMsg = "Fetching data... Please wait.."; // message to the user
			vm.noResult = false; // flag to indicate no result
			
			var schoolDist = $scope.$parent.vm.currentDist; // gets the current district id
			var eduDist = $scope.$parent.vm.currentEdDist; // gets the current eduDist id                        

			vm.district = "Ernakulam";
			vm.eduDistrict = (eduDist == "1") ? "Aluva" : ((eduDist == "2") ? "Ernakulam" : (eduDist == "3") ? "Kothamangalam" : "Muvattupuzha");

			apiService.serviceRequest({
				URL: appConfig.requestURL.schoolDistList + schoolDist + '/' + eduDist + '/UnAided',
				hideErrMsg: true				
			}, function (response) {							
				vm.govtSchool = response;
				if (response.length > 0) { // checks if school list is empty
					for (var i=0; i<vm.govtSchool.length; i++){
						if (vm.govtSchool[i].schoolDocumentBean && vm.govtSchool[i].schoolDocumentBean.length > 0) {
							vm.govtSchool[i].imageURL = 'files/' + vm.govtSchool[i].schoolDocumentBean[0].docId;
						} else {
							vm.govtSchool[i].imageURL = "images/default.png";
							vm.govtSchool[i].disableSlide = true;
						}						
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
				} else {
					vm.noResult = true;
					vm.loading = false;
					vm.loadMsg = "Seems that School list is empty.";
				}				

			}, function (response) {
				vm.noResult = true;
				vm.loading = false;
				vm.loadMsg = "Something went wrong... Please try again.";
			});             
		}
		/**
		 *  to show slider for images
		 */
		vm.showSlide = function (item) {			
			if (item && item.schoolDocumentBean && item.schoolDocumentBean.length > 0) {
				$scope.$parent.vm.showSlideShow(item);
			}
		};
	}

})();