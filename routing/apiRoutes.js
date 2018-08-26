// Dependencies
// =============================================================
var friendsArray = require("../app/data/friends.js");

// Routes
// =============================================================
var APIRoutes = function() {
// Basic route that sends the user first to the AJAX Page
app.get("/api/friends", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    return res.json(friendsArray);
  });
  
// Create New Friend Profile from Survey - takes in JSON input
app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newFriend = req.body;
  
    console.log(newFriend);
  
    // We then add the json the user sent to the character array
    friendsArray.push(newFriend);
  
    // We then display the JSON to the users
    res.json(newFriend);
  });
}

module.exports = APIRoutes;