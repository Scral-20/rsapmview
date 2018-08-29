(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.01
     * @group directive
     * @name  pieDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('pieDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/pie/pie.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope, $http, $element, $attrs, AuthService) {
                    $scope._id =  '_id';
                    $scope.title = "";
                    $scope.chartData = {};
                    $scope.pieData = {
                        columns: []
                    };

                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        $http.get(
                            AuthService.getURL() + $attrs.url +period
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.chartData = response.data;
                            var data=$scope.chartData;
                            $scope.pieData=transData(data.columns);
                            if (typeof($scope.chartData.title) !== "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = $scope.chartData.title;
                            }

                        }, function () {
                            console.log("pieDiagram no data");
                        });
                    };

                    // res = {
                    //     columns: [
                    //         [chartData.columns[5].key, chartData.columns[5].value[endnum]],
                    //         ['Heap NonUsed', chartData.columns[3].value[endnum]-chartData.columns[5].value[endnum]]
                    //     ],
                    //     type:'pie'
                    // };

                    // res['x'] = {
                    //     type: 'timeseries',
                    //     tick: {
                    //         format: '%H:%M:%S           %m月%d日'
                    //     },
                    //     padding: {left:0, right:0}
                    // };

                    function transData(pieData) {
                        var total=0;
                        var hinge=0;


                        var res={};
                        for (var i=0; i<pieData.total.value.length;i++){
                            total += pieData.total.value[i]
                        }
                        for (var j=0;i<pieData.hinge.value.length;j++){
                            hinge += pieData.hinge.value[i];
                            alert('长度'+ hinge);
                        }

                        res = {
                            columns: [
                                ['关键日志',hinge],
                                ['常规日志',total]
                            ],
                            type:'pie'
                        };
                        return res
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
                            data: scope.pieData,
                            color:{
                                pattern: ['#1ab394','#90c0ff']
                            }
                    });
                    });
                }
            };
        }]);
})();