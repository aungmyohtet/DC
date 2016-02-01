/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    welcome: function (req, res) {
        if (req.session.username) {
            res.locals.layout = null;
            res.view('mainpage');
        } else {
            res.view('welcome');
        }
    },

    enter: function (req, res) {
        var params = req.params.all();
        var name = params.username;
        req.session.username = name;
        console.log(req.session.username);
        res.locals.layout = null;
        var data = {
            name: params.username
        };
        User.create(data).exec(function created(err, user) {
            User.publishCreate({ id: user.id, name: user.name });
            User.users.push(user);
            req.session.user = user;
            console.log("User is " + user.name);
            console.log("User id is "+ user.id);
            res.view('mainpage');
        });
        
    },

    getRoomsList: function (req, res) {
        var roomNames = JSON.stringify(sails.sockets.rooms());
        res.json({
            message: 'A list of all the rooms: ' + roomNames
        });

    }

};

