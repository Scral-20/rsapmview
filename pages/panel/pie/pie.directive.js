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
                    $scope.PieData = {
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
                            $scope.PieData=transData(data);
                            if (typeof($scope.chartData.title) !== "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = 'Occupation Ratio Of '+$scope.chartData.title;
                            }

                        }, function () {
                            console.log("pieDiagram no data");
                        });
                    };

                    function transData(chartData) {
                        var res={};
                        var endnum;
                        switch(chartData.title)
                        {
                            case 'CPU Load':
                                if (typeof(chartData.columns) === "undefined") {
                                    return res;
                                }
                                 endnum=chartData.columns[1].value.length-1;
                                 res = {
                                    columns: [
                                        [chartData.columns[1].key, chartData.columns[1].value[endnum]],
                                        [chartData.columns[2].key, chartData.columns[2].value[endnum]]
                                    ],
                                    type:'pie'
                                };
                                return res;
                                break;
                            case 'Memory Used':
                                if (typeof(chartData.columns) === "undefined") {
                                    return res;
                                }
                                endnum=chartData.columns[3].value.length-1;
                                 res = {
                                    columns: [
                                        [chartData.columns[5].key, chartData.columns[5].value[endnum]],
                                        ['Heap NonUsed', chartData.columns[3].value[endnum]-chartData.columns[5].value[endnum]]
                                    ],
                                    type:'pie'
                                };
                                return res;
                                break;
                            default:
                                return res;
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
                        c3.generate({
                            bindto: '#'+ scope._id,
                            data: scope.PieData,
                            color:{
                                pattern: ['#1ab394','#90c0ff']
                            }
                    });
                    });
                }
            };
        }]);
})();