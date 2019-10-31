var express  = require("express");
var router   = express.Router();

// ==================
//  ROUTES
// ==================
// landing page route
router.get("/project", function(req, res, next){
    res.render("project", {page:'Projects', menuId:'project'});
});

module.exports = router;
