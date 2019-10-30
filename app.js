let express  = require("express"),
    app      = express();


// ---------------------------------------------------------
// ROUTES
// ---------------------------------------------------------
let   indexRoute      = require("./routes/homepage"),
      contactRoute    = require("./routes/contact"),
      resumeRoute     = require("./routes/resume"),
      projectsRoute   = require("./routes/projects/landing");


// Project Routes
let   yelpCampRoute  = require("./routes/projects/yelpCamp/yelpCampLanding")

// ---------------------------------------------------------
//  CONFIG
// ---------------------------------------------------------
app.set("view engine", "ejs");
// use stylesheet
app.use(express.static(__dirname + "/public"));


// use all routes configured in ROUTES section
app.use(indexRoute);
app.use(contactRoute);
app.use(resumeRoute);
app.use("/projects", projectsRoute);

// project usage
app.use("/projects/yelpCamp", yelpCampRoute);

app.listen(3000, function(){
    console.log("Webpage started!");
});
