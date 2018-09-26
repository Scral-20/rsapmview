(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.07
     * @group directive
     * @name  egaugeDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('egaugeDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/newecharts/egauge.html',
                replace: true,
                scope: true,
                controller: function ($scope, $http, $element, $attrs, AuthService) {

                    $scope._id = "_id";
                    $scope.optionValues = $attrs.option;
                    //id为随机数，与属性并列即可
                    $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                    $scope.getData=function (option) {
                        switch (option){
                            case 'option1':
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
                            default:
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
                                return option;
                        }

                    };
                    //哈希表例子---
                    // var my_s="title";
                    // var my_t="paper";
                    //
                    // var isIsomorphic = function(s, t) {
                    //     return helpMap(s, t) && helpMap(t, s);
                    // };
                    // const helpMap = function(s, t) {
                    //     var mapS = new Map();
                    //
                    //     for(var i = 0; i < s.length; i++) {
                    //         var sChar = s.charAt(i),
                    //             tChar = t.charAt(i);
                    //         if(!mapS.has(sChar)) {
                    //             console.log(mapS.has(sChar));
                    //             mapS.set(sChar, tChar);
                    //         }else {
                    //             if(mapS.get(sChar) !== tChar) {
                    //                 return false;
                    //             }
                    //         }
                    //     }
                    //     return true;
                    // };
                    // console.log('boolean:' +isIsomorphic(my_s,my_t));

                    //哈希表例子---

                    // var option1 = {
                    //     tooltip : {
                    //         formatter: "{a} <br/>{b} : {c}%"
                    //     },
                    //     toolbox: {
                    //         feature: {
                    //             restore: {},
                    //             saveAsImage: {}
                    //         }
                    //     },
                    //     series: [
                    //         {
                    //             name: '速度',
                    //             type: 'gauge',
                    //             detail: {formatter:'{value}%'},
                    //             data: [{value: 50, name: '时速'}]
                    //         }
                    //     ]
                    // };
                    // var option2 = {
                    //     tooltip : {
                    //         formatter: "{a} <br/>{b} : {c}%"
                    //     },
                    //     toolbox: {
                    //         feature: {
                    //             restore: {},
                    //             saveAsImage: {}
                    //         }
                    //     },
                    //     series: [
                    //         {
                    //             name: '业务指标',
                    //             type: 'gauge',
                    //             detail: {formatter:'{value}%'},
                    //             data: [{value: 50, name: '完成率'}]
                    //         }
                    //     ]
                    // };
                    // var optionSelect=  function (option) {
                    //     option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                    //     myChart.setOption(option, true);
                    // };


                },
                link: function (scope) {
                    scope.$watch('_id', function () {
                        var myChart = echarts.init(document.getElementById(scope._id));
                        var optionUsed=scope.getData(scope.optionValues);
                        myChart.setOption(optionUsed);
                    })
                }
            };
        }]);
})();