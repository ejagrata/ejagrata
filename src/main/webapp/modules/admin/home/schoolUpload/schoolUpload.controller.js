(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('schoolUploadController', schoolUploadController);

	/* ngInject */
	function schoolUploadController($scope, apiService, appConfig, $timeout, $stateParams) {
		var vm = this;
		init();

		/**
		 * init function kicks starts the page execution
		 **/
		function init() {
			if ($stateParams.schoolId){
				$('#myModal').fadeOut(); // to fade out the overlay
				$scope.$parent.vm.currentNavItem = "adminHome.schoolUpload"; // to change tab selection				
				vm.editMode = true; // flag to indicate edit mode
				vm.saving = true;
				// service request to fetch data for the requested school
				apiService.serviceRequest({
					URL: appConfig.requestURL.schoolDetails + $stateParams.schoolId
				}, function (response) { 
					vm.formData = response;					
					vm.formData.sessionDate = response.sessionDate ?  new Date(response.sessionDate) : null;
					for (var i=0; i<response.schoolDocumentBean.length; i++){
						response.schoolDocumentBean[i].docPath = response.schoolDocumentBean[i].docPath.split('/').pop();
					}
					vm.uploadedDocs = response.schoolDocumentBean;
					vm.saving = false;
				}, function (response) {

				});
			}			
			varInit();
		};

		/**
		 * initialize page variables
		 **/
		function varInit() {
			document.body.scrollTop = 0; // to scroll top
			vm.formData = {};
			vm.file = [];
			vm.fileNames = [];
			vm.saving = false;
			vm.deleteList = [];
			vm.uploadedDocs = [];			
			
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
				value: "Planned"
			}, {
				value: "Pending"
			}, {
				value: "Date to be decided"
			}, {
				value: "Completed"
			}, {
				value: "Not Attended"
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

			if (vm.deleteList.length > 0){
				fd.append("deleteList", vm.deleteList);
			}
			fd.append("name", vm.formData.name);
			fd.append("schoolCode", vm.formData.schoolCode);
			fd.append("address", vm.formData.address);
			fd.append("phone", vm.formData.phone);
			fd.append("schoolType", vm.formData.schoolType);
			fd.append("teacherName", vm.formData.teacherName);
			fd.append("teacherPhone", vm.formData.teacherPhone);
			fd.append("studentRepName", vm.formData.studentRepName);
			if (vm.formData.sessionDate)
				fd.append("sessionDate", vm.formData.sessionDate);
			fd.append("sessionStatus", vm.formData.sessionStatus);
			fd.append("comments", vm.formData.comments);
			fd.append("districtId", 1);
			fd.append("districtName", vm.formData.districtName);
			fd.append("educationalDistrictName", vm.formData.educationalDistrictName);
			fd.append("educationalDistrictId", vm.formData.educationalDistrictName == "Aluva" ? 1 : (vm.formData.educationalDistrictName == "Ernakulam" ? 2 : (vm.formData.educationalDistrictName == "Kothamangalam" ? 3 : 4)));

			for(var i=0; i < vm.file.length; i++){
				fd.append("schoolDocumentBean[" + i + "].schoolDocs", vm.file[i]);
			}

			if (vm.editMode){
				fd.append("id", vm.formData.id);
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
					vm.editMode = false; // flag to indicate edit mode
					varInit();
				});           	
			}, function (response) {
				apiService.showAlert({
					text: "Error occured while saving. Try again!!"
				}, function () {
					vm.saving = false;
				}); 				
			});
		};
		/**
		 *  function to add file to delete list []
		 */
		vm.deleteFile = function (doc){
			doc.deleted= true;
			vm.deleteList.push(doc.docId); // inserts the file id to deleteList []
		};
		/**
		 *  function to undo file delete
		 */
		vm.undoDelete = function (doc){
			doc.deleted= false;
			var index = vm.deleteList.indexOf(doc.docId);
			vm.deleteList.splice(index,1);
		};
	}

})();