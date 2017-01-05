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