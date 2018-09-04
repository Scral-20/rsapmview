(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.24
     * @group directive
     * @name  tablelogDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('tablelogDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/tablelog/tablelog.html',
                replace: true,
                scope: {
                    currentPeriod: "@"
                },
                controller: function ($scope,$http, $filter, $element, $attrs, AuthService,DTOptionsBuilder) {
                    $scope._id =  '_id';
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
                        $http.get(
                            AuthService.getURL() + $attrs.url+ period
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.tableData = response.data;
                            
                            if (typeof($scope.title) != "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                $scope.title = $scope.tableData.title;
                            }
                        }, function () {
                            console.log("logDiagram no data");
                        });
                    };

                    $scope.date = function (timestamp) {
                        return $filter("date")(timestamp, "HH:mm:ss yyyy-MM-dd ");
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