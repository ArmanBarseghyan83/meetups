import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import { useRouter } from "next/router";

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateInputRef = useRef();
  const router = useRouter();

  function cancelHandler() {
    !props.meetup ? router.push("/") : router.push(`/${props.meetup.id}`);
  }

  // Collect the data from the form inputs and submit the form
  function submitHandler(event) {
    event.preventDefault();

    // Save in a variable the form inputs values
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    // Create an object with the form input values
    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
      date: enteredDate,
    };
    if (props.onAddMeetup) {
      props.onAddMeetup(meetupData);
    } else {
      props.onUpdateMeetup(meetupData);
    }
  }

  return (
    <>
      <h2 className={classes["form-header"]}>{props.header}</h2>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Meetup Title</label>
            <input
              type="text"
              required
              id="title"
              ref={titleInputRef}
              defaultValue={props.meetup ? props.meetup.title : ""}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Meetup Image</label>
            <input
              type="url"
              required
              id="image"
              ref={imageInputRef}
              defaultValue={props.meetup ? props.meetup.image : ""}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              required
              id="address"
              ref={addressInputRef}
              defaultValue={props.meetup ? props.meetup.address : ""}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="address">Date</label>
            <input
              type="date"
              required
              id="address"
              ref={dateInputRef}
              defaultValue={props.meetup ? props.meetup.date : ""}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              required
              rows="5"
              ref={descriptionInputRef}
              defaultValue={props.meetup ? props.meetup.description : ""}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button type="button" onClick={cancelHandler}>
              Cancel
            </button>
            <button>{props.onAddMeetup ? "Add Meetup" : "Update"}</button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default NewMeetupForm;
