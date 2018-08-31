(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.07
     * @group directive
     * @name  gaugeDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('gaugeDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/gauge/gauge.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope,$http, $element, $attrs, AuthService) {
                    $scope._id =  '_id';
                    $scope.title = "";
                    $scope.chartData = {};
                    $scope.gaugeData = {
                        columns: [],
                        type:{}
                    };

                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        $http.get(
                            AuthService.getURL() + $attrs.url+ period
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.chartData = response.data;
                            var data=$scope.chartData;
                            $scope.avg=data.avg;
                            $scope.min_margin=data.min_margin.toFixed(2);
                            $scope.max_margin=data.max_margin.toFixed(2);
                            $scope.max=data.max;
                            $scope.title=data.title;

                            $scope.maxpercent=maxPercent(data);
                            $scope.minpercent=minPercent(data);
                            $scope.gaugeData=transData(data);
                            $scope.drawGauge=drawGauge(data);

                            if (typeof($scope.chartData.title) != "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = $scope.chartData.title;
                            }
                        }, function () {
                            console.log("gaugeDiagram no data");
                        });
                    };

                    function transData(chartData) {
                        var res={};
                        if (typeof(chartData) === "undefined") {
                            return res;
                        }
                        var res = {
                            columns: [
                                ['max_margin',chartData.max_margin.toFixed(2)],
                                ['min_margin',chartData.min_margin.toFixed(2)]
                            ],
                            type: 'gauge'
                        };
                        return res;
                    }

                    function drawGauge(chartData) {
                        var res={};
                        res = {
                            label: {
                                format: function (value, ratio) {
                                    return ;
                                },
                                show: true
                            },
                            size: {
                                height: 180
                            },

                            min: chartData.min,
                            max: chartData.max,
                            width: 39
                        };
                        return res;
                    }

                    function maxPercent(chartData) {
                        if (typeof(chartData) === "undefined") {
                            return ;
                        }
                        return (100 * parseFloat(chartData.max_margin/chartData.max).toFixed(4)).toFixed(2)+'%';

                    }


                    function minPercent(chartData) {
                        if (typeof(chartData) === "undefined") {
                            return ;
                        }
                        return (100 * parseFloat(chartData.min_margin/chartData.max).toFixed(4)).toFixed(2)+'%';
                    }

                    $scope.getMinStyle=function () {
                        return {
                            width: $scope.minpercent
                        }
                    };

                    $scope.getMaxStyle=function () {
                        return {
                            width: $scope.maxpercent
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
                            c3.generate({
                                bindto: '#' + scope._id,
                                data: scope.gaugeData,
                                gauge: scope.drawGauge,
                                color: {
                                    pattern: ['#1ab394','#a7b1af']
                                }
                            })
                    });
                }
            };
        }]);
})();