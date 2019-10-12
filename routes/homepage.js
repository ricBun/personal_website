var express = require("express");
var router   = express.Router();

// ==================
//  ROUTES
// ==================

// root route
router.get("/", function(req, res, next){
    res.render("homepage", {page:'Home', menuId:'home'});
});


module.exports = router;
