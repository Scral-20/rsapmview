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
                    $scope.unit=$attrs.unittype;
                    $scope.title = $attrs.localtitle;
                    $scope.names = $attrs.names;
                    $scope.data =     {
                        "SystemCpuLoadAvg": "",
                        "SystemCpuLoadMin": "",
                        "SystemCpuLoadMax": "",
                        "SystemCpuLoadCount": "",
                        "SystemCpuLoadSum": ""
                    };

                    $scope.gaugeData = {
                        columns: [],
                        type:{}
                    };

                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        var getUrl = AuthService.getURL() + $attrs.url + period;
                        $http.post(
                            getUrl,
                            JSON.parse($scope.names),
                            {headers : AuthService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            // console.log(response.data.code);
                            // console.log(response.data.message[0]);
                            var data = response.data.message[0];

                             $scope.max_value=(100*data.SystemCpuLoadMax).toFixed(2);
                             $scope.min_value=(100*data.SystemCpuLoadMin).toFixed(2);
                            //$scope.max=data.max;
                            $scope.avg=ifnoAvg(data.SystemCpuLoadAvg);
                            $scope.maxpercent=maxPercent(data.SystemCpuLoadMax);
                            $scope.minpercent=minPercent(data.SystemCpuLoadMin);

                            $scope.gaugeData=transData(data);
                            $scope.drawGauge=drawGauge(data);

                            if (typeof(data) != "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                            }
                        }, function () {
                            console.log("gaugeDiagram no data");
                        });
                    };

                    function ifnoAvg(avg) {
                        if (typeof(avg) === "undefined") {
                            return '----';
                        }
                        return Number(avg*100).toFixed(2)+"%";
                    }

                    function transData(chartData) {
                        var res={};
                        if (typeof(chartData) === "undefined") {
                            return res;
                        }
                        var res = {
                            columns: [
                                ['峰值占比',100*chartData.SystemCpuLoadMax.toFixed(2)],
                                ['谷值占比',100*chartData.SystemCpuLoadMin.toFixed(2)]
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

                            min: 0,
                            max: 100,
                            width: 39
                        };
                        return res;
                    }

                    function maxPercent(percent) {
                        if (typeof(percent) === "undefined") {
                            return ;
                        }
                        return (100 * parseFloat(percent).toFixed(4)).toFixed(2)+'%';

                    }


                    function minPercent(percent) {
                        if (typeof(percent) === "undefined") {
                            return ;
                        }
                        return (100 * parseFloat(percent).toFixed(4)).toFixed(2)+'%';
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