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
            res.view('mainpage2');
        } else {
            res.view('welcome');
        }
    },

    enter: function (req, res) {
        var params = req.params.all();
        var name = params.username;
        var password = params.password;
        res.locals.layout = null;
        User.findOne({name: params.username, password: params.password}).exec(function(err, user) {
            console.log("In enter action!");
            console.log(user.id);
            console.log("In enter action[end]");
            req.session.user = user;
            req.session.username = name;
            req.session.user.id = user.id;
            res.view('mainpage2');
        });
        /*req.session.username = name;
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
            res.view('mainpage2');
        });*/

    },

    getRoomsList: function (req, res) {
        var roomNames = JSON.stringify(sails.sockets.rooms());
        res.json({
            message: 'A list of all the rooms: ' + roomNames
        });

    }

};
