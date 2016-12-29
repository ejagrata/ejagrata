(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('schoolDetailsController', schoolDetailsController);

    /* ngInject */
    function schoolDetailsController($scope, $state, $stateParams) {
        var vm = this;
        init();

        function init() {
        	vm.schoolDetails = JSON.parse($stateParams.schoolDetails);
            console.log(vm.schoolDetails);
            vm.slides = [];
            if (vm.schoolDetails.schoolDocumentBean && vm.schoolDetails.schoolDocumentBean.length > 0){
            	var imageList = vm.schoolDetails.schoolDocumentBean;
            	for (var i=0; i < imageList.length; i++){
            		vm.slides.push({
                        image: 'files/' + imageList[i].docId,
                        id : i
                    });
            	}
            }
            
            vm.myInterval = 3000;
            $scope.noWrapSlides = false;
            $scope.active = 0;
 

        }

    }

})();