(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.07.30
     * @group directive
     * @name lineDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('line2yaxisDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/line2yaxis/line2yaxis.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope, $http, $element, $attrs, AuthService) {
                    $scope._id = '_id';
                    $scope.title = "";
                    $scope.localtitle = $attrs.localtitle;
                    $scope.columnsSelected = $attrs.columnsSelected;   //在属性columns中选择需要显示的折线
                    $scope.chartData = {};
                    $scope.c3Axis = {};
                    $scope.c3Data = {
                        columns: []
                    };

                    //console显示所选数据类型，观察是否出错
                    console.log("columnsSelected: "+typeof ($scope.columnsSelected));
                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        $http.get(
                            AuthService.getURL() + $attrs.url + period
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.chartData = response.data;

                            if (typeof($scope.chartData.title) !== "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = $scope.localtitle + ' ' + $scope.chartData.title;
                            }
                            $scope.List = getList($scope.chartData);
                            $scope.c3Axis = transAxis($scope.chartData);
                            $scope.c3Data = transData($scope.chartData,$scope.List);
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
                                format: '%H:%M:%S         %Y.%m.%d',
                                count: ''
                            },
                            padding: {left:0, right:0}
                        };

                        var y = {}, y2 = {};
                        if (typeof(chartData.yLabel) !== "undefined") {
                            y['label'] = $scope.chartData.yLabel;
                        }
                        if (typeof(chartData.min) !== "undefined") {
                            y['min'] = $scope.chartData.min;
                        }
                        if (typeof(chartData.max) !== "undefined") {
                            y['max'] = $scope.chartData.max;
                        }
                        y['padding'] = {top:0, bottom:0};
                        res['y'] = y;

                        y2['show'] = true;
                        if (typeof(chartData.y2Label) !== "undefined") {
                            y2['label'] = $scope.chartData.y2Label;
                        }
                        if (typeof(chartData.min2) !== "undefined") {
                            y2['min'] = $scope.chartData.min2;
                        }
                        if (typeof(chartData.max2) !== "undefined") {
                            y2['max'] = $scope.chartData.max2;
                        }
                        y2['padding'] = {top:0, bottom:0};
                        res['y2'] = y2;
                        return res;
                    }

                    function transData(chartData,List) {
                        var res = {
                            x: 'x',
                            columns: [],
                            types: {},
                            groups: [],
                            axes: {}
                        };
                        if (typeof(chartData.columns) === "undefined") {
                            return res;
                        }

                        for (var i = 0; i < chartData.columns.length; i++) {
                            if( !ifItemInList(chartData.columns[i].key,List)){
                                continue;
                            }
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

                            if (typeof(chartData.columns[i].axes) !== "undefined" && chartData.columns[i].axes === 'y2') {
                                res.axes[chartData.columns[i].key] = 'y2';
                            }
                        }
                        if (typeof(chartData.groups) !== "undefined") {
                            res.groups = chartData.groups;
                        }
                        return res;
                    }

                    //list列的即为所选的数据key值
                    function ifItemInList(item,list) {
                        for(var i = 0; i < list.length; i++){
                            if(item === list[i]){
                                return true
                            }
                        }
                        return false
                    }

                    //若标签columns属性未写，则默认获取全部key与value,否则按columns属性获取数据
                    function getList(chartData) {
                        var List=[];
                        if (typeof ($scope.columnsSelected)==="undefined" || $scope.columnsSelected===""){
                            for(var i =0; i< chartData.columns.length; i++){
                                List[i]= chartData.columns[i].key;
                            }
                        }else {
                            List=$scope.columnsSelected.split(',');
                        }
                        return List;
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
                        c3.generate({
                            bindto: '#'+ scope._id,
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