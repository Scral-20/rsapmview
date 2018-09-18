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
        .controller('ProbeslistCtrl', ['$scope','$http', '$state', 'AuthService', 'DTOptionsBuilder',
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

                $scope.getPort = function (port) {
                    if (typeof(port) === "undefined" || port === ""){
                        return '-------';
                    }
                    return port;
                };


                $scope.remove=function (index) {
                    // sweetAlert({
                    //         title: "Are you sure?",
                    //         text: "Your will not be able to recover this imaginary file!",
                    //         type: "warning",
                    //         showCancelButton: true,
                    //         confirmButtonColor: "#DD6B55",
                    //         confirmButtonText: "Yes, delete it!",
                    //         cancelButtonText: "No, cancel plx!",
                    //         closeOnConfirm: false,
                    //         closeOnCancel: false },
                    //     function (isConfirm) {
                    //         if (isConfirm) {
                    //             $scope.topviewData.nodes.splice(index,1);
                    //             sweetAlert("Deleted!", "Your imaginary file has been deleted.", "success");
                    //         } else {
                    //             sweetAlert("Cancelled", "Your imaginary file is safe :)", "error");
                    //         }
                    //     });

                    if (confirm('Are u sure')) {
                        $scope.topviewData.nodes.splice(index, 1);
                        sweetAlert("Deleted!", "Your imaginary file has been deleted.", "success");
                    } else {
                        sweetAlert("Cancelled", "Your imaginary file is safe :)", "error");
                    }

                };

                //
                // $scope.remove=function(index){
                //     if(confirm('确定移除此项吗？')){
                //         $scope.topviewData.nodes.splice(index,1);
                //     }
                //     if($scope.topviewData.nodes.length===0){
                //         alert('探针列表为空');
                //     }
                // };

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