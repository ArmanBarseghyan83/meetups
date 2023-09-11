import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";

function UpdateMeetupPage(props) {
  const router = useRouter();
  async function updateMeetupHundler(meetupData) {
    await fetch(`/api/${props.meetupData.id}/update`, {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push(`/${props.meetupData.id}`);
  }

  return (
    <Fragment>
      <Head>
        <title>Update The Meetup</title>
        <meta name="descripton" content="Update The Meetup" />
      </Head>
      {!props.error ? (
        <NewMeetupForm
          meetup={props.meetupData}
          onUpdateMeetup={updateMeetupHundler}
          header="Update Meetup"
        />
      ) : (
        <p className="error">{props.error}</p>
      )}
    </Fragment>
  );
}

export default UpdateMeetupPage;

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
  const id = context.params.meetupId;

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://Arman:anoosh2009@cluster0.bkb4tch.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetup = await meetupsCollection.findOne({ _id: new ObjectId(id) });

    client.close();

    return {
      props: {
        meetupData: {
          id: meetup._id.toString(),
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          description: meetup.description,
          date: meetup.date,
        },
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
