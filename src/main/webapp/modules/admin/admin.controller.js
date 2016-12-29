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
				 }, function fail(fail){
					 vm.formData = {}; // clears the login form data
					 vm.logging = false; // turns the flag off for logginIn
				 });			
			 }, function fail(fail){
				 vm.logging = false; // turns the flag off for logginIn
				 vm.formData = {}; // clears the login form data							
			 });			 
		 }
	}

})();