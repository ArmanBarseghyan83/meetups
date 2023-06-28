import { useRouter } from "next/router";
import classes from "./MeetupDetail.module.css";
import Link from "next/link";

function MeetupDetail(props) {
  const router = useRouter();

  const deleteHandler = () => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      router.push(`/api/${props.id}/delete`);
    }
  };

  return (
    <section className={classes.detail}>
      <div>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={classes.content}>
        <div>
          <h1>{props.title}</h1>
          <p>{props.date}</p>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={deleteHandler}>Delete</button>
          <Link href={`/${props.id}/update`}>Update</Link>
          <Link href={`/api/${props.id}/save`}>
            {!props.isSaved ? "Save" : "Unsave"}
          </Link>
        </div>
      </div>
      <div className={classes.description}>
        <h3>Description:</h3>
        <p> {props.description}</p>
      </div>
    </section>
  );
}

export default MeetupDetail;
