(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.24
     * @group directive
     * @name  cardDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('cardDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/card/card.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope,$http, $filter, $element, $attrs, AuthService) {
                    $scope._id =  '_id';
                    $scope.title = "";
                    $scope.situation = $attrs.situation;
                    $scope.totaltype = $attrs.totaltype;
                    $scope.localtitle = $attrs.localtitle;
                    $scope.number ="";
                    $scope.cardData = {
                        title: "",
                        count: [],
                        duration: []
                    };

                    console.log("URL: " + AuthService.getURL() + $attrs.url);

                    $scope.getData = function (period) {
                        $http.get(
                            AuthService.getURL() + $attrs.url + period
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.cardData = response.data;
                            $scope.selectData($scope.cardData, $scope.totaltype);

                            if (typeof($scope.title) != "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = $scope.cardData.title;
                            }
                        }, function () {
                            console.log("cardDiagram no data");
                        });
                    };

                    $scope.getClass=function (situation) {

                        switch(situation)
                        {
                            case 'accept':
                                return 'label label-success pull-right';
                                break;

                            case 'exception':
                                return 'label label-danger pull-right';
                                break;

                            default:
                                return 'label label-success pull-right';
                        }

                    };

                    $scope.selectData = function (cardData,totaltype) {
                        switch(totaltype)
                        {
                            case 'count':
                                $scope.number = cardData['total count'];
                                break;

                            case 'duration':
                                $scope.number = cardData['total duration'];
                                break;

                            default:
                                $scope.number= ''
                        }
                    };
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
                    });
                }
            };
        }]);
})();