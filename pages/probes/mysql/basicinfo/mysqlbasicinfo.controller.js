(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.08.28
     * @group Controller
     * @name MysqlbasicinfoCtrl
     * @class
     */
    angular.module('inspinia')
        .controller( 'MysqlbasicinfoCtrl', ['$scope', '$http', '$state', '$stateParams', '$window', 'AuthService',
            function ($scope, $http, $state, $stateParams, $window, authService) {

                $scope.key = $stateParams.key;
                $scope.currentPeriod = '1h';

                $scope.getData = function () {

                    $http.get(
                        authService.getURL() + "/basicinfo/" + $stateParams.key,
                        {headers : authService.createAuthorizationTokenHeader()}
                    ).then(function (response) {
                        // console.log("yes");
                        console.log(response.data);
                        var data = response.data;
                    }, function () {
                        console.log("basicinfo no data");
                    });

                };

                $scope.setPeriod = function ( period ) {
                    $scope.currentPeriod = period;
                };

                // $scope.getData();

            }
        ]);
})();