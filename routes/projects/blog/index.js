let express   = require("express"),
    router   = express.Router(),
    Blog     = require("../../../models/projects/blog/blog");

// RESTFUL ROUTES
router.get("/", function(req, res){
   res.redirect("/project/blog_app/blogs");
});

// INDEX ROUTE
router.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log("ERROR!");
       } else {
            res.render("projects/blog/index", {blogs: blogs});
       }
    });
});

// NEW ROUTE
router.get("/blogs/new", function(req,res){
   res.render("projects/blog/new");
});

// CREATE ROUTE
router.post("/blogs", function(req,res){
   // create blog
   Blog.countDocuments({}, function(err, count){
    if (count >= 5) {
      res.send("Cannot pass limit threshold of 5 posts! Sorry :[");
    }
    else {
      req.body.blog.body = req.sanitize(req.body.blog.body);
      Blog.create(req.body.blog, function(err,newBlog) {
          if(err){
              res.render("projects/blog/new");
          } else {
              res.redirect("/project/blog_app/blogs");
          }
      })
    }
  });
});

// SHOW ROUTE
router.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/project/blog_app/blogs");
      } else{
          res.render("projects/blog/show", {blog: foundBlog});
      }
   });
});

// EDIT ROUTE
router.get("/blogs/:id/edit", function(req,res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/project/blog_app/blogs");
       } else {
            res.render("projects/blog/edit", {blog: foundBlog});
       }
   }) ;
});

// UPDATE ROUTE
router.put("/blogs/:id/", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/project/blog_app/blogs");
        }else {
            res.redirect("/project/blog_app/blogs/" + req.params.id)
        }
    });
});

// DELETE ROUTE
router.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/project/blog_app/blogs");
        } else {
            res.redirect("/project/blog_app/blogs");
        }
    });
});

module.exports = router;
