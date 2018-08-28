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
                    $scope.DonutData = {
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
                            $scope.DonutData=transData(data);
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
                                ['min_margin', chartData.min_margin],
                                ['max_margin', chartData.max_margin]
                            ],
                            type:'donut',
                            onclick: function (d, i) { console.log("onclick", d, i); },
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

                    // 监 听,  修改数据放在controller
                    scope.$watch('_id', function () {
                        console.log("data");
                        c3.generate({
                            bindto: '#'+ scope._id,
                            data: scope.DonutData,
                            donut:{
                                title: "Iris Petal Width",
                            },
                            color: {
                                pattern: ['#1ab394','#a7b1af','#76a6df'] // the three color levels for the percentage values.
                            }
                        });
                    });
                }
            };
        }]);
})();