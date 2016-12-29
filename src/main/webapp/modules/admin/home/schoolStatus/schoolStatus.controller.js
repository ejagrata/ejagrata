(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('schoolStatusController', schoolStatusController);

	/* ngInject */
	function schoolStatusController($scope, apiService, appConfig) {
		var vm = this;
		init();

		function init() {
			vm.loading = true;
			vm.loadMsg = "Fetching list... Please wait..";
			
			var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight|| 0);
			document.getElementById('fh5co-wrapper').style.minHeight = (windowHeight - 225) + 'px';
			// school type list			
			vm.schoolType = [{
				value: "Aided"
			}, {
				value: "Government"
			}, {
				value: "UnAided"
			}];
			// session status list
			vm.sessionStatus = [{
				value: "Completed"
			}, {
				value: "Pending"
			}, {
				value: "Date to be decided"
			}, {
				value: "Not Attended"
			}, {
				value: "Planned"
			}];
			// district
			vm.district = [{
				value: "Ernakulam"
			}];
			// educational District List
			vm.educationDist = [{
				value: "Aluva"
			}, {
				value: "Ernakulam"
			}, {
				value: "Kothamangalam"
			}, {
				value: "Muvattupuzha"
			}];
			apiService.serviceRequest({
				URL: appConfig.requestURL.schoolAllList,
				hideErrMsg: true				
			}, function (response) {
				vm.schoolList = response;
				vm.loading = false;
			}, function (response) {

			});
		}
		/**
		 * 
		 */
		vm.getDist = function (value){
			return vm.district[value];
		}
		/**
		 * 
		 */
		vm.getEduDist = function (value){
			return vm.educationDist[value];
		}
	};


})();