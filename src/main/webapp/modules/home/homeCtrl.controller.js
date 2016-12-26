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

        vm.test = function () {
            $state.go('app.schoolList', {
                distId: 2
            });
        }

        vm.showPopUp = function (popHeading) {
            if (popHeading == 'tcs') {
                var body = "<div> <p>202 Master Trainers selected from the 101 Government schools (including 1 student and 1 teacher form each school - Ernakulam, Aluva, Muvattupuzha & Kothamangalam) attended this training at TCS campus, on 12th Nov and 19th Nov. The District Collector & Assistant Collector had addressed the gathering.</p><p>This program was owned and driven by TCS Kochi (50 + associates, for over two and half months), starting from conceptualization to execution of this program. Tremendous effort was put towards preparing the course contents, handouts, etc. from scratch (in Malayalam, as well) and getting it reviewed and finalized by IT Mission representatives. Mr. Francis Perera (Ex. Cyber Cell Officer) from TCS Admin has shared his experience with the attendees, which was a highlight for the event.A TCS volunteer will help the master trainers to cascade the awareness session to 8th, 9th and 10th standard students in these schools and to their parents. Phase 1 of this program covered all Government schools in Ernakulum district.  But this will be an ongoing program and will be extended to the aided schools in Kochi also.</p></div>"
                apiService.showPopUp("Team TCS", body);
            } else {
                var body = '<p>"e-Jagratha Internet Security Awareness Program" has been officially launched by Revenue Principal Secretary P.H. Kurian on 21st Oct @ TCS Campus. The initiative put forward by Ernakulam District Collector Mohammed Y. Safirulla towards empowering Government High School students is being executed by TCS, in collaboration with Kerala Administration. It aims at promoting internet awareness and cyber safety among students.</p>';
                apiService.showPopUp("E-Jagratha : A Glance", body);
            }
        }
    }

})();