const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://cinetrackAdmin:CineTrack1234@cinetrackcluster.hj3uqkl.mongodb.net/cinetrack?retryWrites=true&w=majority&appName=CineTrackCluster"
)
    .then(() => {
        console.log("✅ Connected");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });