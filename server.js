// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friendsArray = require("./app/data/friends.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Returns routes for HTML documents
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/home.html"));
});

app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/survey.html"));
});

// Returns routes for API
app.get("/api/friends", function (req, res) {
  return res.json(friendsArray);
});

// Create New Friend and compare with other friends
app.post("/api/friends", function (req, res) {
  var newFriend = req.body;
  var index = 0;
  var value = compatScoreArray[0];
  var compatScoreArray = [];
  friendsArray.push(newFriend);

  // Loop over array to compute the compatScore (compatibility score)
  for (var i = 0; i < friendsArray.length - 1; i++) {

    var friendsArrayScore = friendsArray[i].scores.reduce(sumArray);
    var compatScore = Math.abs(parseInt(friendsArrayScore) - parseInt(friendsArray[friendsArray.length - 1].scores.reduce(sumArray)));
    compatScoreArray.push(compatScore);
  }

  // Loops to find the lowest value in compatScoreArray
  for (var i = 1; i < compatScoreArray.length; i++) {
    if (compatScoreArray[i] < value) {
      value = compatScoreArray[i];
      index = i;
    }
  }
  // Send back the best match
  res.json(friendsArray[index]);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// Function will add up array values when called
function sumArray(total, num) {
  return parseInt(total) + parseInt(num);
}