import Head from "next/head"; // to use html <head>
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name="descripton" content="Browse a huge list of meetups" />
      </Head>
      {!props.error ? (
        <MeetupList meetups={props.meetups} header={
            props.meetups.length === 0 ? "No Meetups Found" : "All Meetups"
          }
        />
      ) : (<p className="error">{props.error}</p>)}
    </Fragment>
  );
}

// Set the props with all meetups data the for home page
export async function getServerSideProps() {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://Arman:anoosh2009@cluster0.bkb4tch.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();

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

export default HomePage;
