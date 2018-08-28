// Routes
// =============================================================
var HTMLRoutes = function (app, path) {
  // Returns routes for HTML documents
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
}

// Exports
// =============================================================
module.exports = HTMLRoutes;


