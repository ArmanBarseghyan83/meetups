import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

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
      await meetupsCollection.insertOne(data);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
      return;
    }
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
