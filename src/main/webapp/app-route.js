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
                templateUrl: 'modules/schoolList/aidedSchool/aidedSchool.html',
                controller: '',
                controllerAs: 'vm'
            })
            .state('app.schoolDetail', {
                url: 'schoolDetail/:schoolId',
                templateUrl: 'modules/schoolDetail/schoolDetail.html',
                controller: 'schoolDetailsController',
                controllerAs: 'vm'
            }) 
            .state('app.admin', {
                url: 'admin',
                templateUrl: 'modules/test/test.html',
                controller: 'testCtrl',
                controllerAs: 'vm'
            });


        $urlRouterProvider.otherwise('home');
    }

})();