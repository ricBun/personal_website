var express                = require("express"),
      app                      = express();


// ---------------------------------------------------------
// ROUTES
// ---------------------------------------------------------
var indexRoute = require("./routes/homepage");
var contactRoute = require("./routes/contact");
var resumeRoute = require("./routes/resume");
var projectsRoute = require("./routes/projects");

// ---------------------------------------------------------
//  CONFIG
// ---------------------------------------------------------
app.set("view engine", "ejs");
// use stylesheet
app.use(express.static(__dirname + "/public"));

app.listen(3000, function(){
    console.log("Webpage started!");
});

// use all routes configured in ROUTES section
app.use(indexRoute);
app.use(contactRoute);
app.use(resumeRoute);
app.use(projectsRoute);
