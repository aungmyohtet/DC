'use strict';

var chatapp = angular.module('t-chat', []);

chatapp.factory('Data', function () {
    return { id: "-1", name: "aung" };
});

chatapp.controller('MainCtrl',
    function ($scope, $rootScope, Data) {
        $scope.Data = Data;
        $scope.messages = [];
        $scope.generalMessages = [];
        $scope.messageList = [];
        $scope.data = {
            name: null,
            message: null
        };
        var privateMessage = {
          toId: $scope.Data.id,
          name: null,
          message: $scope.data.message
        };

        $scope.send = function () {
            if ($scope.Data.id == -1) {
              io.socket.post('/message/chat', $scope.data, function (res) { });
            }
            else {
              io.socket.post('/message/privateChat', {toId: $scope.Data.id,
                name: null,
                message: $scope.data.message}, function(res) { });
            }
            $scope.data.message = null;
            $scope.$broadcast('msgSend');
        };

        io.socket.get('/message/subscribe', function (res) { });
        console.log("io.socket.get run");

        io.socket.on('message', function onServerSentEvent(msg) {
            switch (msg.verb) {

                case 'created':
                    //$scope.messages.push(msg.data);
                    $scope.generalMessages.push(msg.data);
                    $scope.messages = $scope.generalMessages;
                    //$scope.data.message = null;
                    $scope.$apply();
                    var messagearea = document.getElementById("message-area");
                    messagearea.scrollTop = messagearea.scrollHeight;
                    console.log("message area scrolling " + messagearea);
                    break;

                default: return;
            }
        });

        io.socket.on('greeting', function (msg) {
            console.log("message from general room:" + msg.body);
        });

        io.socket.on('private-message', function (msg) {
            console.log("private message received from " + msg.fromId);
            //console.log("private message testing");
            //console.log("Message from: " + msg.from);
            if ($scope.messageList[msg.fromId]) {
              $scope.messageList[msg.fromId].push({ "name": msg.body.fromName, "message": msg.body.message });
            } else {
               $scope.messageList[msg.fromId] = [];
               $scope.messageList[msg.fromId].push({ "name": msg.body.fromName, "message": msg.body.message });
            }
            if ($scope.Data.id == msg.fromId) {
              $scope.messages = $scope.messageList[msg.fromId];
              $scope.$apply();
            }
        });

        $rootScope.$on("change-message", function () {
            if ($scope.Data.id != -1) {
              $scope.messages = $scope.messageList[$scope.Data.id];
            } else {
              $scope.messages = $scope.generalMessages;
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });

    });

chatapp.controller('UserListCtrl',
    function ($scope, $rootScope, Data) {
        console.log("UserList Controller Entered");
        $scope.users = [];
        $scope.Data = Data;
        io.socket.get('/user/subscribe', function (res) { });
        io.socket.on('user', function onServerSentEvent(user) {
            switch (user.verb) {
                case 'created':
                    console.log("user created event in server");
                    console.log(user.data);
                    $scope.users.push(user.data);
                    //$scope.data.message = null;
                    $scope.$apply();
                    break;

                default: return;
            }
        });

        $scope.chatWithUser = function (userid) {
            //alert(userid);
            $scope.Data.id = userid;
            $rootScope.$emit("change-message", {});
            //alert("changed");
        };
    });

chatapp.directive('focusOn', function () {
    return function (scope, elem, attr) {
        scope.$on(attr.focusOn, function (e) {
            elem[0].focus();
        });
    };
});
