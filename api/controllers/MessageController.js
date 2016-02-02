/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    chat: function (req, res) {
        var data = {
            name: req.session.username,
            message: req.param('message')
        };
        Message.create(data).exec(function created(err, message) {
            Message.publishCreate({ id: message.id, name: message.name, message: message.message });
        });
    },

    subscribe: function (req, res) {
        Message.watch(req);
        req.socket.join("general");
        console.log("rooms: "+sails.sockets.rooms());
        req.socket.broadcast.to('general').emit('greeting', {body: 'Hello'});
    },

    privateChat: function(req, res) {
      var data = {
          toId: req.param('toId'),
          fromId: req.session.user.id,
          fromName: req.session.user.name,
          message: req.param('message')
      };
      var targetSocket = SocketService.getSocketByUserId(req.param('toId'));
      var fromSocket = SocketService.getSocketByUserId(data.fromId);
      targetSocket.emit("private-message", {"fromId": data.fromId, body : {"fromName": data.fromName, "message": data.message}});
      fromSocket.emit("private-message", {"fromId": data.toId, body : {"fromName": data.fromName, "message": data.message}});
    }
};
