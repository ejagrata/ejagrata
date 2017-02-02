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
			vm.downloadCategory = [{
				value : "Handouts",
				id : "down-doc-Handouts",
				open : false,
				list : [{
					value : "Cyber law IPC.pdf",
					href : "../resources/materials/Handouts/Cyber law IPC.pdf"
				}, {
					value : "Did You Know.pdf",
					href : "../resources/materials/Handouts/Did You Know.pdf"
				}, {
					value : "Feedback.pdf",
					href : "../resources/materials/Handouts/Feedback.pdf"
				}, {
					value : "HandOut.pdf",
					href : "../resources/materials/Handouts/HandOut.pdf"
				}, {
					value : "Master Trainer - ToDo.pdf",
					href : "../resources/materials/Handouts/Master Trainer - ToDo.pdf"
				}, {
					value : "Useful Links.pdf",
					href : "../resources/materials/Handouts/Useful Links.pdf"
				}]
			}, {
				value : "Presentations",
				id : "down-doc-Presentations",
				open : false,
				list : [{
					value : "E-world.pptx",
					href : "../resources/materials/Presentations/1. E-world V6.0.pptx"
				},{
					value : "How to Use Internet Safely.pptx",
					href : "../resources/materials/Presentations/2. How to Use Internet Safely V2.0.pptx"
				},{
					value : "Gaming Social NW.pptx",
					href : "../resources/materials/Presentations/3. Gaming Social NW 2.0.pptx"
				},{
					value : "Mobile -Safe Practices.pptx",
					href : "../resources/materials/Presentations/4. Mobile -Safe Practices V1.0.pptx"
				},{
					value : "How Internet Impacts your Body and Mind.pptx",
					href : "../resources/materials/Presentations/5. How Internet Impacts your Body and Mind.pptx"
				},{
					value : "Cyber Threats Laws.pptx",
					href : "../resources/materials/Presentations/6. Cyber Threats _ Laws  V1.0.pptx"
				},{
					value : "Career Options in IT.pptx",
					href : "../resources/materials/Presentations/7. Career Options in IT V2.0.pptx"
				}]
			}, {
				value : "Training Material",
				id : "down-doc-TrainingMaterial",
				open : false,
				list : [{
					value : "English Version.pdf",
					href : "../resources/materials/Training Material/English Version.pdf"
				},{
					value : "Malayalam 1.pdf",
					href : "../resources/materials/Training Material/Malayalam 1.pdf"
				},{
					value : "Malayalam 2.pdf",
					href : "../resources/materials/Training Material/Malayalam 2.pdf"
				},{
					value : "Malayalam 3.pdf",
					href : "../resources/materials/Training Material/Malayalam 3.pdf"
				}]
			}];
			setTimeout(function (){
				$('#down-doc-Handouts').slideToggle();
				$('#down-doc-Presentations').slideToggle();
				$('#down-doc-TrainingMaterial').slideToggle();
			},100)
		};

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			if ($rootScope.hasSlideShow){ // check if slide view is ON so that to cancel navigation
				event.preventDefault(); 				
			} else {
				$("html, body").stop().animate({scrollTop:0}, '5', 'swing');
			}
		});
		/**
		 * 
		 */
		vm.action = function (item){			
			$('#'+item.id).slideToggle();
			item.open = !item.open;		
			setTimeout(function (){
				window.scrollTo(0,70000);
			},300)
			
		};
		/**
		 * 
		 */
		vm.goTop = function (){
			$("html, body").stop().animate({scrollTop:0}, '5', 'swing');
		};
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
				var body = "<p>TCS <b>(TATA Consultancy Services Ltd.)</b> is a global leader in IT services, digital and business "
					+"solutions that partners with its clients to simplify, strengthen and transform their businesses."
					+"TCS has been recognized by Brand Finance as one of the Big 4 Global IT Services Brands. Along "
					+"with ensuring the highest levels of certainty and satisfaction to the clients, TCS always believes in "
					+"giving back to society and has created a strong CSR (Corporate Social Responsibility) foot print.<br><br>"
					+"TCS’ commitment to CSR stems from Tata Group’s abiding concern for society and environment. At TCS, "
					+"CSR programs seek to create sustainable well-being. The guiding principle is 'Impact through Empowerment', "
					+"where outcomes and measureable impacts are delivered through a long term sustained effort.<br><br>"
					+"TCS team was involved in the e-Jagratha pro​ject from its initial days of conceptualization. The core team formed worked "
					+"closely with the honorable District Collector​ Mr.​ K. Mohammed Y. Safirulla ​ IAS, ​to​wards​ understand​ing​ his "
					+"vision and implement​ing​ it. <br><br>"
					+"Once the pro​ject was defined​,​ the team started working on the course content, coming up with detailed "
					+"training documentation in both English and Malayalam and presentations. The entire content was created "
					+"from scratch and this course content was reviewed with the IT mission representatives to ensure that the "
					+"course is indeed covering all the required focus areas. Handouts and other supporting documents were prepared "
					+"for ensuring that the master trainers are not missing any information which they need.<br><br>"
					+"The TCS team ​worked in parallel with the district administration for the master training for Phase 1. " 
					+"The training was conducted in TCS premises in two separate sessions and the trainings were conducted by the "
					+"TCS team on 12th and 19th of November 2016 ​covering​ 101 government high schools. Mr. Francis Perera (Ex. Cyber Cell Officer) "
					+"from TCS Admin has shared his experience with the attendees, which was a highlight for the master training.<br><br>"
					+"Once the ​'​​Train the Trainer' ​event ​was concluded for Phase 1, the immense task before the TCS team was to support the in​- school  "
					+"were present to support the master trainers when they were spreading the awareness on internet to their school mates. "
					+"After the conclusion of the Phase 1, the team regrouped for the preparation and execution of Phase 2 master training. The Phase 2 trainings were executed on 5th and 6th of January 2017.<br><br>"
					+"Around close to 75 associates have contributed their efforts towards e-jagratha till now and this count is keeping on increasing​. "
					+"Associates involved in the ejagratha pro​ject has always expressed their happiness and satisfaction on "
					+"how they are helping the next generation to be more aware on the consequences of increased internet and mobile usage.</p>";
				apiService.showPopUp("Team TCS", body);
			} else {
				var body = "<p>e-Jagratha, the internet awareness project was launched by Ernakulam District Administration under the "
					+"meticulous guidance of honorable District Collector Mr. K. Mohammed Y. Safirulla IAS.<br><br>"
					+"With more digitalization, the world is becoming small today. Access to information and communication "
					+"across the world is becoming easier. Internet is influencing today’s society in all aspects of life, be it "
					+"education, shopping, banking or any other activity. But at the same time, the crime rate in the web "
					+"world is also growing. What can be done to create a society which use internet to bring out the "
					+"advantages it offers and at the same time keep the dangers at bay.<br><br>"
					+"With this thought, our respected District Collector Mr. K. Mohammed Y. Safirulla IAS, came up with the "
					+"idea of eJagratha. Today’s students are tomorrow’s citizen. If the students are educated of the "
					+"intricacies involved in internet usage, we believe that we can create a society that is more aware on "
					+"where to pause in internet.<br><br>"
					+"eJagratha focuses on bringing the basic awareness on internet usage among High School students. The "
					+"program along with bringing out the possibilities of e-world, creates awareness on the cyber threats and the cyber laws.<br><br>"
					+"This program was conceptualized in September 2016 and currently Phase 2 activities are going on.<br><br>"
					+"<b><u>Phase 1</u></b><br>"
					+"Phase 1 spanned from October to December 2016. Phase 1 was launched by our respected Revenue "
					+"Principal Secretary Mr. P.H. Kurian IAS, on 21 st October 2016.<br><br>"
					+"Phase 1 included the below activities:<br><br>"
					+"1) Creating the course content<br>"
					+"2) Master training of identified candidates from 101 Government schools in Ernakulam district<br>"
					+"3) Propagation of the training to rest of the school students by Master trainers in TCS volunteer presence<br><br>"
					+"The master training by TCS was conducted on 12 th and 19 th of November 2016, at TCS Center.<br><br>"
					+"<b><u>Phase 2</u></b><br>"
					+"The second phase focuses on extending the eJagratha training to 175 aided schools in Ernakulam "
					+"District. The unaided schools attended the master training conducted, at TCS Center, on 5th and 6th "
					+"January 2017. The trainings in schools by the master trainers are planned to be completed by the end of February.<br><br>"
					+"The Phase 2 activities also include:<br><br>"
					+"1) Awarding cash prize (Rs. 1000) for 3 best performing students identified from the schools involved in both phases<br>"
					+"2) Creating a bank account for these students<br>"
					+"3) Providing basic e-banking information to these students<br><br>"
					+"The vision for the upcoming phases is to spread cyber awareness to unaided school students and to their parents.";
				apiService.showPopUp("e-Jagratha : A Glance", body);
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