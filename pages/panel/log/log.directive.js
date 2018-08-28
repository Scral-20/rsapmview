(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.24
     * @group directive
     * @name  logDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('logDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/log/log.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope,$http, $filter, $element, $attrs, AuthService) {
                    $scope._id =  '_id';
                    $scope.title = "";
                    $scope.logData = {
                        title:"",
                        hinge: []
                    };

                    console.log("HERE URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        $http.get(
                            AuthService.getURL() + $attrs.url+ period
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.logData = response.data;

                            if (typeof($scope.logData.title) !== "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = $scope.logData.title;
                            }
                        }, function () {
                            console.log("logDiagram no data");
                        });
                    };

                    $scope.date = function (timestamp) {
                        return $filter("date")(timestamp, "HH:mm:ss yyyy-MM-dd ");
                    };

                    $scope.setLevelColor = function (level) {
                        switch (level) {
                            case 'INFO':
                                return 'color: #1AB394';
                                break;
                            // case 'POST':
                            //     return 'color: #FF8C00';
                            //     break;
                            case 'GET':
                                return 'color: #FF1F3D';
                                break;
                            default:
                                return 'color: #0e9aef';
                        }
                    };


                },

                link: function(scope, element, attrs) {
                    scope.$watch('currentPeriod', function () {
                        // alert(scope.currentPeriod === "");
                        if (scope.currentPeriod === "") return;
                        console.log("currentPeriod = " + scope.currentPeriod);
                        scope.getData(scope.currentPeriod);
                    });

                    scope.$watch('_id', function () {
                        console.log("data");
                    });
                }
            };
        }]);
})();