/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscribe: function (req, res) {
        User.watch(req);
        console.log("user socket subcribed!");
    },

    register: function(req, res) {
      var params = req.params.all();
      var name = params.username;
      //req.session.username = name;
      console.log(req.session.username);
      //res.locals.layout = null;
      var data = {
          name: params.username,
          password: params.password
      };
      User.create(data).exec(function created(err, user) {
          User.publishCreate({ id: user.id, name: user.name });
          User.users.push(user);
          //req.session.user = user;
          console.log("User is " + user.name);
          console.log("User id is "+ user.id);
          //res.view('mainpage2');
          res.redirect('/');
      });
    }
};
