(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('schoolUploadController', schoolUploadController);

    /* ngInject */
    function schoolUploadController($scope, apiService) {
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
            // school type list
            vm.schoolType = [{
                id: 1,
                value: "Aided"
             }, {
                id: 2,
                value: "Government"
             }, {
                id: 3,
                value: "UnAided"
             }];
            // session status list
            vm.sessionStatus = [{
                id: 1,
                value: "Completed"
             }, {
                id: 2,
                value: "Pending"
             }];
            // educational District List
            vm.educationDist = [{
                id: 1,
                value: "Aluva"
             }, {
                id: 2,
                value: "Ernakulam"
             }, {
                id: 3,
                value: "Kothamangalam"
             }, {
                id: 4,
                value: "Muvattupuzha"
             }];
        };

        /**
         * on save logic
         **/
        vm.onSave = function () {
            apiService.showAlert({
                text: "Request Placed Successfully !!"
            }, function () {
                varInit();
            });
        }
    }

})();