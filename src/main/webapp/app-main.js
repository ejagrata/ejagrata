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