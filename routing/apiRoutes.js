// Dependencies
// =============================================================
var friendsArray = require("../app/data/friends.js");
var app = require('../server')

// Routes
// =============================================================
var APIRoutes = function () {
  // Basic route that sends the user first to the AJAX Page
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
    var compatScoreArray = [];
    function sumArray(total, num) {
      return parseInt(total) + parseInt(num);
    }

    friendsArray.push(newFriend);
    console.log(friendsArray);

    for (var i = 0; i < friendsArray.length - 1; i++) {

      var friendsArrayScore = friendsArray[i].scores.reduce(sumArray);
      console.log(friendsArrayScore);
      var compatScore = Math.abs(parseInt(friendsArrayScore) - parseInt(friendsArray[friendsArray.length - 1].scores.reduce(sumArray)));
      compatScoreArray.push(compatScore);
    }
    console.log(compatScoreArray);

    var index = 0;
    var value = compatScoreArray[0];
    for (var i = 1; i < compatScoreArray.length; i++) {
      if (compatScoreArray[i] < value) {
        value = compatScoreArray[i];
        index = i;
      }
    }
    // We then add the json the user sent to the character array
    console.log(friendsArray[index]);
    // Change this to be the best match!***************************************************
    res.json(friendsArray[index]);

  });
}

module.exports = APIRoutes;