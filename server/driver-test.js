const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://cinetrackAdmin:CineTrack1234@cinetrackcluster.hj3uqkl.mongodb.net/?retryWrites=true&w=majority&appName=CineTrackCluster";

async function main() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Connected Successfully");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();