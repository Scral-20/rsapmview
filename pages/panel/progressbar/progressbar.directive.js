(function () {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.28
     * @group directive
     * @name  progressbarDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('progressbarDiagram', [function () {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/progressbar/progressbar.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope, $http, $filter, $element, $attrs, AuthService) {
                    $scope.localTitle = $attrs.localTitle;
                    $scope.itemTitle1 = $attrs.itemTitle1;
                    $scope.itemTitle2 = $attrs.itemTitle2;
                    $scope.itemTitle3 = $attrs.itemTitle3;
                    $scope.itemTitle4 = $attrs.itemTitle4;
                    $scope.progressbarData={
                        FastCount:"",
                        NormalCount:"",
                        VerySlowCount:"",
                        SlowCount:""
                    };

                    $scope.names = $attrs.names;

                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        var getUrl = AuthService.getURL() + $attrs.url + period;
                        console.log(getUrl);
                        $http.post(
                            getUrl,
                            JSON.parse($scope.names)
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data.message[0]);
                            $scope.progressbarData = response.data.message[0];
                            var data = $scope.progressbarData;
                            $scope.total = data.FastCount + data.NormalCount
                                + data.VerySlowCount + data.SlowCount;
                            if (typeof($scope.progressbarData) !== "undefined") {
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                // alert($scope.progressbarData.FastCount);
                            }
                        }, function () {
                            console.log("progressbarDiagram no data");
                        });
                    };

                    function Percentage(chartData) {
                        if (typeof(chartData) === "undefined") {
                            return;
                        }
                        return (100 * parseFloat(chartData / $scope.total).toFixed(4)).toFixed(2) + '%';
                    }

                    $scope.getStyle = function (value) {
                        return {
                            width: Percentage(value, $scope.progressbarData)
                        }
                    };

                    $scope.getPercentage = function (value) {
                        return Percentage(value, $scope.progressbarData);
                    };


                },

                link: function (scope, element, attrs) {
                    scope.$watch('currentPeriod', function () {
                        // alert(scope.currentPeriod === "");
                        if (scope.currentPeriod === "") return;
                        console.log("currentPeriod = " + scope.currentPeriod);
                        scope.getData(scope.currentPeriod);
                    });

                    scope.$watch('_id', function () {
                        console.log("data");
                    });
                }
            };
        }]);
})();