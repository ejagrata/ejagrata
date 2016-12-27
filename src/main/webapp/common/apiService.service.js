(function () {
    angular
        .module('eJag')
        .service('apiService', apiService);

    function apiService($rootScope, $http, $q, $state, appConfig, $mdDialog) {

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
            // success function
            request.success(function (response) {
                success(response);
            });
            // error function
            request.error(function (response) {
                fail(response);
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
            $rootScope.popHeading = popHeading;
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
    }
})();