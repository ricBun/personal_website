var express = require("express");
var router   = express.Router();

// ==================
//  ROUTES
// ==================

// contact route
router.get("/resume", function(req, res, next){
    res.render("resume", {page:'Resume', menuId:'resume'});
});


module.exports = router;
