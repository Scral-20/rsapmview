(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.08.31
     * @group directive
     * @name  cardPrometheusDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('cardPrometheusDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel_prometheus/card/card.html',
                replace: true,
                scope: true,
                controller: function ($scope,$http, $filter, $element, $attrs, AuthService) {
                    $scope.localtitle = $attrs.localtitle;
                    $scope.remark = $attrs.remark;
                    $scope.divide = $attrs.divide;
                    $scope.unit = $attrs.unit;

                    $scope.cardData = {};
                    $scope.value = "";
                    // alert($attrs.names);

                    $scope.getData = function (period) {
                        var getUrl = AuthService.getURL() + $attrs.url + $attrs.names;
                        console.log(getUrl);
                        $http.get(
                            getUrl
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            var data = response.data;
                            if (typeof ($scope.columnsSelected) === "undefined") {
                                $scope.divide = parseFloat($scope.divide);
                            } else {
                                $scope.divide = 1.0;
                            }
                            if (data.length > 0) {
                                $scope.value = data[0].value;
                            }
                        }, function () {
                            console.log("cardDiagram no data");
                        });
                    };
                },


                link: function(scope, element, attrs) {
                    scope.getData();
                }
            };
        }]);
})();