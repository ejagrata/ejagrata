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
                url: 'schoolList/:distId',
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
                controller: '',
                controllerAs: 'vm'
            })
            .state('app.schoolList.unaided', {
                url: '/unaided',
                templateUrl: 'modules/schoolList/unAidedSchool/unAidedSchool.html',
                controller: '',
                controllerAs: 'vm'
            })
            .state('app.schoolDetail', {
                url: 'schoolDetail/:schoolId',
                templateUrl: 'modules/schoolDetail/schoolDetail.html',
                controller: 'schoolDetailsController',
                controllerAs: 'vm'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'modules/admin/admin.html',
                controller: 'adminController',
                controllerAs: 'vm'
            })
            .state('admin.schoolStatus', {
                url: '/schoolStatus',
                templateUrl: 'modules/admin/schoolStatus/schoolStatus.html',
                controller: 'schoolStatusController',
                controllerAs: 'vm'
            })
            .state('admin.schoolUpload', {
                url: '/schoolUpload',
                templateUrl: 'modules/admin/schoolUpload/schoolUpload.html',
                controller: 'schoolUploadController',
                controllerAs: 'vm'
            });


        $urlRouterProvider.otherwise('home');
    }

})();