(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.09.04
     * @group Controller
     * @name ProbeslistCtrl
     * @class
     */
    angular.module('inspinia')
        .controller( 'ProbeslistCtrl', ['$scope', '$http', '$state', '$stateParams', '$window', 'AuthService',
            function ($scope, $http, $state, $stateParams, $window, authService) {
                alert('key:'+$stateParams.key);
                $scope.key = $stateParams.key;
                $scope.pageTitle = $state.current.data.pageTitle;
                $scope.routeName = $state.current.data.routeName;
            }
        ]);
})();