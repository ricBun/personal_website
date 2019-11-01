('use strict');
require('dotenv').config();

let express  = require("express"),
    app      = express();
// --------------------------
// shared global variables (between YelpCamp and BlogApp)
// --------------------------
let bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    flash                 = require("connect-flash"),
    methodOverride        = require("method-override"),
    expressSanitizer      = require("express-sanitizer"),
    LocalStrategy         = require("passport-local");


// ---------------------------------------------------------
//  GLOBAL CONFIG
// ---------------------------------------------------------
app.set("view engine", "ejs");
// use stylesheet
app.use(express.static(__dirname + "/public"));


// used to filter javascript input
app.use(expressSanitizer());

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_URL}`, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
console.log('successfully connected to the database');
}).catch(err => {
console.log('error connecting to the database');
process.exit();
});
// use body parser
app.use(bodyParser.urlencoded({extended: true}));

// used to make a PUT request instead of POST
app.use(methodOverride("_method"));

// flash
// NOTE: flash MUST be used  BEFORE PASSPORT CONFIG
app.use(flash());


// PROJECTS

// -----------------------------------------------------------
// YELP CAMP CODE SETUP
// -----------------------------------------------------------


// ---------------------------------------------------------
// ROUTES
// ---------------------------------------------------------
let   indexRoute      = require("./routes/homepage"),
      projectsRoute   = require("./routes/project"),
      contactRoute    = require("./routes/contact"),
      resumeRoute     = require("./routes/resume");

// Schema
let
    Campground            = require("./models/projects/yelpcamp/campground"),
    Comment               = require("./models/projects/yelpcamp/comment"),
    User                  = require("./models/projects/yelpcamp/user"),

// requiring routes
    campgroundRoutes    = require("./routes/projects/yelpcamp/campgrounds"),
    commentRoutes       = require("./routes/projects/yelpcamp/comments"),
    authRoutes          = require("./routes/projects/yelpcamp/index");


// use all routes configured in ROUTES section
app.use(indexRoute);
app.use(projectsRoute);
app.use(contactRoute);
app.use(resumeRoute);

// ==================
// YELP CAMP CONFIG
// ==================

// Time stamp variable
app.locals.moment     = require('moment');

// // purge DB
// seedDB();
// ==================
// PASSPORT CONFIGURATION
// ==================
app.use(require("express-session")({
secret: `${process.env.PASSPORT_SECRET}`,
resave: false,
saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to plugin user info to EVERY route
// Global variables**
app.use(function(req, res, next){
res.locals.currentUser = req.user;
res.locals.error = req.flash("error");
res.locals.success = req.flash("success");
next();
});

// all the routes
app.use("/project/yelpcamp/campgrounds", campgroundRoutes);
app.use("/project/yelpcamp/campgrounds/:id/comments", commentRoutes);
app.use("/project/yelpcamp", authRoutes);

// --------------------------------------------------------------------------------
// END OF YELP CAMP CODE SETUP
// --------------------------------------------------------------------------------



// --------------------------------------------------------------------------------
// START OF BLOG APP CODE SETUP
// --------------------------------------------------------------------------------

// Blog App Config
let Blog               = require("./models/projects/blog/blog"),

// Blog App ROUTE
    blogAppRoute       = require("./routes/projects/blog/index");

app.use("/project/blog_app", blogAppRoute);
// --------------------------------------------------------------------------------
// END OF BLOG APP CODE SETUP
// --------------------------------------------------------------------------------


app.listen(3000, function(){
    console.log("Webpage started!");
});
