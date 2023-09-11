import { MongoClient, ObjectId } from "mongodb"; // npm install mongodb
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{!props.error ? props.meetupData.title : "error"}</title>
        <meta
          name="descripton"
          content={!props.error ? props.meetupData.description : props.error}
        />
      </Head>
      {!props.error ? (
        <MeetupDetail
          image={props.meetupData.image}
          title={props.meetupData.title}
          address={props.meetupData.address}
          description={props.meetupData.description}
          id={props.meetupData.id}
          date={props.meetupData.date}
          isSaved={props.isSaved}
        />
      ) : (
        <p className="error">{props.error}</p>
      )}
    </Fragment>
  );
}

/* export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Arman:anoosh2009@cluster0.bkb4tch.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
} */

export async function getServerSideProps(context) {
  const meetupId = context.params.meetupId;
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://Arman:anoosh2009@cluster0.bkb4tch.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const saveCollection = db.collection("save");

    const savedIdsData = await saveCollection.find().toArray();
    const savedIds = savedIdsData.map((id) => id.id);

    const selectedMeetup = await meetupsCollection.findOne({
      _id: new ObjectId(meetupId), //converting string id to mongo ObjectId
    });

    const isSaved = savedIds.includes(meetupId);

    client.close();

    return {
      props: {
        meetupData: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          address: selectedMeetup.address,
          image: selectedMeetup.image,
          description: selectedMeetup.description,
          date: selectedMeetup.date,
        },
        isSaved: isSaved,
      },
    };
  } catch (e) {
    return {
      props: {
        error: "Something went wrong!",
      },
    };
  }
}

export default MeetupDetails;
