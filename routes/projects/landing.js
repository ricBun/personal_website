var express = require("express"),
    router   = express.Router();

// ==================
//  ROUTES
// ==================

// landing page route
router.get("/", function(req, res, next){
    res.render("../views/projects/landingPage", {page:'Projects', menuId:'projects'});
});

// // Yelp Camp Router
// router.get("/yelpCamp", function(req, res, next){
//     res.render("../views/projects/yelpCamp/yelpCampLanding", {page:'Yelp Camp', menuId:'projects'});
// });


module.exports = router;
