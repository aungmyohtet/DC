/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  console.log("Bootstrapping!!!!!!!!!!!!!");
  User.find().exec(function(err, data) {
         //if (err) res.json(err);
         User.users = data;
         for (var i = 0; i < data.length; i++) {
           console.log("In bootstrap user loop: user name and user id: "+ data[i].id +" "+data[i].name);
         }
     });

  cb();
};
