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

                $scope.setPeriod = function ( period ) {
                    $scope.currentPeriod = period;
                };

            }
        ]);
})();