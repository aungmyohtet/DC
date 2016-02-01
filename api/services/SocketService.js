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
        }
    },

    getSocketByUserId: function (userId) {
        for (var i = 0; i < socketList.length; i++) {
            if (socketList[i].userId == userId) {
                return socketList[i];
            }
        }
    },

    printAllSockets() {
        for (var i = 0; i < socketList.length; i++) {
            console.log("socket user id is " + socketList[i].userId);
        }
    }
};