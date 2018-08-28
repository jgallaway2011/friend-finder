// Dependencies
// =============================================================
var app = require("../app");

// Routes
// =============================================================
  // Sends the home.html page if visited
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/home.html"));
  });

  // Sends the survey.html page if visited
  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/survey.html"));
  });


