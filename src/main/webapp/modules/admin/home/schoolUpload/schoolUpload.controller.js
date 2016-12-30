(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('schoolUploadController', schoolUploadController);

	/* ngInject */
	function schoolUploadController($scope, apiService, appConfig, $timeout) {
		var vm = this;
		init();

		/**
		 * init function kicks starts the page execution
		 **/
		function init() {
			varInit();
		};

		/**
		 * initialize page variables
		 **/
		function varInit() {
			vm.formData = {};
			vm.file = [];
			vm.fileNames = [];
			vm.saving = false;
			
			if(document.getElementById('file-upload'))
				document.getElementById('file-upload').value="";
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
				value: "TBD"
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
		};
		/**
		 *  handles the file selection for the page
		 */
		vm.FilesSelection = function (input) {
			$timeout(function () {
				vm.file = [];
				vm.fileNames = [];
				angular.forEach(input.files, function (v, k) {
					vm.file.push(input.files[k]);
					vm.fileNames.push(input.files[k].name);
				});
			});            
		};
		/**
		 * on save logic
		 **/
		vm.onSave = function () {
			vm.saving = true;
		
			var fd = new FormData();

			fd.append("name", vm.formData.name);
			fd.append("schoolCode", vm.formData.schoolCode);
			fd.append("address", vm.formData.address);
			fd.append("phone", vm.formData.phone);
			fd.append("schoolType", vm.formData.schoolType);
			fd.append("teacherName", vm.formData.teacherName);
			fd.append("teacherPhone", vm.formData.teacherPhone);
			fd.append("studentRepName", vm.formData.studentRepName);
			fd.append("sessionDate", vm.formData.sessionDate);
			fd.append("sessionStatus", vm.formData.sessionStatus);
			fd.append("comments", vm.formData.comments);
			fd.append("districtId", 1);
			fd.append("districtName", vm.formData.districtName);
			fd.append("edDistrictName", vm.formData.educationalDistrictName);
			fd.append("edDistrictId", vm.formData.educationalDistrictName == "Aluva" ? 1 : (vm.formData.educationalDistrictName == "Ernakulam" ? 2 : (vm.formData.educationalDistrictName == "Kothamangalam" ? 3 : 4)));

			for(var i=0; i < vm.file.length; i++){
				fd.append("schoolDocumentBean[" + i + "].schoolDocs", vm.file[i]);
			}

			apiService.serviceRequest({
				URL: appConfig.requestURL.schoolSave,
				hideErrMsg: true,
				method: 'POST',
				payLoad: fd,
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined
				},
			}, function (response) {
				apiService.showAlert({
					text: "School Saved Successfully !!"
				}, function () {
					varInit();
				});           	
			}, function (response) {
				apiService.showAlert({
					text: "Error occured while saving. Try again!!"
				}, function () {
					vm.saving = false;
				}); 				
			});
		}
	}

})();