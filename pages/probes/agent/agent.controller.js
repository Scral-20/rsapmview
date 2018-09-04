(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.09.04
     * @group Controller
     * @name AgentCtrl
     * @class
     */
    angular.module('inspinia')
        .controller( 'AgentCtrl', ['$scope', '$http', '$state', '$stateParams', '$window', 'AuthService',
            function ($scope, $http, $state, $stateParams, $window, authService) {
                // alert($stateParams.key);
                $scope.pageTitle = $state.current.data.pageTitle;
                $scope.routeName = $state.current.data.routeName;
                $scope.key = $stateParams.key;
            }
        ]);
})();