import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function SavedPage(props) {
  return (
    <Fragment>
      <Head>
        <title>Saved Meetups</title>
        <meta name="descripton" content="Browse a huge list of meetups" />
      </Head>
      {!props.error ? (
        <MeetupList
          meetups={props.meetups}
          header={props.meetups.length === 0 ? "No Saved Meetups" : "Saved Meetups"}
        />
      ) : (<p className="error">{props.error}</p>)}
    </Fragment>
  );
}

export default SavedPage;

// Set the props with the saved meetups data the for saved page
export async function getServerSideProps() {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://Arman:anoosh2009@cluster0.bkb4tch.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const saveCollection = db.collection("save");
    const savedIdsData = await saveCollection.find().toArray();
    const savedIds = savedIdsData.map((id) => new ObjectId(id.id));

    const meetups = await meetupsCollection
      .find({ _id: { $in: savedIds } })
      .toArray();

    client.close();
    return {
      props: {
        meetups: meetups.reverse().map((meetup) => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
          date: meetup.date,
        })),
      },
    };
  } catch (e) {
    return {
      props: {
        error: "Could not fetch data!",
      },
    };
  }
}
