var express = require("express");
var router   = express.Router();

// ==================
//  ROUTES
// ==================

// contact route
router.get("/contact", function(req, res, next){
    res.render("contact", {page:'Contact', menuId:'contact'});
});


module.exports = router;
