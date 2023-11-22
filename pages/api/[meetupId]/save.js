import { MongoClient } from "mongodb";

// Save the meetup to the database
async function save(req, res) {
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
  let isSaved;
  try {
    const saveCollection = db.collection("save");
    const savedIdsData = await saveCollection.find().toArray();
    const savedIds = savedIdsData.map((id) => id.id);
    isSaved = savedIds.includes(id);
    if (!isSaved) {
      await saveCollection.insertOne({ id: id });
    } else {
      await saveCollection.deleteOne({ id: id });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    return;
  }

  client.close();

  res.redirect(`/${id}`);
}

export default save;
