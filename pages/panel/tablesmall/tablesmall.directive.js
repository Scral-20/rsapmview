(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.24
     * @group directive
     * @name  tablesmallDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('tablesmallDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/tablesmall/tablesmall.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope,$http, $filter, $element, $attrs, AuthService) {
                    $scope._id =  '_id';
                    $scope.title = "";
                    $scope.tableData = {
                        title: "",
                        count: [],
                        duration: []
                    };

                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        $http.get(
                            AuthService.getURL() + $attrs.url+ period
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.tableData = response.data;
                            
                            if (typeof($scope.title) != "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = $scope.tableData.title;
                            }
                        }, function () {
                            console.log("logDiagram no data");
                        });
                    };





                    //排序
                    $scope.sortOrder = "id";
                    $scope.reservse = true;
                    $scope.sort = function (ziduan) {
                        console.log(ziduan);
                        if (ziduan == $scope.sortOrder) {
                            $scope.reservse = !$scope.reservse;
                        } else {
                            $scope.reservse = false;
                        }
                        $scope.sortOrder = ziduan;
                    };

                    $scope.getClass = function (field) {
                        if ($scope.sortOrder == field) {
                            if ($scope.reservse == true) {
                                return 'top';
                            } else {
                                return 'bot';
                            }
                        }
                    }

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