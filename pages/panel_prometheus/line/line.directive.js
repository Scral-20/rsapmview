(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.09.04
     * @group directive
     * @name linePrometheusDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('linePrometheusDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel_prometheus/line/line.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope, $http, $element, $attrs, AuthService) {
                    $scope._id =  '_' + Math.random().toString(36).substr(2, 9);
                    $scope.localtitle = $attrs.localtitle;
                    if ($scope.localtitle === "undefined") $scope.localtitle ="";
                    $scope.ylabel = $attrs.ylabel;
                    $scope.ymin = $attrs.ymin;
                    $scope.ymax = $attrs.ymax;

                    $scope.chartData = {};
                    $scope.c3Axis = {};
                    $scope.c3Data = {
                        columns: []
                    };

                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        var getUrl = AuthService.getURL() + $attrs.url + $attrs.name + "/" + "1h";
                        console.log(getUrl);
                        $http.get(
                            getUrl
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.chartData = response.data;

                            // $scope.c3Axis = transAxis($scope.chartData);
                            // $scope.c3Data = transData($scope.chartData);
                        }, function () {
                            console.log("lineDiagram no data");
                        });
                    };

                    function transAxis(chartData) {
                        var res = {};
                        res['x'] = {
                            type: 'timeseries',
                            height: 40,
                            tick: {
                                format: '%H:%M:%S     %Y/%m/%d',
                                count: tickCount($scope.tickcount)
                            },
                            padding: {left:0, right:0}
                        };
                        var y = {};
                        if (typeof(chartData.yLabel) !== "undefined") {
                            y['label'] = $scope.ylabel;
                        }
                        if (typeof(chartData.min) !== "undefined") {
                            y['min'] = $scope.ymin;
                        }
                        if (typeof(chartData.max) !== "undefined") {
                            y['max'] = $scope.ymax;
                        }
                        y['padding'] = {top:0, bottom:0};
                        res['y'] = y;
                        return res;
                    }

                    function transData(chartData) {
                        var res = {
                            x: 'x',
                            columns: [],
                            types: {},
                            groups: []
                        };
                        if (typeof(chartData.columns) === "undefined") {
                            return res;
                        }

                        for (var i = 0; i < chartData.columns.length; i++) {
                            var tmp = [];
                            tmp.push(chartData.columns[i].key);
                            for (var j = 0; j < chartData.columns[i].value.length; j++) {
                                if(chartData.columns[i].key === 'x'){
                                    tmp.push(chartData.columns[i].value[j]);
                                }else {
                                    tmp.push(Number(chartData.columns[i].value[j]).toFixed(2));
                                }
                                //tmp.push(chartData.columns[i].value[j]);
                            }
                            res.columns.push(tmp);

                            if (typeof(chartData.columns[i].type) !== "undefined") {
                                res.types[chartData.columns[i].key] = chartData.columns[i].type;
                            }
                        }
                        if (typeof(chartData.groups) !== "undefined") {
                            res.groups = chartData.groups;
                        }
                        return res;
                    }

                },
                link: function(scope, element, attrs) {
                    // console.log(scope._id);
                    scope.$watch('currentPeriod', function () {
                        // alert(scope.currentPeriod === "");
                        if (scope.currentPeriod === "") return;
                        console.log("currentPeriod = " + scope.currentPeriod);
                        scope.getData(scope.currentPeriod);
                    });

                    scope.$watch('_id', function () {
                        c3.generate({
                            bindto: '#'+scope._id,
                            data: scope.c3Data,
                            axis: scope.c3Axis,
                            point: {
                                show: false
                            }
                        });
                    });

                }
            };
        }]);
})();