// Dependencies
// =============================================================
var friendsArray = require("../app/data/friends.js");

// Routes
// =============================================================
module.exports = function (app) {

  // Function will add up array values when called
  function sumArray(total, num) {
    return parseInt(total) + parseInt(num);
  }
  // Returns routes for API
  app.get("/api/friends", function (req, res) {
    return res.json(friendsArray);
  });

  // Create New Friend and compare with other friends
  app.post("/api/friends", function (req, res) {
    var newFriend = req.body;
    var compatScoreArray = [];
    friendsArray.push(newFriend);

    // Loop over array to compute the compatScore (compatibility score)
    for (var i = 0; i < friendsArray.length - 1; i++) {

      var friendsArrayScore = friendsArray[i].scores.reduce(sumArray);
      var compatScore = Math.abs(parseInt(friendsArrayScore) - parseInt(friendsArray[friendsArray.length - 1].scores.reduce(sumArray)));
      compatScoreArray.push(compatScore);
    }

    // Loops to find the lowest value in compatScoreArray
    var index = 0;
    var value = compatScoreArray[0];
    for (var i = 1; i < compatScoreArray.length; i++) {
      if (compatScoreArray[i] < value) {
        value = compatScoreArray[i];
        index = i;
      }
    }
    // Send back the best match
    res.json(friendsArray[index]);
  });
}