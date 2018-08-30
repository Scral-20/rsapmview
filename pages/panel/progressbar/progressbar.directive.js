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
                    $scope._id = '_id';
                    $scope.title = "";
                    $scope.progressbarData = {
                        title: "",
                        FastCount: '',
                        NormalCount: '',
                        SlowCount: '',
                        VerySlowCount: '',
                        Total: ''
                    };
                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        $http.get(
                            AuthService.getURL() + $attrs.url + period
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.progressbarData = response.data;

                            if (typeof($scope.title) != "undefined") {
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = $scope.progressbarData.title;
                            }
                        }, function () {
                            console.log("progressbarDiagram no data");
                        });
                    };

                    function Percentage(chartData, progressbarData) {
                        if (typeof(chartData) == "undefined") {
                            return;
                        }
                        return (100 * parseFloat(chartData / progressbarData.Total).toFixed(4)).toFixed(2) + '%';
                    }

                    $scope.getStyle = function (i) {
                        return {
                            width: Percentage(i, $scope.progressbarData)
                        }
                    };

                    $scope.getPercentage = function (i) {
                        return Percentage(i, $scope.progressbarData);
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