var express = require("express");
// merge params of campgrounds and comments
//  makes it so that you can travel from routes/campgrounds.js to routes/comments.js with id info
var router   = express.Router({mergeParams: true});
var Campground = require("../../../models/projects/yelpcamp/campground");
var Comment = require("../../../models/projects/yelpcamp/comment");
var middleware = require("../../../middleware/projects/yelpcamp");
// =========================
//  COMMENTS ROUTES
// =========================

//CREATE - route
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           req.flash("error", "something went wrong!");
           console.log(err);
           redirect("/campgrounds");
       } else {
           // create new comment
           // connect new comment to campground
           // redirect campground show page
           Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else {
                  // add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username  = req.user.username;
                  // save comment
                  comment.save();
                  campground.comments.push(comment);
                  campground.save();
                  req.flash("success", "Successfully added comment!");
                  res.redirect("/project/yelpcamp/campgrounds/" + campground._id);
              }
           });
       }
    });
});

// COMMENT EDIT - route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if (err || !foundCampground) {
           req.flash("error", "No campground found!");
           return res.redirect("back");
       }
       Comment.findById(req.params.comment_id, function(err, foundComment){
           if (err) {
               res.redirect("back")
           } else {
               res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
           }
       });
    });
});

// COMMENT UPDATE - route
router.put("/:comment_id", function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment edited");
           res.redirect("/project/yelpcamp/campgrounds/" + req.params.id);
       }
    });
});


// COMMENT DESTROY route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if (err) {
           res.redirect();
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/project/yelpcamp/campgrounds/" + req.params.id);
       }
   })
});

module.exports = router;
