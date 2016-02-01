'use strict';

var chatapp = angular.module('t-chat', []);

chatapp.factory('Data', function () {
    return { id:"1", name: "aung"};
});

chatapp.controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope, Data) {
    $scope.Data = Data;
    $scope.messages = [];
    $scope.messageList = [];
    $scope.data = {
        name: null,
        message: null
    };

    $scope.send = function () {
        io.socket.post('/message/chat', $scope.data, function (res) { });
        $scope.data.message = null;
        $scope.$broadcast('msgSend');
    };

    io.socket.get('/message/subscribe', function (res) { });
    console.log("io.socket.get run");

    io.socket.on('message', function onServerSentEvent(msg) {
        switch (msg.verb) {

            case 'created':
                $scope.messages.push(msg.data);
                //$scope.data.message = null;
                $scope.$apply();
                var messagearea = document.getElementById("message-area");
                messagearea.scrollTop = messagearea.scrollHeight;
                console.log("message area scrolling "+ messagearea);
                break;

            default: return;
        }
    });

    io.socket.on('greeting', function(msg) {
        console.log("message from general room:"+ msg.body);
    });

    io.socket.on('private-message', function(msg) {
        console.log("private message testing");
        console.log("Message from: " + msg.from);
        $scope.messageList[msg.fromuser].push({"name": msg.fromusername, "message": msg.message});
        //$scope.messages = $scope.messageList(msg.fromuser);
        //$scope.apply();
    });

}]);

chatapp.controller('UserListCtrl', ['$scope', '$rootScope', function ($scope, $rootScope, Data) {
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

    $scope.chatWithUser = function(userid) {
        //alert(userid);
        $scope.Data.id = userid;
        //alert("changed");
    };
}]);

chatapp.directive('focusOn', function () {
    return function (scope, elem, attr) {
        scope.$on(attr.focusOn, function (e) {
            elem[0].focus();
        });
    };
});
