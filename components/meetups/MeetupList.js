import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <>
      <h2 className={classes.header}>{props.header}</h2>
      <ul className={classes.list}>
        {props.meetups.map((meetup) => (
          <MeetupItem
            key={meetup.id}
            id={meetup.id}
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
            date={meetup.date}
          />
        ))}
      </ul>
    </>
  );
}

export default MeetupList;
