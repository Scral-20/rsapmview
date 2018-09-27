(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.09.20
     * @group directive
     * @name  treeDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('treeDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel_prometheus/tree/tree.html',
                replace: true,
                scope: true,
                controller: function ($scope, $http, $element, $attrs, AuthService) {

                    $scope.optionValues = $attrs.option;
                    $scope.height = {
                        height:$attrs.height
                    };

                    //id为随机数，与属性并列即可,本地测试，链接数据后请删去
                    $scope._id = '_' + Math.random().toString(36).substr(2, 9);

                    $scope.getData=function (option,treeData,treeData2) {
                        //option是选择树状图样式，option1为可树图用样式，option2,3不可用，本地测试
                        switch (option){
                            case 'option1':
                                option = {
                                    tooltip: {
                                        trigger: 'item',
                                        triggerOn: 'mousemove'
                                    },
                                    legend: {
                                        top: '2%',
                                        left: '3%',
                                        orient: 'vertical',
                                        data: [{
                                            name: 'tree1',
                                            icon: 'rectangle'
                                        } ,
                                            {
                                                name: 'tree2',
                                                icon: 'rectangle'
                                            }],
                                        borderColor: '#c23531'
                                    },
                                    series:[
                                        {
                                            type: 'tree',

                                            name: 'tree1',

                                            data: [treeData],

                                            top: '5%',
                                            left: '7%',
                                            bottom: '2%',
                                            right: '60%',

                                            symbolSize: 7,

                                            label: {
                                                normal: {
                                                    position: 'left',
                                                    verticalAlign: 'middle',
                                                    align: 'right'
                                                }
                                            },

                                            leaves: {
                                                label: {
                                                    normal: {
                                                        position: 'right',
                                                        verticalAlign: 'middle',
                                                        align: 'left'
                                                    }
                                                }
                                            },

                                            expandAndCollapse: true,

                                            animationDuration: 550,
                                            animationDurationUpdate: 750

                                        },
                                        {
                                            type: 'tree',
                                            name: 'tree2',
                                            data: [treeData2],

                                            top: '20%',
                                            left: '60%',
                                            bottom: '22%',
                                            right: '18%',

                                            symbolSize: 7,

                                            label: {
                                                normal: {
                                                    position: 'left',
                                                    verticalAlign: 'middle',
                                                    align: 'right'
                                                }
                                            },

                                            leaves: {
                                                label: {
                                                    normal: {
                                                        position: 'right',
                                                        verticalAlign: 'middle',
                                                        align: 'left'
                                                    }
                                                }
                                            },

                                            expandAndCollapse: true,

                                            animationDuration: 550,
                                            animationDurationUpdate: 750
                                        }
                                    ]
                                };
                                return option;
                            case 'option2':
                                option = {
                                    tooltip : {
                                        formatter: "{a} <br/>{b} : {c}%"
                                    },
                                    toolbox: {
                                        feature: {
                                            restore: {},
                                            saveAsImage: {}
                                        }
                                    },
                                    series: [
                                        {
                                            name: '速度',
                                            type: 'gauge',
                                            detail: {formatter:'{value}%'},
                                            data: [{value: 50, name: '时速'}]
                                        }
                                    ]
                                };
                                return option;
                            case 'option3':
                                option = {
                                    tooltip : {
                                        formatter: "{a} <br/>{b} : {c}%"
                                    },
                                    toolbox: {
                                        feature: {
                                            restore: {},
                                            saveAsImage: {}
                                        }
                                    },
                                    series: [
                                        {
                                            name: '业务完成率',
                                            type: 'gauge',
                                            detail: {formatter:'{value}%'},
                                            data: [{value: 70, name: '业务完成率'}]
                                        }
                                    ]
                                };
                        }
                        $http.get(
                            AuthService.getURL() + $attrs.url
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data);
                            $scope.chartData = response.data;
                            if (typeof($scope.chartData) !== "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                //$scope.title = $scope.chartData.title;
                            }
                        }, function () {
                            console.log("treeDiagram no data");
                        });
                    };

                },
                link: function (scope) {
                    scope.$watch('_id', function () {
                        var myChart = echarts.init(document.getElementById(scope._id));
                        myChart.hideLoading();
                        var treeOption=scope.getData(scope.optionValues,scope.treeData,scope.treeData2);
                        myChart.setOption(treeOption);
                    })
                }
            };
        }]);
})();