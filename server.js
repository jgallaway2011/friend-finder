// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friendsArray = require("./app/data/friends.js");
// var HTMLRoutes = require("./routing/htmlRoutes.js");
// var APIRoutes = require("./routing/apiRoutes.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Returns routes for HTML documents
// HTMLRoutes();
app.get("/", function (req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "/public/home.html"));
});

app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/survey.html"));
});

// Returns routes for API
// APIRoutes();
app.get("/api/friends", function (req, res) {
  // res.send("Welcome to the Star Wars Page!")
  return res.json(friendsArray);
});

// Create New Friend Profile from Survey - takes in JSON input
app.post("/api/friends", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newFriend = req.body;

  console.log(newFriend);

  // We then add the json the user sent to the character array
  friendsArray.push(newFriend);
  // We then display the JSON to the users
  res.json(newFriend);
  var compatibilityScoreArray = [];
  for (var i = 0; i < friendsArray.length - 1; i++) {
    for (var m = 0; m < 11; m++) {
      var compatibitlityScore = Math.abs(newFriend.scores[m] - friendsArray[i].scores[m]);
      compatibilityScoreArray.push(compatibitlityScore);
      console.log(compatibilityScoreArray);
    }
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});