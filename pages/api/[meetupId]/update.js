import { MongoClient, ObjectId } from "mongodb";

// Updatae the meetup
async function updateMeetup(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const id = req.query.meetupId;

    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://Arman:anoosh2009@cluster0.bkb4tch.mongodb.net/meetups?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();
    
    try {
      const meetupsCollection = db.collection("meetups");
      await meetupsCollection.updateOne({ _id: new ObjectId(id) }, { $set: { ...data } });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
      return;
    }

    client.close();
    res.status(201).json({ message: "Meetup Updared!" });
  }
}

export default updateMeetup;
