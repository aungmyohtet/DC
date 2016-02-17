var socketList = [];
module.exports = {
    addSocket: function (session, socket) {
        if (session.user && socket) {
            var username = session.user.name;
            var userId = session.user.id;
            if (username && socket && userId) {
                socketList.push({
                    userId: session.user.id,
                    socket: socket,
                });
            }
            console.log("In addSocket");
            console.log(session.user.id);
            console.log("In addSocket method[end]");
        }

    },

    getSocketByUserId: function (userId) {
        for (var i = 0; i < socketList.length; i++) {
            if (socketList[i].userId == userId) {
                return socketList[i].socket;
            }
        }
    },

    printAllSockets() {
        for (var i = 0; i < socketList.length; i++) {
            console.log("socket user id is " + socketList[i].userId);
            console.log("EmittedMessage");
        }
    }
};
