(function () {
    "use strict";

    angular
        .module('eJag')
        .controller('testCtrl', testCtrl);

    /* ngInject */
    function testCtrl($scope, apiService) {
        var vm = this;
        init();

        function init() {            
           apiService.serviceRequest({
               URL : 'ejag.json'
           }, function (response){
           vm.schoolList = response;
           }, function (){
           
           });
        }      

    }

})();