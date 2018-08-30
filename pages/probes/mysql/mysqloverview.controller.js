(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.08.28
     * @group Controller
     * @name MysqloverviewCtrl
     * @class
     */
    angular.module('inspinia')
        .controller( 'MysqloverviewCtrl', ['$scope', '$http', '$state', '$stateParams', '$window', 'AuthService',
            function ($scope, $http, $state, $stateParams, $window, authService) {
                // alert($stateParams.key);
                $scope.pageTitle = $state.current.data.pageTitle;
                $scope.key = $stateParams.key;
            }
        ]);
})();