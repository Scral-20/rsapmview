(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.24
     * @group directive
     * @name  tablenewDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('tablenewDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/tablenew/tablenew.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope,$http, $filter, $element, $attrs, AuthService,DTOptionsBuilder) {
                    $scope.names= $attrs.names;
                    $scope.title = "";
                    $scope.localtitle =  $attrs.localtitle;
                    $scope.tableData = {
                        title: "",
                        rpcs:[
                            {
                                name: "",
                                duration: '',
                                count: ''
                            }
                        ],
                        'total count': '',
                        'total duration': ''
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
                            $scope.tableData = response.data.message[0];
                            $scope.url=$scope.tableData.url;
                            
                            if (typeof($scope.tableData) !== "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);

                            }
                        }, function () {
                            console.log("logDiagram no data");
                        });
                    };

                    $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withDOM('<"html5buttons"B>lTfgitp')
                        .withButtons([
                            {extend: 'copy'},
                            {extend: 'csv'},
                            {extend: 'excel', title: 'ExampleFile'},
                            {extend: 'pdf', title: 'ExampleFile'},

                            {extend: 'print',
                                customize: function (win){
                                    $(win.document.body).addClass('white-bg');
                                    $(win.document.body).css('font-size', '10px');
                                    $(win.document.body).find('table')
                                        .addClass('compact')
                                        .css('font-size', 'inherit');
                                }
                            }
                        ]);
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