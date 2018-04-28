var buddyData = require("../app/data/friends")


module.exports = function(app) {
   
    app.get("/api/friends", function(req, res) {
      res.json(buddyData);
    });
  
    app.post("/api/friends", function(req, res) {
        var newBuddy = req.body

        var userResponses = newBuddy.scores;

        var bestBuddy = {
			name: "",
			photo: "",
			buddyDifference: 1000
		};

// Examine all existing friends in the list
for (var i = 0; i < buddyData.length; i++) {
    // console.log('friend = ' + JSON.stringify(friends[i]));

    // Compute differences for each question
    var diff = 0;
    var buddyDifference = 1000
    for (var j = 0; j < userResponses.length; j++) {
        diff += Math.abs(buddyData[i].scores[j] - userResponses[j]);
    }
     console.log('diff = ' + diff);

    // If lowest difference, record the friend match
    if (diff < buddyDifference) {
         console.log('Closest match found = ' + diff);
         console.log('Buddy name = ' + buddyData[i].name);
         console.log('Buddy image = ' + buddyData[i].photo);

        totalDifference = diff;
        bestBuddy.name = buddyData[i].name;
        bestBuddy.photo = buddyData[i].photo;
    }
}


          buddyData.push(newBuddy);
          
         res.json(bestBuddy);
      })

} 