(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.07.18
     * @group Controller
     * @name TopviewCtrl
     * @class
     */
    angular.module('inspinia')
        .controller( "TopviewCtrl", ["$scope", '$http', "$state", '$window', 'AuthService',
            function ($scope, $http, $state, $window, authService) {
                var nodes = [];
                var links = [];
                $scope.model = new go.GraphLinksModel(nodes,links);
                $scope.model.selectedNodeData = null;
                $http.get(
                    authService.getURL() + "/topview",
                    {headers : authService.createAuthorizationTokenHeader()}
                ).then(function (response) {
                    console.log('code:'+response.data.code);
                    if (response.data.code === 200) {
                        console.log("yes");
                        nodes = response.data.message.nodes;
                        console.log(response.data.message.nodes);
                        links = response.data.message.links;
                        console.log(response.data.message.links);
                        $scope.model = new go.GraphLinksModel(nodes, links);
                        $scope.model.selectedNodeData = null;
                    } else {
                        sweetAlert('code:' + response.data.code + ' \nPlease check code');
                    }
                }, function () {
                    console.log("topview no data");
                    // $state.go('login');
                });
            }
        ]);
})();