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
                    $scope.title = $attrs.localtitle;
                    $scope.names= $attrs.names;
                    $scope.remark= $attrs.remark;
                    $scope.data = {
                        HeapUsed:'',
                        HeapMax:'',
                        NonHeapUsed:'',
                        NonHeapMax:''
                    };
                    $scope.pieData = {
                        columns: [],
                        type:''
                    };

                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        var getUrl=AuthService.getURL() + $attrs.url + period;
                        $http.post(
                            getUrl,
                            JSON.parse($scope.names)
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data.message[0]);
                            var data = response.data.message[0];
                            if (typeof(data) !== "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                            }

                            switch($scope.remark) {
                                case "Heap":
                                    $scope.Used=data.HeapUsed;
                                    $scope.unUsed=data.HeapMax-data.HeapUsed;
                                    break;
                                case "NoHeap":
                                    $scope.Used=data.NonHeapUsed;
                                    $scope.unUsed=data.NonHeapMax-data.NonHeapUsed;
                                    break;
                                default:
                                    return
                            }

                            $scope.pieData=transData($scope.Used,$scope.unUsed);

                        }, function () {
                            console.log("pieDiagram no data");
                        });
                    };

                    function transData(Used,unUsed) {
                        var res={};
                        res = {
                            columns: [
                                ['已使用',Used],
                                ['未使用',unUsed]
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
                        c3.generate({
                            bindto: '#'+ scope._id,
                            data: scope.pieData,
                            color:{
                                pattern: ['#1ab394','#c7d1cf']
                            }
                    });
                    });
                }
            };
        }]);
})();