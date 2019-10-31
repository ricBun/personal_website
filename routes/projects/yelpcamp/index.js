var express = require("express");
var router   = express.Router();
var passport = require("passport");
var User = require("../../../models/projects/yelpcamp/user");
var flash = require("connect-flash");

// ==================
//  ROUTES
// ==================

// root route
router.get("/", function(req, res){
    res.render("projects/yelpcamp/landing");
});

// =========================
//  AUTHORIZATION ROUTES
// =========================
// register form route
router.get("/register", function(req, res){
        res.render("projects/yelpcamp/register", {page: 'register'});
});

// handle sign up logic
router.post("/register", function(req, res){
  // eval(require('locus'));
  if(req.body.registerCode === `${process.env.ADMIN_SECRET_CODE}` || req.body.registerCode === `${process.env.NEW_USER_CODE}`) {
    var newUser = new User({username: req.body.username});
    if(req.body.registerCode === `${process.env.ADMIN_SECRET_CODE}`) {
        newUser.isAdmin = true;
    }

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("projects/yelpcamp/register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
            res.redirect("/campgrounds");
        });
    });
  }
  else {
    req.flash("error", "Incorrect invitation code! please send me an email!");
    res.redirect("/project/yelpcamp/register");
  }

});

// show login form
router.get("/login", function(req, res){
    res.render("projects/yelpcamp/login", {page: 'login'});
});

// handle login logic
router.post("/login", passport.authenticate("local", {
        successRedirect: "/project/yelpcamp/campgrounds",
        failureRedirect: "/project/yelpcamp/login"
    }) , function(req, res){
});

// logout route
router.get("/logout", function(req,res){
   req.logout();
   req.flash("success", "Logged You Out!");
   res.redirect("/project/yelpcamp/campgrounds");
});
module.exports = router;
