(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.24
     * @group directive
     * @name  tableDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('tableDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/table/table.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope,$http, $filter, $element, $attrs, AuthService) {
                    $scope._id =  '_id';
                    $scope.title = "";
                    $scope.logData = {
                        title:"",
                        piechart: []

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

                    //表格中小型pie图的配色设置
                    $scope.piechartOptions = {
                        options: {
                            fill: ["#1ab394","#d7d7d7", "#d71a60"]
                        }
                    };


                    $scope.setIconClass = function (level) {
                        switch(level)
                        {
                            case 'INFO':
                                return 'fa fa-check text-navy';
                                break;
                            case 'POST':
                                return 'fa fa-envelope-o text-warning';
                                break;
                            case 'HEAD':
                                return 'fa fa-star text-warning';
                                break;
                            default:
                                return 'fa fa-minus-circle';
                        }
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