(function () {
    'use strict';
    /**
     * chaizq-neu
     * 2018.09.04
     * @group Controller
     * @name ProbeslistCtrl
     * @class
     */
    angular.module('inspinia')
        .controller('ProbeslistCtrl', ['$scope', '$http', '$state', 'AuthService', 'DTOptionsBuilder',
            function ($scope, $http, $state, authService, DTOptionsBuilder) {
                $scope.pageTitle ="Probe list";
                $scope.title ="Probe list";

                $http.get(authService.getURL() + "/topview",
                    {headers: authService.createAuthorizationTokenHeader()})
                    .then(function (response) {
                        $scope.topviewData = response.data;
                        console.log(authService.getURL());
                    }), function () {
                    console.log("no data: topview");
                    // $state.go('login');
                    console.log($scope.nodes);
                };

                $scope.remove=function(index){
                    if(confirm('确定移除此项吗？')){
                        $scope.topviewData.nodes.splice(index,1);
                    }
                    if($scope.topviewData.nodes.length===0){
                        alert('探针列表为空');
                    }
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
            }
        ]);
})();