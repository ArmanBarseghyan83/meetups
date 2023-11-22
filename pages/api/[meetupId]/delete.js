import { MongoClient, ObjectId } from "mongodb";

// Delete the meetup from the database
async function deleteMeetup(req, res) {
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
    await meetupsCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    res.status(500).json({ message: "Could not delete the meetup." });
    return;
  }
  client.close();
  res.redirect("/");
}

export default deleteMeetup;
