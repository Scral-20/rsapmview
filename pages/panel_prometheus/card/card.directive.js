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
                    $scope.situation = $attrs.situation;
                    $scope.unit = $attrs.unit;
                    $scope.name = $attrs.name;

                    $scope.value = 0;

                    $scope.getData = function (period) {
                        var getUrl = AuthService.getURL() + $attrs.url +period;
                        console.log(getUrl);
                        $http.post(
                            getUrl,
                            JSON.parse($scope.name)
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data.message[0].value);
                            $scope.value = response.data.message[0].value;
                        }, function () {
                            console.log("cardDiagram no data");
                        });
                    };

                    $scope.getClass = function (situation) {
                        if (typeof(situation) === "undefined"){
                            return 'label label-default pull-right';
                        }
                        switch (situation) {
                            case 'Accept':
                                return 'label label-success pull-right';
                                break;

                            case 'Exception':
                                return 'label label-danger pull-right';
                                break;

                            default:
                                return 'label label-default pull-right';
                        }
                    };
                },
                link: function(scope, element, attrs) {
                    scope.$watch('currentPeriod', function () {
                        if (typeof(scope.currentPeriod) ==="undefined" || scope.currentPeriod === "") return;
                        console.log("currentPeriod = " + scope.currentPeriod);
                        scope.getData(scope.currentPeriod);
                    });
                }
            };
        }]);
})();