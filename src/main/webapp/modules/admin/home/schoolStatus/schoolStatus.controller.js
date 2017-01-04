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

			var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
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
			apiService.serviceRequest({
				URL: appConfig.requestURL.schoolAllList,
				hideErrMsg: true
			}, function (response) {
				vm.schoolList = response;
				vm.loading = false;
			}, function (response) {

			});
		};
		/**
		 * 
		 */
		vm.getDetails = function (school){
			console.log(school)
			var defalultTxt = 'NA';
			school.sessionDate = new Date(school.sessionDate) ? new Date(school.sessionDate).toDateString() : null;
			
			var body = "<div class='row'>"
				+ "<div class='col-xs-12 col-md-4'> <b>School Type : </b> " + (school.schoolType || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>District : </b> " + (school.districtName || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Educational District : </b> " + (school.educationalDistrictName || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Address : </b> " + (school.address || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-8'> <b>Phone : </b> " + (school.phone || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Session Date : </b> " + (school.sessionDate || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-8'> <b>Session Status : </b> " + (school.sessionStatus || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Teacher Name : </b> " + (school.teacherName || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Teacher Phone : </b> " + (school.teacherPhone || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Student Representative : </b> " + (school.studentRepName || defalultTxt) + "</div>"
				+ "<div class='col-xs-12'> <b>Session Comments : </b> " + (school.comments || defalultTxt) + "</div>"
				+"</div>";
			var head = school.name + " (Code : " + school.schoolCode + ") " + '<a style="font-size: 14px;text-decoration:underline !important;" href="#/adminHome/schoolUpload/'+school.id+'")><b>edit</></a>';
			
			apiService.showPopUp(head, body);
		};
	};


})();