(function () {
    'use strict';
    /**
     * chaizq-neu
     * 2018.09.11
     * @group Controller
     * @name TomcatalertmanagementCtrl
     * @class
     */
    angular
        .module('inspinia')
        .controller("TomcatalertmanagementCtrl", ['$scope', '$http', '$filter', '$state', '$stateParams', '$window', 'AuthService',
            function TomcatalertmanagementCtrl($scope, $http, $filter, $state, $stateParams, $window, authService) {
                $scope.key = $stateParams.key;
                $scope.title = $stateParams.title;
                $scope.route = $stateParams.route;
                console.log('key值：' + $scope.key);
                $scope.currentTab = "display";
                $scope.currentPeriod = '1w';

                $scope.localtime = Date.parse(new Date());
                $scope.date = function (timestamp) {
                    return $filter("date")(timestamp, "HH:mm:ss yyyy-MM-dd ");
                };

                $scope.activeTab = function (tab) {
                    $scope.currentTab = tab;
                };



                //策略本地数据
                // $scope.submit_test = {
                //     person:{},
                //     people: [
                //         {name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States'},
                //         {name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina'},
                //         {name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina'},
                //         {name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador'},
                //         {name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador'},
                //         {name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States'},
                //         {name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia'},
                //         {name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador'},
                //         {name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia'},
                //         {name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia'}
                //     ],
                //     option:{},
                //     options:[
                //         { number: '1',      text: 'Option 1' },
                //         { number: '2',      text: 'Option 2' },
                //         { number: '3',      text: 'Option 3' },
                //         { number: '4',      text: 'Option 4' },
                //         { number: '5',      text: 'Option 5' },
                //         { number: '6',      text: 'Option 6' }
                //     ],
                //     availableColors:['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'],
                //     multipleDemo:{
                //         colors:['Blue','Red']
                //     }
                //
                // };

                $scope.person = {};
                $scope.people = [
                    { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
                    { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
                    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
                    { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
                    { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
                    { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
                    { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
                    { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
                    { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
                    { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
                ];

                $scope.option = {};
                $scope.options = [
                    { number: '1',      text: 'Option 1' },
                    { number: '2',      text: 'Option 2' },
                    { number: '3',      text: 'Option 3' },
                    { number: '4',      text: 'Option 4' },
                    { number: '5',      text: 'Option 5' },
                    { number: '6',      text: 'Option 6' }
                ];

                $scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];

                $scope.multipleDemo = {};
                $scope.multipleDemo.colors = ['Blue','Red'];



                //Calendar config start----
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();
                var H = date.getHours();

                // Events Local Data
                $scope.events = [
                    {title: ' All Day Event',
                        start: new Date(y, m, 1)
                    },
                    {
                        title: ' CPU Over Load',
                        start: new Date(y, m, d - 5, 12, 30, 1),
                        end: new Date(y, m, d - 4, H, 20, 30),
                        color: '#FF122A',
                        textColor: 'yellow',
                        allDay: false
                    },
                    {
                        id: 999,
                        title: ' Https Slow Response',
                        start: new Date(y, m, d - 3, 16, 0),
                        color: '#ffaf1e',
                        textColor: 'yellow',
                        allDay: false
                    },
                    {id: 999, title: ' Https Error', start: new Date(y, m, d + 4, 16, 0), allDay: false},
                    {
                        title: ' JVM Over Load',
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        allDay: false
                    },
                    // {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
                ];


                /* message on eventClick */
                $scope.alertOnEventClick = function (event, allDay, jsEvent, view) {
                    $scope.alertMessage = (event.title + ' warning event ');
                };
                /* message on Drop */
                // $scope.alertOnDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                //     $scope.alertMessage = (event.title + ': Droped to make dayDelta ' + dayDelta);
                // };
                /* message on Resize */
                $scope.alertOnResize = function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                    $scope.alertMessage = (event.title + ': Resized to make dayDelta ' + minuteDelta);
                };

                /* config object */
                $scope.uiConfig = {
                    calendar: {
                        height: 450,
                        editable: false,  //控制告警事件是否可编辑
                        header: {
                            left: 'prev,next',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay'
                        },
                        eventClick: $scope.alertOnEventClick,
                        eventDrop: $scope.alertOnDrop,
                        eventResize: $scope.alertOnResize
                    }
                };

                /* Event sources array */
                $scope.eventSources = [$scope.events];

                //Calendar config end----

                $scope.getData = function () {
                    $http.get(
                        authService.getURL() + "/basicinfo/" + $stateParams.key,
                        {headers: authService.createAuthorizationTokenHeader()})
                        .then(function (response) {
                            $scope.basicinfo = response.data;

                            var data = response.data;
                            $scope.applicationName = data.applicationName;
                            $scope.agentVersion = data.agentVersion;
                            $scope.agentType = data.agentId;
                            $scope.pid = data.pid;
                            $scope.hostName = data.hostName;
                            $scope.jvmInfo = data.jvmInfo;
                            $scope.ip = data.ip;
                            $scope.startTimestamp = data.startTimestamp;
                            $scope.serverMetaData = data.serverMetaData;
                            $scope.status = data.status;
                            $scope.currentServiceInfo = [];

                            console.log(response.data);
                            console.log('Here:' + authService.getURL() + "/report/trend/" + $stateParams.key);
                        }), function () {
                        console.log("no data: basicinfo");
                        // $state.go('login');
                    };
                };
                $scope.getData();


                //提交测试
                $scope.SubmitTest = function (person,option) {
                    if(typeof (person)==="undefined" || typeof (option)==="undefined"){
                        sweetAlert({
                            title: "Please try again",
                            text: "Missing necessary option",
                            type: "warning"
                        });
                    }else {
                        sweetAlert({
                            title: "Completed",
                            text: ('Configuration upload\n'+'Name:' + person.name + ' '+ 'Option:' + option.text),
                            type: "success"
                        });
                    }
                };

                //提交函数
                $scope.Submit = function (formData) {
                    var data = {
                        username : formData.username,
                        password : formData.password
                    };
                    // alert(data);
                    console.log(data);
                    // console.log(authService.getURL());
                    $http.post(authService.getURL() + "/auth/login", data).then(
                        function(response) {
                            authService.setJwtToken(response.data.access_token);
                            // $state.go('topview');
                            // $state.reload();
                            $state.go('rs.topview').then(
                                // function() {
                                //     $window.location.reload();
                                // }
                            );
                        },
                        function() {
                            alert("提交失败，请重试");
                        }
                    );
                };
            }
        ]);
})();





