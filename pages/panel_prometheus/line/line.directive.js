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
                    if (typeof($scope.localtitle) === "undefined") $scope.localtitle ="panal title";
                    $scope.ylabel = $attrs.ylabel;
                    $scope.ymin = $attrs.ymin;
                    $scope.ymax = $attrs.ymax;
                    $scope.types = $attrs.types;
                    $scope.groups = $attrs.groups;

                    $scope.names = $attrs.names;
                    if (typeof($scope.localtitle) === "undefined") $scope.localtitle = "";

                    $scope.c3Axis = {};
                    $scope.c3Data = {
                        columns: []
                    };

                    $scope.getData = function (period) {
                        var getUrl = AuthService.getURL() + $attrs.url + $scope.names + "/" + period;
                        console.log(getUrl);
                        $http.get(
                            getUrl
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.c3Axis = transAxis();
                            $scope.c3Data = transData(response.data);
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
                                format: '%H:%M:%S     %Y/%m/%d'
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
                        return res;
                    }

                    function transData(chartData) {
                        var res = {
                            x: 'x',
                            columns: [],
                            types: {},
                            groups: []
                        };
                        if (typeof(chartData) === "undefined") {
                            return res;
                        }

                        for (var i = 0; i < chartData.length; i++) {
                            var tmp = [];
                            tmp.push(chartData[i].key);
                            for (var j = 0; j < chartData[i].value.length; j++) {
                                if(chartData[i].key === 'x'){
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