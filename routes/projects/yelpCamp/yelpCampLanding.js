var express = require("express"),
    router   = express.Router();

// ==================
//  ROUTES
// ==================

// landing page route
router.get("/", function(req, res, next){
    res.render("../views/projects/yelpCamp/yelpCampLanding", {page:'Projects | Yelp Camp', menuId:'projects'});
});


module.exports = router;
