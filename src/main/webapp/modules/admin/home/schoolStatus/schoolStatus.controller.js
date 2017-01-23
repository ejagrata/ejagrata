(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('schoolStatusController', schoolStatusController);

	/* ngInject */
	function schoolStatusController($scope, apiService, appConfig, $timeout) {
		var vm = this;
		init();

		function init() {
			vm.loading = true;
			vm.loadMsg = "Fetching list... Please wait..";
			$scope.search = {};

			var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			if (document.getElementById('fh5co-wrapper'))
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

			// sort list drop-down
			vm.sortList = [{
				text : "School Name",
				value : "name"
			},{
				text : "School Code",
				value : "schoolCode"
			},{
				text : "Session Date",
				value : "sessionDate"
			}];
			vm.sortCriteria = "name"; // default sort criteria

			// service request
			apiService.serviceRequest({
				URL: appConfig.requestURL.schoolAllList,
				hideErrMsg: true
			}, function (response) {
				vm.schoolList = [];
				for(var i=0;i<response.length;i++){					
					vm.schoolList[i] = response[i];
					if (response[i].sessionDate){
						var date = new Date(response[i].sessionDate);
						vm.schoolList[i].sessionDate = date.setHours(0,0,0,0);
					} 
				}
				$timeout(function (){
					vm.loading = false;
				}, 100);
			}, function (response) {

			});

			// to handle sort by date
			$scope.$watch('sortSessionDate', function (newValue, oldValue, scope) {						
				if ($scope.search && newValue)
					$scope.search.sessionDate = newValue.getTime();
			});
		};
		/**
		 * 
		 */
		vm.getDetails = function (school){
			var defalultTxt = 'NA',
			sessionDate = angular.copy(school.sessionDate);
			sessionDate = sessionDate ? new Date(sessionDate).toDateString() : null;

			var body = "<div class='row'>"
				+ "<div class='col-xs-12 col-md-4'> <b>School Type : </b> " + (school.schoolType || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>District : </b> " + (school.districtName || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Educational District : </b> " + (school.educationalDistrictName || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Address : </b> " + (school.address || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-8'> <b>Phone : </b> " + (school.phone || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Session Date : </b> " + (sessionDate || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-8'> <b>Session Status : </b> " + (school.sessionStatus || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Teacher Name : </b> " + (school.teacherName || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Teacher Phone : </b> " + (school.teacherPhone || defalultTxt) + "</div>"
				+ "<div class='col-xs-12 col-md-4'> <b>Student Representative : </b> " + (school.studentRepName || defalultTxt) + "</div>"
				+ "<div class='col-xs-12'> <b>Session Comments : </b> " + (school.comments || defalultTxt) + "</div>"
				+ "</div>";
			var head = school.name + " (Code : " + school.schoolCode + ") " + '<a style="font-size: 14px;text-decoration:underline !important;" href="#!/adminHome/schoolUpload/'+school.id+'")><b>edit</></a>';

			apiService.showPopUp(head, body);
		};
	};


})();