(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.07.23
     * @group Controller
     * @name CalltreeCtrl
     * @class
     */
    angular.module('inspinia')
        .controller( 'CalltreeCtrl', ['$scope', '$http', '$state', '$stateParams', '$window', 'AuthService',
            function ($scope, $http, $state, $stateParams, $window, authService) {

                $scope.key = $stateParams.key;
                // alert($scope.key);
                $scope.currentTab = "duration";
                $scope.activeTab = function (tab) {
                    $scope.currentTab = tab;
                };
            }
        ]);
})();