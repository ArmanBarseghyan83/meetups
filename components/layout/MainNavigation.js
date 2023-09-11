import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { useRouter } from "next/router";

function MainNavigation() {
  const router = useRouter();

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li className={router.pathname === "/" ? classes.active : ""}>
            <Link href="/">Meetups</Link>
          </li>
          <li
            className={router.pathname === "/new-meetup" ? classes.active : ""}
          >
            <Link href="/new-meetup">New</Link>
          </li>
          <li className={router.pathname === "/saved" ? classes.active : ""}>
            <Link href="/saved">Saved</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
