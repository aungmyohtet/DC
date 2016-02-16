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
      
    }
};
