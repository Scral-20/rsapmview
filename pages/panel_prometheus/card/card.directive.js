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
                    $scope.unit = $attrs.unit;
                    $scope.name = $attrs.name;

                    $scope.value = 0;

                    $scope.getData = function (period) {
                        var getUrl = AuthService.getURL() + $attrs.url;
                        console.log(getUrl);
                        $http.post(
                            getUrl,
                            JSON.parse($scope.name)
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.value = response.data;
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