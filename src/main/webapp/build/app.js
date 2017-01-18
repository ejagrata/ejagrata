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
(function () {

    "use strict";

    angular
        .module('eJag')
        .config(config);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                templateUrl: 'modules/base/base.html',
                controller: 'mainController',
                controllerAs: 'vm'
            })
            .state('app.home', {
                url: 'home',
                templateUrl: 'modules/home/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .state('app.schoolList', {
                url: 'schoolList/:distId/:edDistId',
                templateUrl: 'modules/schoolList/schoolList.html',
                controller: 'schoolListController',
                controllerAs: 'vm'
            })
            .state('app.schoolList.govt', {
                url: '/govt',
                templateUrl: 'modules/schoolList/govtSchool/govtSchool.html',
                controller: 'govtSchoolController',
                controllerAs: 'vm'
            })
            .state('app.schoolList.aided', {
                url: '/aided',
                templateUrl: 'modules/schoolList/aidedSchool/aidedSchool.html',
                controller: 'aidedSchoolController',
                controllerAs: 'vm'
            })
            .state('app.schoolList.unaided', {
                url: '/unaided',
                templateUrl: 'modules/schoolList/unAidedSchool/unAidedSchool.html',
                controller: 'unAidedSchoolController',
                controllerAs: 'vm'
            })            
            .state('admin', {
                url: '/admin',
                templateUrl: 'modules/admin/admin.html',
                controller: 'adminController',
                controllerAs: 'vm'
            })
            .state('adminHome', {
                url: '/adminHome',
                templateUrl: 'modules/admin/home/adminHome.html',
                controller: 'adminHomeController',
                controllerAs: 'vm'
            })
            .state('adminHome.schoolStatus', {
                url: '/schoolStatus',
                templateUrl: 'modules/admin/home/schoolStatus/schoolStatus.html',
                controller: 'schoolStatusController',
                controllerAs: 'vm'
            })
            .state('adminHome.schoolUpload', {
                url: '/schoolUpload/:schoolId',
                templateUrl: 'modules/admin/home/schoolUpload/schoolUpload.html',
                controller: 'schoolUploadController',
                controllerAs: 'vm'
            });


        $urlRouterProvider.otherwise('home');
    }

})();
(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('adminController', adminController);

	/* ngInject */
	function adminController($scope, $state, $stateParams, appConfig, apiService, $http, $cookies) {
		var vm = this;
		init();

		function init() {
			vm.logging = false;
			vm.loginErr = false;
		}
		/**
		 *
		 **/
		 vm.login = function () {
			// $state.go('adminHome'); // route to the home page
			// return;
			 vm.logging = true;
			 apiService.serviceRequest({
				 method : 'POST',
				 URL : appConfig.requestURL.authRequest + '?password='+ vm.formData.password +'&username='+ vm.formData.username +'&grant_type=password&scope=read%20write&client_secret=ejagrata123456&client_id=ejagrataapp',
				 headers : {
					 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8',
					 'Authorization' : 'Basic ZWphZ3JhdGFhcHA6ZWphZ3JhdGExMjM0NTY='
				 },
				 errorMsg : 'Unable to Authenticate. Try Again!'
			 }, function (success){					 
				 $http.defaults.headers.common.Authorization = 'Bearer ' + success.access_token; // sets the access token for all http request
				 $cookies.put('access_token', success.access_token); // sets the access_token values to the cookies
				 // login service
				 apiService.serviceRequest({
					 URL : 'user/whoami'
				 }, function (userData) {
					 $cookies.put('userName', vm.formData.username);  // sets the userName values to the cookies				
					 $state.go('adminHome'); // route to the home page
					 vm.loginErr = false;
				 }, function fail(fail){
					 vm.formData = {}; // clears the login form data
					 vm.logging = false; // turns the flag off for logginIn
					 vm.loginErr = true;
				 });			
			 }, function fail(fail){
				 vm.logging = false; // turns the flag off for logginIn
				 vm.loginErr = true;
				 vm.formData = {}; // clears the login form data							
			 });			 
		 }
	}

})();
(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('homeController', homeController);

    /* ngInject */
    function homeController($scope, $state, appConfig, apiService) {
        var vm = this;
        init();

        function init($scope) {
            vm.appName = appConfig.title;
            vm.subTitle = appConfig.subTitle;
            
            // reaveal these elements when scoll happens
            window.sr = ScrollReveal();
            // for app title
            sr.reveal('.sr-appTitle', {
                duration: 1500,
                scale: 0.3,
                distance: '20px'
            });
            // for image collash
            sr.reveal('.sr-eventImg', {
                duration: 1500,
                scale: 0.3,
                distance: '20px'
            });
            // for educational districts
            sr.reveal('blockquote', {
                duration: 1000,
                scale: 0.3,
                distance: '0px'
            }, 200);
        }

        vm.viewSchool = function (edDistId) {
            $state.go('app.schoolList', {
                distId: 1,
                edDistId : edDistId
            });
        }

        vm.showPopUp = function (popHeading) {
            if (popHeading == 'tcs') {
                var body = "<div> <p>202 Master Trainers selected from the 101 Government schools (including 1 student and 1 teacher form each school - Ernakulam, Aluva, Muvattupuzha & Kothamangalam) attended this training at TCS campus, on 12th Nov and 19th Nov. The District Collector & Assistant Collector had addressed the gathering.</p><p>This program was owned and driven by TCS Kochi (50 + associates, for over two and half months), starting from conceptualization to execution of this program. Tremendous effort was put towards preparing the course contents, handouts, etc. from scratch (in Malayalam, as well) and getting it reviewed and finalized by IT Mission representatives. Mr. Francis Perera (Ex. Cyber Cell Officer) from TCS Admin has shared his experience with the attendees, which was a highlight for the event.A TCS volunteer will help the master trainers to cascade the awareness session to 8th, 9th and 10th standard students in these schools and to their parents. Phase 1 of this program covered all Government schools in Ernakulum district.  But this will be an ongoing program and will be extended to the aided schools in Kochi also.</p></div>"
                apiService.showPopUp("Team TCS", body);
            } else {
                var body = '<p>"e-Jagratha Internet Security Awareness Program" has been officially launched by Revenue Principal Secretary P.H. Kurian on 21st Oct @ TCS Campus. The initiative put forward by Ernakulam District Collector Mohammed Y. Safirulla towards empowering Government High School students is being executed by TCS, in collaboration with Kerala Administration. It aims at promoting internet awareness and cyber safety among students."</p>';
                apiService.showPopUp("E-Jagratha : A Glance", body);
            }
        }
    }

})();
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
(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('adminHomeController', adminHomeController);

    /* ngInject */
    function adminHomeController($scope, $state, apiService, $cookies, $http) {
        var vm = this;
        init();

        function init() {
        	if ($cookies.get('userName')) {			
				 $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('access_token'); // sets the access	token for all http request
			 } else {
				 $state.go('admin');
				 return;
			 }
            if ($state.current.name == "adminHome.schoolUpload") {
                vm.currentNavItem = "adminHome.schoolUpload";
                $state.go("adminHome.schoolUpload");
            } else {
                vm.currentNavItem = "adminHome.schoolStatus";
                $state.go("adminHome.schoolStatus");
            }
        }
        /**
         *
         **/
        vm.logout = function () {            
        	apiService.logoutAction();
        }

    }

})();
(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('aidedSchoolController', aidedSchoolController);

	/* ngInject */
	function aidedSchoolController($scope, $state, appConfig, apiService, $timeout) {
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
				URL: appConfig.requestURL.schoolDistList + schoolDist + '/' + eduDist + '/Aided',
				hideErrMsg: true				
			}, function (response) {							
				vm.govtSchool = response;
				if (response.length > 0) { // checks if school list is empty
					for (var i=0; i<vm.govtSchool.length; i++){
						vm.govtSchool[i].imageURL = (vm.govtSchool[i].schoolDocumentBean && vm.govtSchool[i].schoolDocumentBean.length > 0) ?
								'files/' + vm.govtSchool[i].schoolDocumentBean[0].docId: "images/default.png";
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
			vm.loading = true; // flag to indicate page is loading
			vm.loadMsg = "Fetching data... Please wait.."; // message to the user
			vm.noResult = false; // flag to indicate no result
			
			var schoolDist = $scope.$parent.vm.currentDist; // gets the current district id
			var eduDist = $scope.$parent.vm.currentEdDist; // gets the current eduDist id                        

			vm.district = "Ernakulam";
			vm.eduDistrict = (eduDist == "1") ? "Aluva" : ((eduDist == "2") ? "Ernakulam" : (eduDist == "3") ? "Kothamangalam" : "Muvattupuzha");

			apiService.serviceRequest({
				URL: appConfig.requestURL.schoolDistList + schoolDist + '/' + eduDist + '/Government',
				hideErrMsg: true				
			}, function (response) {							
				vm.govtSchool = response;
				if (response.length > 0) { // checks if school list is empty
					for (var i=0; i<vm.govtSchool.length; i++){
						vm.govtSchool[i].imageURL = (vm.govtSchool[i].schoolDocumentBean && vm.govtSchool[i].schoolDocumentBean.length > 0) ?
								'files/' + vm.govtSchool[i].schoolDocumentBean[0].docId: "images/default.png";
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
						vm.govtSchool[i].imageURL = (vm.govtSchool[i].schoolDocumentBean && vm.govtSchool[i].schoolDocumentBean.length > 0) ?
								'files/' + vm.govtSchool[i].schoolDocumentBean[0].docId: "images/default.png";
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
			
			// service request
			apiService.serviceRequest({
				URL: appConfig.requestURL.schoolAllList,
				hideErrMsg: true
			}, function (response) {
				vm.schoolList = response;
				vm.loading = false;
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
			console.log(school)
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
					console.log(vm.uploadedDocs)
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
(function () {
	angular
	.module('eJag')
	.service('apiService', apiService);

	function apiService($rootScope, $http, $q, $state, appConfig, $mdDialog, $cookies) {

		/**
		 * function to place http request
		 */
		this.serviceRequest = function (params, success, fail) {

			var requestParams = angular.merge({
				method: params.method || "GET",
				url: appConfig.baseURL + params.URL,
				data: params.payLoad || {},
				headers: params.headers || {
					'Content-Type': ''
				}
			}, params.addOns);

			var request = $http(requestParams);
			
			request.then(function successCallback(response) {
				if (success && response && response.status == 200)
					success(response.data);
				else {
					if (fail)
						fail(response.data);
				}					
			}, function errorCallback(response) {
				if (fail)
					fail(response.data);
			});		
		};

		/**
		 * function to place async service request
		 */
		this.asyncServiceRequest = function (params) {
			var deferred = $q.defer(); // creating the promise object

			serviceRequest(params, function (response) {
				deferred.resolve(response); // resolving the promise
			}, function (response) {
				deferred.reject(response); // rejecting the promise
			});

			return deferred.promise; // returning the promise object
		};

		/**
		 * function to place async service request
		 */
		this.showPopUp = function (popHeading, popBody) {        	
			// sets the heading
			$('.pop-up-heading')[0].innerHTML = popHeading;
			// sets the content
			$('.pop-up-body')[0].innerHeight = popBody;

			// When the user clicks on <span> (x), close the modal
			$('.pop-up-close')[0].onclick = function () {
				$('#myModal').fadeOut();
			}
			// sets the content
			$('.pop-up-body')[0].innerHTML = popBody;
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function (event) {
				if (event.target == $('#myModal')[0]) {
					$('#myModal').fadeOut();
				}
			}
			// shows the pop up
			$('#myModal').fadeIn();
		};
		/**
		 *  function to show alert messages
		 */
		this.showAlert = function (param, callback) {
			alert = $mdDialog.alert({
				title: param.title || 'E-Jagrata Alert !',
				textContent: param.text,
				ok: param.title || 'Ok'
			});

			$mdDialog
			.show(alert)
			.finally(function () {
				if (callback)
					callback();
			});
		};
		/**
		 *  logout actions
		 */
		this.logoutAction = function (){    
			cleanupLoginSettings();

			this.serviceRequest({
				URL: appConfig.requestURL.logout    		
			});    	

			function cleanupLoginSettings(){
				// removes all cookies
				var cookies = $cookies.getAll();
				angular.forEach(cookies, function (value, key) {
					$cookies.remove(key);
				});    			
				delete $http.defaults.headers.common.Authorization;  // clears Authorization header    			
				$state.go('admin'); // route to the specified page    		
			}
		};
	}
})();
//set global configuration of application and it can be accessed by injecting appConstants in any modules

(function () {
    angular
        .module('eJag')
        .constant('appConfig', {

            title: "e-Jagratha", // app name
            subTitle : "IT Awareness Campaign",
            lang: "en", // app default locale format
            baseURL: '', // app service URL
            requestURL: {
            	authRequest: 'oauth/token', // oauth request
                schoolSave : 'school/save', // save a school
                schoolAllList : 'school/listAll',
                schoolDistList : 'school/district/',
                schoolDetails : 'school/',
                logout : 'logout' // logout service
            }

        });
})();
(function () {
	angular
	.module('eJag')
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('httpInterceptor');
	});
})();

(function () {
	angular
	.module('eJag')
	.factory('httpInterceptor', httpInterceptor);

	function httpInterceptor($injector) {
		return {
			request: function(config) {
				return config;
			},

			requestError: function(config) {
				return config;
			},

			response: function(res) {				
				if (res.status == 401){ // redirects to login page on unauthorized access
					$injector.get('apiService').logoutAction();
				}
				return res;
			},

			responseError: function(res) {
				if (res.status == 401){ // redirects to login page on unauthorized access
					$injector.get('apiService').logoutAction();
				}
				return res;
			}
		}
	}
})();