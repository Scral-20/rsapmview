(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.07
     * @group directive
     * @name  donutDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('donutDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/donut/donut.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope, $http, $element, $attrs, AuthService) {
                    $scope._id ='_id';
                    $scope.title = "";
                    $scope.chartData = {};
                    $scope.donutData = {
                        columns: []
                    };

                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        $http.get(
                            AuthService.getURL() + $attrs.url + period
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.chartData = response.data;
                            var data=$scope.chartData;
                            $scope.donutData=transData(data);
                            if (typeof($scope.chartData.title) != "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = $scope.chartData.title;
                            }

                        }, function () {
                            console.log("donutDiagram no data");
                        });
                    };

                    function transData(chartData) {
                        var res={};
                        if (typeof(chartData) == "undefined") {
                            return res;
                        }
                        var res = {
                            // columns: [
                            //     [chartData.columns[3].key, chartData.columns[3].value],
                            //     [chartData.columns[4].key, chartData.columns[4].value],
                            //     ['data3', 5]
                            // ],

                            columns: [
                                ["data1",40],
                                ["data2",70],
                                ["data3",20]
                            ],
                            empty: {
                                label: {
                                    text: "No Data "
                                }
                            },
                            type:'donut'
                        };
                        return res;
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
                        c3.generate({
                            bindto: '#'+ scope._id,
                            data: scope.donutData,
                            color: {
                                pattern: ['#1ab394','#a7b1af','#A4CEE8'] // the three color levels for the percentage values.
                            }
                        });
                    });
                }
            };
        }]);
})();