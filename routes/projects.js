var express = require("express");
var router   = express.Router();

// ==================
//  ROUTES
// ==================

// project route
router.get("/projects", function(req, res, next){
    res.render("projects", {page:'Projects', menuId:'projects'});
});


module.exports = router;
