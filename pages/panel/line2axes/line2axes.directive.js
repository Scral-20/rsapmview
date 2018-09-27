(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.09.04
     * @group directive
     * @name line2axesDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('line2axesDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/line2axes/line2axes.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope, $http, $element, $attrs, AuthService) {
                    $scope._id =  '_' + Math.random().toString(36).substr(2, 9);

                    $scope.localtitle = $attrs.localtitle;
                    if (typeof($scope.localtitle) === "undefined") $scope.localtitle ="panal title";
                    $scope.ylabel = $attrs.ylabel;
                    $scope.ymin = $attrs.ymin;
                    $scope.ymax = $attrs.ymax;
                    $scope.y2label = $attrs.y2label;
                    $scope.y2min = $attrs.y2min;
                    $scope.y2max = $attrs.y2max;
                    $scope.types = $attrs.types;
                    $scope.groups = $attrs.groups;
                    $scope.axes = $attrs.axes;

                    $scope.names = $attrs.names;
                    if (typeof($scope.names) === "undefined") $scope.names ="{}";
                    // console.log(JSON.parse($scope.names));

                    $scope.c3Axis = {};
                    $scope.c3Data = {
                        columns: []
                    };

                    $scope.getData = function (period) {
                        var getUrl = AuthService.getURL() + $attrs.url + period;
                        console.log(getUrl);
                        $http.post(
                            getUrl,
                            JSON.parse($scope.names)
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data.message);
                            $scope.c3Axis = transAxis();
                            $scope.c3Data = transData(response.data.message);
                            $scope._id = $scope.localtitle.replace(/ /g, "_")+$scope._id;
                        }, function () {
                            console.log("lineDiagram no data");
                        });
                    };

                    function transAxis() {
                        var res = {};
                        res['x'] = {
                            type: 'timeseries',
                            height: 40,
                            tick: {
                                format: '%H:%M:%S     %Y/%m/%d',
                                count:20
                            },
                            padding: {left:0, right:0}
                        };
                        var y = {};
                        if (typeof($scope.ylabel) !== "undefined") {
                            y['label'] = $scope.ylabel;
                        }
                        if (typeof($scope.ymin) !== "undefined") {
                            y['min'] = parseFloat($scope.ymin);
                        }
                        if (typeof($scope.ymax) !== "undefined") {
                            y['max'] = parseFloat($scope.ymax);
                        }
                        y['padding'] = {top:0, bottom:0};
                        res['y'] = y;

                        var y2 = {};
                        y2['show'] = true;
                        if (typeof($scope.y2label) !== "undefined") {
                            y2['label'] = $scope.y2label;
                        }
                        if (typeof($scope.y2min) !== "undefined") {
                            y2['min'] = parseFloat($scope.y2min);
                        }
                        if (typeof($scope.y2max) !== "undefined") {
                            y2['max'] = parseFloat($scope.y2max);
                        }
                        y2['padding'] = {top:0, bottom:0};
                        res['y2'] = y2;

                        return res;
                    }

                    function transData(chartData) {
                        var res = {
                            x: 'timeaxis',
                            columns: [],
                            types: {},
                            groups: [],
                            axes: {}
                        };
                        if (typeof(chartData) === "undefined") {
                            return res;
                        }

                        for (var i = 0; i < chartData.length; i++) {
                            var tmp = [];
                            tmp.push(chartData[i].key);
                            for (var j = 0; j < chartData[i].value.length; j++) {
                                if(chartData[i].key === 'timeaxis'){
                                    tmp.push(chartData[i].value[j]);
                                }else {
                                    tmp.push(Number(chartData[i].value[j]).toFixed(2));
                                }
                            }
                            res.columns.push(tmp);
                        }

                        if (typeof($scope.types) !== "undefined") {
                            res.types = JSON.parse($scope.types);
                        }

                        if (typeof($scope.groups) !== "undefined") {
                            res.groups = JSON.parse($scope.groups);
                        }

                        if (typeof($scope.axes) !== "undefined") {
                            res.axes = JSON.parse($scope.axes);
                        }
                        return res;
                    }

                },
                link: function(scope, element, attrs) {
                    scope.$watch('currentPeriod', function () {
                        if (typeof(scope.currentPeriod) ==="undefined" || scope.currentPeriod === "") return;
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