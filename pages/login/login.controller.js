(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.07.23
     * @group Controller
     * @name LoginCtrl
     * @class
     */
    angular.module('inspinia')
        .controller( 'LoginCtrl', ['$scope', '$http', '$state', '$window', 'AuthService',
            function ($scope, $http, $state, $window, authService) {
                $scope.loginSubmit = function (formData) {
                    var data = {
                        username : formData.username,
                        password : formData.password
                    };
                    // alert(data);
                    console.log(data);
                    // console.log(authService.getURL());
                    //$state.go('rs.topview');
                    // $http.post(authService.getURL() + "/auth/login", data).then(
                    //     function(response) {
                    //         authService.setJwtToken(response.data.access_token);
                    //          //$state.go('rs.TOMCATalertmanagement');
                    //         // $state.reload();
                    //         $state.go('rs.topview').then(
                    //             // function() {
                    //             //     $window.location.reload();
                    //             // }
                    //         );
                    //     },
                    //     function() {
                    //         alert("密码或用户名错误");
                    //     }
                    // );
                };

                //$state.go('rs.TOMCATreport');

                $scope.backHome = function () {
                    $state.go('landing').then(
                        function() {
                            $window.location.reload();
                        }
                    );
                };
            }
        ]);
})();